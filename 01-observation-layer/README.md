# 01 — Observation Layer

An engineer's portfolio built as a machine perception pass. The site behaves like an
object-detection system parsing a person's body of work: the subject is acquired, projects are
detected and labelled with confidence scores, and telemetry runs down both edges of the frame
whether or not anyone is reading it.

**Status:** in progress. Two passes so far, more expected.

---

## The reference

The direction came from a set of images that share one idea: a photograph of something vast and
human-built — radio telescopes, antenna arrays, a lone figure on desert or lunar terrain — with a
second layer painted over it that doesn't belong to the photograph at all. Bounding boxes.
Wireframe cubes. Garbled telemetry text. RGB channel splits in magenta, cyan and lime.

It reads as a machine trying to parse the world and losing the plot on meaning. Fluent in data,
short on understanding. That tension — cold annotation over warm terrain — is the whole visual
argument, and it's what the build had to carry.

## Why this worked as a brief

Earlier attempts in this repo's process failed because they chased a hero object: build an
impressive thing and hope the page inherits the impressiveness. This one is a **treatment** — a
lens applied over real content — which means the content stays load-bearing and the styling has
something to act on. It also happens to fit the subject: an engineer's site framed as a system
observing its own work is a real metaphor, not decoration.

---

## Design decisions

**Palette** comes from the source images rather than a stock dark theme. Deep dusk navy `#080F1A`
as the base, warm regolith `#C2AF98` for body text. The orange-terrain-against-cold-data tension
is the point; magenta `#FF2D7A`, cyan `#22E0F0` and lime `#9BF03C` appear only as detection
accents, never as general decoration.

**Type** splits by speaker. Saira Condensed at heavy weights for display — facility signage, not
geometric tech-startup sans. Space Grotesk for reading. Space Mono for every piece of
machine-generated text. The rule: anything the *system* says is monospace, anything a *human*
wrote is not. That's a structural distinction, not a stylistic one.

**Structure encodes the pass.** Section numbering isn't ornamental — it's the order the system
works in: subject → observations → systems → transmission.

**Signature element:** the detection behaviour. Cards get corner brackets, a class label and a
confidence score that scramble out of noise as they enter the viewport. It fires once per card,
never loops, so it reads as detection rather than as an animation on a timer.

---

## Pass 1 — `v1-vector.html`

Everything drawn in code. The hero scene — wireframe dish, guyed masts, layered annotation boxes,
a CRT-headed observer figure — is hand-written SVG paths. No external assets, ~28KB total.

**What worked:** the concept held. The detection mechanic, the telemetry rails, the type system
and the copy all landed, and the whole thing is featherweight and portable.

**What didn't:** hand-drawn vectors can't produce the photographic depth the references have. The
SVG scene reads as a diagram of the idea rather than the idea itself. Real lighting, atmosphere
and texture aren't things you get by writing coordinates.

**The lesson worth keeping:** when the reference material's power comes from photographic
richness, recreating it in vectors is the wrong tool no matter how carefully it's executed. The
constraint should have been visible before building, not after.

## Pass 2 — `v2-photographic.html`

Same concept, same type system, same colour logic — but the actual photographs carry the visuals
and the code does what code is good at: live interaction layered on top.

- **Hero** is the astronaut walking toward the glitched megastructure, full-bleed, with a
  directional scrim so the type stays readable. Three detection boxes land on load; one frames
  the figure as `SUBJECT / 0.97` — the site classifying a person the same way the source images
  classify terrain.
- **Each project** is a photograph with detection boxes drawn onto the image itself
  (`ENCLOSURE`, `SUBMERGED`, `ROAD_EDGE`), plus a class tag and confidence score that scramble in
  on scroll.
- **Systems** sits over the annotated nebula at ~86% darkness — atmosphere behind the instrument
  list, not competing with it.

Images optimised to 720–1400px at q72 and base64-embedded, so the file stays self-contained at
~1.5MB and works dropped anywhere with no asset paths to break.

**The lesson worth keeping:** the split between what belongs to the image and what belongs to the
code. Photographs do depth, atmosphere and texture. Code does live interaction, state and
response. Trying to make code do the first job is where pass 1 went wrong.

---

## Open items

- **Image rights.** The reference photographs are someone else's work, used here as a private
  study. Before this goes public it needs either original imagery in the same aesthetic or clear
  credit to the artist. The layout is built so swapping image sources is a small change.
- Contact links are placeholders apart from GitHub.
- Project copy needs a fact-check pass against the actual work.
- Worth trying: a scan sweep that actually drives the detection timing rather than running on its
  own loop, so the labels resolve as the line crosses them.

## Techniques used

Scroll-triggered reveal via `IntersectionObserver` · text scramble on resolve · CSS chromatic
aberration via layered `text-shadow` · SVG turbulence grain · repeating-gradient scanlines ·
percentage-positioned overlay boxes that scale with the image · `prefers-reduced-motion`
respected throughout.
