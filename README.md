# Design Lab

Design Lab is a collection of interaction experiments by Temiloluwa Adesola.

Each study starts with one question, isolates one memorable behavior, and pushes it until the
result is useful beyond the page that introduced it. The work is not a gallery of website clones;
it is a record of learning how visual ideas become responsive systems.

## Operating rule

A study is complete only when it has:

1. one clear **What if?** question;
2. one signature interaction;
3. a polished, responsive live experience;
4. a reusable technique or piece of code; and
5. an honest process note covering decisions, failures, and the final result.

## Studies

### 001 — Observation Engine

**What if a webpage could observe and interpret itself?**

A user-controlled scan plane reads the real positions of interface objects. Content is classified
only when the scan reaches it; confidence grows through repeated observation, and RGB, edge,
depth, and semantic modes expose different representations of the same page.

- [Open the experiment](./dist/01-observation-engine/)
- [Read the study](./studies/01-observation-engine/)

## Repository structure

```text
dist/                         Published Design Lab experience
studies/                      Briefs, notes, and process artifacts
  01-observation-engine/
01-observation-layer/         Earlier passes retained as evidence
```

The two original Observation Layer builds remain in `01-observation-layer/`. They established the
machine-perception direction, but treated detection as decoration. Observation Engine rebuilds
the concept so the interaction itself performs the classification.
