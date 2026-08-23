# Brand assets — Teki'lah Gedolah

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

Two cut-outs, from the lightbox shoot. That is the whole set.

| File | Source | Where it appears |
|---|---|---|
| `cut-front.webp` | DSC_0074 | Hero, and The Bottle panels 1-3 |
| `cut-back.webp` | DSC_0080 | The Bottle, Back Label panel only |

`cutout.py` / `shoot2.py` in the scratchpad do the work: grade the frame (the
shoot is deliberately underexposed to protect the label), black out everything
outside the bottle's centre column above the shoulder — otherwise the neck
reads as background against the lightbox's top strip and the cap gets cut off —
then rembg with alpha matting, largest-blob cleanup, and trim to the alpha box.

Photography was deliberately cut back. The hero was a three-slide carousel, the
story had floating bottles, and the band ran a full-bleed frame of the lightbox
interior. All removed: the shoot is not strong enough to carry that much
surface, and the site reads better with the bottle appearing twice, well, than
six times, thinly. The band and story are typographic now.

`grain.svg` is a single fine noise plate over the page at 5.5% — enough to stop
large dark areas banding, not enough to read as texture.

### Still missing

`map.jpg` — the Where to Buy panel. Drop in a map screenshot (1400x1000), or
replace the `<img>` inside `.locator__map` with a Google Maps `<iframe>` and
delete `.locator__pin`.

Worth shooting when there is time: the glass shofar shot glass that ships with
every bottle, and a pour. Those would earn their own sections.

## Facts taken from the bottle — and what is still invented

Read off the back label and now reflected in the copy:

- **El Poderío™**, exclusively produced for Teki'lah Gedolah
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


## Two things to settle before launch

### The brand name was wrong, and is now fixed

The site said **Teki'ah Gedolah** in 26 places. That is the correct Hebrew for
the shofar blast (תקיעה גדולה), but it is *not* what the label says. The bottle
reads **TEKI'LAH GEDOLAH** — the whole point is that one letter moves so the
word becomes "tequila". Corrected site-wide.

### The AI render was removed

`cut-studio.webp` was cut from a ChatGPT-generated render whose label read
TEKILLAH GEDOLAH — a third spelling, matching neither the real bottle nor the
site. It has been deleted and the hero reverted to a photograph.

### Pending: re-shoot in the lightbox

Two proper lightbox photographs (front and back, black surround) are to replace
every image on the site. Until those files land, the site still uses the older
phone shots from `IMG_00*.jpeg`.
