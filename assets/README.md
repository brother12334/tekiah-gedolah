# Brand assets — Teki'ah Gedolah

## Logo

`logo-wordmark.svg` is the wordmark, vectorised straight from
`tequila-robbon (1).pdf` (the neck-ribbon artwork) — outlined paths, no
embedded raster, ~29KB. Every fill is `currentColor`.

It is applied via CSS mask (`.logo` in `styles.css`), which is what lets one
file be bone in the header, gold on the hero ribbon, and ink anywhere on a
light background. Aspect ratio is locked by `--logo-ratio: 229 / 17.8`; set a
width on the container and the height follows.

Where it appears: header, footer, age gate, and rotated 90° down the left edge
of the hero as a nod to the printed neck ribbon (`.hero__ribbon`).

Display face is **Cinzel**, chosen to sit close to the logo's flared small
caps. Swap `--f-display` in `styles.css` if you know the real typeface.

`favicon.svg` is a placeholder TG monogram — replace when you have a real mark.

## Photography

The seven phone shots were retouched into product plates by
`scratchpad/retouch.py`. Per image: EXIF orientation, gray-world white balance
(the sheets threw a heavy blue-green cast), crop, then a "studio relight" —
the subject gets a soft key light and unsharp mask while the background is
blurred, desaturated and darkened, faking shallow depth of field and a seamless
sweep. Finished with a light S-curve, a green-cast correction and fine grain.

The bottles are then **cut out of the background entirely** (`cutout.py`) using
rembg's `isnet-general-use` model with alpha matting, so clear glass keeps a
soft edge instead of a halo. A cleanup pass (`clean_cut.py`) drops the
near-transparent haze the matting leaves and deletes stray blobs — connected
components smaller than 14% of the largest — which is what removed the wisp of
bedsheet floating beside the neck. Saved as **WebP with alpha**: 6.0 MB of PNG
became 676 KB with no visible loss.

| File | Source | Where it appears |
|---|---|---|
| `cut-hero.webp` | IMG_0035 | Hero slide 1, and The Finish panel |
| `cut-angle.webp` | IMG_0004 | Hero slide 2 |
| `cut-trio.webp` | IMG_0021 | Hero slide 3 |
| `cut-label.webp` | IMG_0036 | Our Story (large, inverted), The Palate panel |
| `cut-front.webp` | IMG_0037 | Our Story (lower left), The Nose panel |
| `cut-back.webp` | IMG_0030 | Our Story (lower right), The Back Label panel |
| `band-wide.jpg` | IMG_0004 | Full-bleed band ("The Table") — kept as a photo |

Cutouts float on a gold radial glow with a drop shadow, matching the reference
layout. `band-wide.jpg` is deliberately *not* cut out — a full-bleed section
wants a real photograph behind the text.

To re-crop or re-cut, edit the `JOBS` table in `retouch.py` / `cutout.py` and
re-run. The originals in `Downloads` are untouched.

### Still missing

`map.jpg` — the Where to Buy panel. Drop in a map screenshot (1400×1000), or
replace the `<img>` inside `.locator__map` with a Google Maps `<iframe>` and
delete `.locator__pin`. Until then it renders as a dashed placeholder.

Worth shooting when you can: a pour in a glass, and a bottle on an actual
holiday table. Both would replace stock-feeling sections with real ones.

## Facts taken from the bottle — and what is still invented

Read off the back label and now reflected in the copy:

- **El Poderío™**, exclusively produced for Teki'ah Gedolah
- **Reposado Cristalino**, 100% Agave Azul
- 1 litre, 80 proof, 40% Alc./Vol
- **NOM 1438 CRT**; bottled by Destiladora del Valle de Tequila, S.A. de C.V.,
  Tequila, Jalisco, C.P. 46403
- Hecho en México, D.O.P.
- Imported by **Helmsman Imports, Austin, TX**
- Kosher certified (seal on the back label); bottles numbered and signed
- Tagline: **IT WILL BLOW YOU AWAY**

Still placeholder — replace before launch:

- **Tasting notes** (The Nose / Palate / Finish). Written to be plausible for a
  cristalino; nobody has tasted it on our end. Rewrite in your own words.
- **Stockists** in Where to Buy, and the **Poured At** names — all fictional.
- **Email addresses** and social links.
- **The three cocktails** in The Ritual are invented recipes.
- Earlier drafts claimed an añejo with a honey-and-pomegranate barrel finish,
  a 5,787-bottle run and a price. All fabricated, all now removed.
