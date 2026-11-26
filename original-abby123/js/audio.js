/* =========================================================
   Rumi's Alphabet Stage - original stage-sound engine
   All sounds are synthesized live with the Web Audio API.
   No copyrighted songs, lyrics, samples or audio files.
   ========================================================= */

window.RumiAudio = (function () {
  let ctx = null;
  let master, musicGain, sfxGain, noiseBuf;
  let musicOn = true;
  let sfxOn = true;
  let musicBus = null;
  let musicPlaying = false;
  let clearTimer = null;

  function init() {
    if (ctx) {
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = 0.85;
    master.connect(ctx.destination);

    musicGain = ctx.createGain();
    musicGain.gain.value = 0.42;
    musicGain.connect(master);

    sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.85;
    sfxGain.connect(master);

    const len = Math.floor(ctx.sampleRate * 1.5);
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

    return ctx;
  }

  function tone(freq, when, dur, opts = {}) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = opts.type || 'sine';
    o.frequency.setValueAtTime(freq, when);
    if (opts.detune) o.detune.setValueAtTime(opts.detune, when);

    const peak = opts.vol == null ? 0.1 : opts.vol;
    const attack = opts.attack == null ? 0.008 : opts.attack;
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(peak, when + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);

    let node = o;
    if (opts.filterFreq) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = opts.filterFreq;
      node.connect(f);
      node = f;
    }
    node.connect(g).connect(opts.dest || sfxGain);
    o.start(when);
    o.stop(when + dur + 0.03);
  }

  function noise(when, dur, opts = {}) {
    if (!ctx || !noiseBuf) return;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = opts.filter || 'highpass';
    f.frequency.value = opts.freq || 6000;
    if (opts.q) f.Q.value = opts.q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(opts.vol == null ? 0.05 : opts.vol, when + (opts.attack || 0.006));
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    src.connect(f).connect(g).connect(opts.dest || sfxGain);
    src.start(when);
    src.stop(when + dur + 0.03);
  }

  function kick(when, dest, vol = 0.32) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(155, when);
    o.frequency.exponentialRampToValueAtTime(48, when + 0.15);
    g.gain.setValueAtTime(vol, when);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.21);
    o.connect(g).connect(dest);
    o.start(when);
    o.stop(when + 0.23);
  }

  function clap(when, dest, vol = 0.1) {
    noise(when, 0.075, { filter: 'bandpass', freq: 1700, q: 1.1, vol, dest });
    noise(when + 0.045, 0.09, { filter: 'bandpass', freq: 2300, q: 1.1, vol: vol * 0.7, dest });
  }

  function hat(when, dest, vol = 0.03) {
    noise(when, 0.045, { filter: 'highpass', freq: 8200, vol, dest });
  }

  function crowd(when, dur, vol, dest) {
    if (!ctx) return;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 1150;
    f.Q.value = 0.7;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(vol, when + dur * 0.35);
    g.gain.linearRampToValueAtTime(0.0001, when + dur);
    src.connect(f).connect(g).connect(dest);
    src.start(when);
    src.stop(when + dur + 0.05);
  }

  function stopMusic() {
    clearTimeout(clearTimer);
    musicPlaying = false;
    if (musicBus && ctx) {
      const bus = musicBus;
      bus.gain.cancelScheduledValues(ctx.currentTime);
      bus.gain.setValueAtTime(bus.gain.value, ctx.currentTime);
      bus.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      setTimeout(() => { try { bus.disconnect(); } catch (e) {} }, 400);
      musicBus = null;
    }
  }

  /* Original 4-bar synth-pop stage theme (C major pentatonic, 124 BPM). */
  function jingle() {
    if (!init() || !musicOn) return 0;
    stopMusic();
    const bus = ctx.createGain();
    bus.gain.value = 0.9;
    bus.connect(musicGain);
    musicBus = bus;
    musicPlaying = true;

    const t = ctx.currentTime + 0.09;
    const beat = 60 / 124;
    const bar = beat * 4;
    const duration = bar * 4 + 0.7;

    crowd(t, 0.8, 0.03, bus);
    crowd(t + bar * 3, 1.2, 0.045, bus);

    const bassRoots = [65.41, 65.41, 55.00, 49.00]; // C2, C2, A1, G1
    const melody = [
      [[659.25, 1], [783.99, 1], [880.00, 1], [783.99, 1]],
      [[659.25, 1], [587.33, 1], [523.25, 2]],
      [[783.99, 1], [880.00, 1], [1046.50, 1], [880.00, 1]],
      [[783.99, 1], [659.25, 1], [587.33, 1], [523.25, 1]]
    ];

    for (let b = 0; b < 4; b++) {
      const bt = t + b * bar;
      for (let k = 0; k < 4; k++) {
        kick(bt + k * beat, bus, 0.3);
        clap(bt + k * beat, bus, 0.075);
      }
      for (let h = 0; h < 8; h++) hat(bt + h * beat / 2, bus, h % 2 ? 0.018 : 0.032);
      for (let e = 0; e < 8; e++) {
        tone(bassRoots[b], bt + e * beat / 2, beat * 0.4, {
          type: 'sawtooth', vol: 0.075, filterFreq: 420, dest: bus
        });
      }
      let cursor = bt + beat * 0.05;
      melody[b].forEach(([freq, beats]) => {
        tone(freq, cursor, beat * beats * 0.82, {
          type: 'triangle', vol: 0.16, attack: 0.012, dest: bus
        });
        tone(freq * 2, cursor, beat * beats * 0.5, {
          type: 'sine', vol: 0.035, attack: 0.01, dest: bus
        });
        cursor += beat * beats;
      });
    }

    // Sparkle tag + final chord
    const end = t + bar * 4;
    [1046.5, 1318.5, 1568, 2093].forEach((f, i) =>
      tone(f, end + i * 0.09, 0.28, { type: 'sine', vol: 0.08, dest: bus }));
    [523.25, 659.25, 783.99].forEach(f =>
      tone(f, end + 0.34, 0.9, { type: 'triangle', vol: 0.09, attack: 0.03, dest: bus }));

    clearTimer = setTimeout(() => { musicPlaying = false; }, duration * 1000);
    return duration;
  }

  /* Short original fanfare for star milestones. */
  function victory() {
    if (!init() || !musicOn || !sfxOn) return;
    const t = ctx.currentTime + 0.04;
    crowd(t, 0.9, 0.05, sfxGain);
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      tone(f, t + i * 0.1, 0.35, { type: 'triangle', vol: 0.13, dest: sfxGain });
      tone(f * 2, t + i * 0.1, 0.2, { type: 'sine', vol: 0.04, dest: sfxGain });
    });
    clap(t + 0.42, sfxGain, 0.09);
  }

  /* Magical "honmoon" shimmer. */
  function honmoon() {
    if (!init() || !sfxOn) return;
    const t = ctx.currentTime + 0.03;
    [880, 1174.7, 1568, 2093, 2637].forEach((f, i) =>
      tone(f, t + i * 0.055, 0.5 + i * 0.08, { type: 'sine', vol: 0.07, dest: sfxGain }));
  }

  function sfx(name) {
    if (!sfxOn || !init()) return;
    const t = ctx.currentTime + 0.015;
    switch (name) {
      case 'tap':
        tone(784, t, 0.07, { type: 'triangle', vol: 0.09 });
        hat(t, sfxGain, 0.02);
        break;
      case 'correct':
        [523.25, 659.25, 783.99].forEach((f, i) =>
          tone(f, t + i * 0.075, 0.2, { type: 'triangle', vol: 0.12, dest: sfxGain }));
        clap(t + 0.2, sfxGain, 0.06);
        break;
      case 'wrong':
        tone(240, t, 0.12, { type: 'sine', vol: 0.07 });
        tone(196, t + 0.09, 0.15, { type: 'sine', vol: 0.06 });
        break;
      case 'star':
        tone(1318.5, t, 0.09, { type: 'sine', vol: 0.08 });
        tone(1760, t + 0.06, 0.18, { type: 'sine', vol: 0.07 });
        break;
      case 'cheer':
        crowd(t, 0.75, 0.05, sfxGain);
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
          tone(f, t + i * 0.07, 0.3, { type: 'triangle', vol: 0.1, dest: sfxGain }));
        break;
      case 'mic':
        tone(140, t, 0.09, { type: 'sine', vol: 0.16 });
        tone(1450, t + 0.03, 0.07, { type: 'sine', vol: 0.035 });
        break;
      case 'lightstick':
        [1046.5, 1318.5, 1568, 2093].forEach((f, i) =>
          tone(f, t + i * 0.04, 0.3, { type: 'sine', vol: 0.055 }));
        break;
      case 'powerup':
        for (let i = 0; i < 12; i++) {
          tone(220 * Math.pow(1.12, i), t + i * 0.035, 0.12, {
            type: 'square', vol: 0.035, filterFreq: 2600
          });
        }
        break;
    }
  }

  return {
    init,
    sfx,
    jingle,
    victory,
    honmoon,
    stopMusic,
    setSfx(on) { sfxOn = !!on; },
    setMusic(on) { musicOn = !!on; if (!musicOn) stopMusic(); },
    isPlaying() { return musicPlaying; }
  };
})();
