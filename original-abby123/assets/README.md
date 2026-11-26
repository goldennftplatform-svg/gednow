# Optional artwork folder

The game already includes its own SVG mascot and stage artwork inside
`index.html` and `css/styles.css`, so it works completely offline with no image
files at all.

This folder is here if you later want to drop in custom images (for example a
generated Rumi-inspired illustration). If you add `mascot.png` or `stage-bg.png`
here, you can point the CSS at them:

```css
.hero-mascot { background: url('../assets/mascot.png') center/contain no-repeat; }
.stage { background: url('../assets/stage-bg.png') center/cover no-repeat; }
```
