# Abby's Alphabet Stage with Rumi 🌟

Made just for Abby — Rumi greets her by name and uses random little pep talks
throughout the games.

**Live site (GitHub Pages):** https://goldennftplatform-svg.github.io/abby123/

A bright, touch-friendly learning website for little kids (around 3–4 years old),
themed around an original, kid-friendly K-pop stage star inspired by Rumi from
*KPop Demon Hunters*.

It teaches:

- **A–Z letters** — 3 picture words for every letter (78 words), with sounds
- **Colours** — 12 colours with example pictures, then a find-the-colour game
- **Word Match** — 80 picture words, with letter-by-letter spelling after every correct answer
- **Picture Wall** — browse all 80 pictures by category (Animals, Food, Nature, Things, Vehicles); tap any card to hear it and see it spelled out
- **Coloring Book** — 120 original SVG line-art pages (animals, food, nature, things, vehicles) with **Fill** and **Brush** tools, three brush sizes, undo/clear, a gray swatch and white eraser, saved pages in “My book”, and a spoken fact for every word
- **Early spelling** — build 50 words from 3 to 5 letters by tapping letters; Rumi says each letter with a keyword (“R as in rainbow”), so B-R-E-A-D never blurs into “B-E-D”
- **Move Parade** — a docked mini-game with 29 body moves: do all three moves (First, Next, Then), then remember the last one (teaches sequencing and following directions)
- **Quest Map** — six badges, progress bars, and a “next up” suggestion that steers Abby to the area needing the most practice
- **Installable + offline** — Add to Home Screen for a full-screen tablet app; after the first load, the app shell works without internet

Everything runs locally. No internet, no accounts, no downloads, no tracking.

---

## Start it

**Easiest:** double-click **`START-HERE.bat`**.

That starts a small web server and prints two addresses:

```
On this computer:  http://localhost:8000
On other devices:  http://192.168.x.x:8000
```

Open the first one on the computer running the server. Open the **second** one
on any tablet or phone connected to the **same Wi‑Fi**.

Press `Ctrl + C` in the black window (or close it) to stop the server.

### If you prefer the command line

```bat
python server.py
```

or

```bat
node server.js
```

Both listen on all network interfaces (`0.0.0.0`) so other devices can connect.

---

## Sharing on your network — checklist

1. All devices must be on the **same Wi‑Fi / LAN**.
2. If it doesn't connect, allow Python or Node through **Windows Defender Firewall**
   (Private networks) for port **8000**.
3. Use the `192.168...` address, not `localhost`, on other devices — `localhost`
   always means "this device".
4. Keep the server window open while playing.
5. For a full-screen experience on a tablet, use the browser's **Add to Home
   Screen** option (works in Chrome/Safari).

### Install it like a real app 📲

Open the site once (live or LAN), then choose **Install app** / **Add to Home
Screen** from the browser menu. It opens full-screen with its own icon. The first
load caches the app shell, so later visits work offline too. Progress stays in
that browser; no account or cloud sync is involved.

---

## Grown-up corner

Tap the **⚙️** button in the top right to:

- turn the speaking voice on/off and choose/test a specific voice
- turn the happy sound effects on/off
- switch to slower speech for very early learners
- see the progress dashboard and Rumi's suggested next activity
- reset stars, badges and all learning progress

Stars, badges and learning progress are saved in the browser on each device.

### Stage audio 🎵

Tap **🎵 Rumi's Stage Theme** on the home screen for an original, bouncy
synth-pop stage jingle with drums, bass, synth melody and crowd cheers. There
are also mic-tap, light-stick shimmer, power-up and "Honmoon" sparkle sounds
during the games, plus a short fanfare every 5 stars.

All audio is generated live in the browser by `js/audio.js`. It is **original
music** — no songs, lyrics, samples or audio files from any existing show or
artist are used or included.

You can turn the stage music off in the grown-up corner if you'd prefer a
quieter game.

### Painting tools 🖌️

The Coloring Book has two ways to paint:

- **Fill** — tap a color, then tap a picture part to fill it
- **Brush** — drag a finger or stylus to paint freehand; choose small, medium,
  or big, undo the last stroke, or clear all brush strokes

Gray is in the palette, and the striped white swatch is an eraser. Fill colors,
brush strokes, and saved pages all stay in that browser.

### Voice quality 🗣️

The speaking voice now prefers a natural/neural English voice installed on the
device, at a calmer speed and normal pitch. In the grown-up corner you can also
choose a specific voice from a **Choose voice** list, test it with **Say hi to
Abby**, or turn voices off completely. The choice is saved in that browser.

Spelling is spoken with a keyword after every letter (“R as in rainbow”), so
B-R-E-A-D can never blur into “B-E-D”. During the letter-by-letter reveal,
Rumi waits for each spoken letter to finish before highlighting the next, with
a tiny pause in between. A few speech-only pronunciations are used for words a
basic tablet voice can garble — for example, **bread** is spoken as “bred”
while it is always displayed and spelled as **bread**.

---

## What's in the files

| File | Purpose |
|---|---|
| `index.html` | Page structure and the built-in SVG mascot |
| `css/styles.css` | All the styling, animation and tablet-friendly sizing |
| `js/data.js` | Letters, words, colours, moves, quests and spelling words — easy to edit |
| `js/coloring.js` | 80 original SVG line-art coloring pages |
| `js/audio.js` | Original synthesized stage music and sound effects |
| `js/app.js` | Game logic, speech and sounds |
| `manifest.webmanifest`, `sw.js`, `assets/icon.svg` | Installable app icon and offline caching |
| `server.py` | Python LAN server (used by `START-HERE.bat`) |
| `server.js` | Node.js fallback server |
| `assets/` | Optional extra artwork slot |

### Make it your own

Open `js/data.js` in any text editor to change the picture words, add colours,
or swap in your child's favourite words. Keep the same format and refresh the
page — no build step needed.

---

## Easy updates (git style)

The folder is already a git repo connected to
`https://github.com/goldennftplatform-svg/abby123`. After changing a file:

```bat
git add -A
git commit -m "Describe what changed"
git push
```

GitHub Pages rebuilds automatically in about 30 seconds. Refresh the live
site to see the update.

Made with big buttons, gentle feedback, and lots of encouragement. ✨
