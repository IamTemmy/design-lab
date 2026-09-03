# 001 — Observation Engine

> What if a webpage could observe and interpret itself?

## Hypothesis

Machine-perception graphics become meaningful when they are caused by perception-like behavior.
The interface should not arrive pre-labelled. It should acquire, classify, and remember objects as
the visitor scans them.

## Signature interaction

The pointer, touch position, or keyboard moves a vertical scan plane across the observation field.
The engine reads each target's real browser geometry with `getBoundingClientRect()`. A target is
detected only when the scan plane intersects it. Repeated passes increase the stored confidence.

Four modes reinterpret the same underlying objects:

- **RGB** — the authored interface surface;
- **Edge** — structure, paths, and boundaries;
- **Depth** — spatial hierarchy expressed as depth bands;
- **Semantic** — classifications, confidence, and evidence.

## Acceptance criteria

- The primary interaction is visible in the first viewport.
- Detection timing is driven by the user's scan position, never an unrelated timer.
- Every displayed coordinate, count, confidence value, and event reflects actual interface state.
- Pointer, touch, and arrow-key input all operate the scanner.
- The experience remains legible on mobile and with 200% text zoom.
- Reduced-motion preferences remove smoothing and nonessential animation.
- No third-party photographs or unlicensed visual assets are required.
- The mechanic can later be extracted into a reusable component.

## Process retained

The original `01-observation-layer/` directory contains the two earlier passes:

- `v1-vector.html` proved the general visual language but relied on a hand-drawn hero scene.
- `v2-photographic.html` improved atmosphere with photography but still used detection primarily as
  an overlay treatment.

Those files are evidence, not the final product. The new build keeps the useful premise and changes
the causal structure: observation now produces the interface state.

## Next pass

After interaction review, the next pass will tune motion, visual hierarchy, and the project evidence
inside each detected object. Sound and additional effects are excluded until they can communicate
state rather than merely add spectacle.
