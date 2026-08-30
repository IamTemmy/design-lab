# design-lab

Frontend design studies. Each folder is one concept: something I saw and wanted to understand,
rebuilt until I knew how it worked.

The point isn't to ship products. It's to get better at making interfaces that feel like a place
rather than a page — and to keep a record of what each attempt taught me, including the ones that
didn't work.

Every study ships with a writeup: what the reference was, what decisions I made and why, what
failed, and what technique came out of it worth reusing.

---

## Studies

### [01 — Observation Layer](./01-observation-layer/)

An engineer's portfolio built as a machine perception pass — the site classifies its own subject
and annotates each project with bounding boxes and confidence scores.

Two passes: a fully hand-drawn SVG version, then a rebuild using photographic material with the
detection layer over the top. The gap between them is the lesson.

`Saira Condensed / Space Grotesk / Space Mono` · `IntersectionObserver` · `text scramble` ·
`chromatic aberration` · in progress

---

## Working notes

Recurring lessons, updated as they accumulate:

- **A treatment beats a hero object.** Concepts that apply a lens over real content hold up
  better than concepts built around one impressive centrepiece, because the content stays
  load-bearing and the styling has something to act on.
- **Match the medium to the reference.** If a reference's power comes from photographic depth,
  vectors won't get there. Photographs do atmosphere and texture; code does interaction and state.
  Deciding which does what should happen before building, not after.
- **Structure should encode something true.** Section numbering, labels and dividers earn their
  place when they describe the content's actual shape. Otherwise they're decoration wearing a
  system's clothes.
