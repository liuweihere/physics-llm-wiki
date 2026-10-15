---
name: physics-lesson-generator
description: Generate or update one physics lesson from an approved Wiki brief, preserving the canonical Markdown contract, resource slots, and six-step lesson flow. Use for new lesson ingestion or schema-checked lesson revisions in physics-spiral.
metadata:
  short-description: Generate schema-checked physics lessons
---

# Physics Lesson Generator

Use this skill when a lesson brief, outline, or structured JSON needs to become a publishable Wiki lesson for `feynman-physics-wiki` and the `physics-spiral` site.

## Source of truth

- Write the canonical lesson to `feynman-physics-wiki/wiki/讲次/`.
- Never invent lesson facts, child observations, external URLs, or resources.
- Treat the supplied brief and existing Wiki material as the only content inputs.
- Export to `physics-spiral/src/content/lessons/` with `npm run content:sync`; do not edit the exported copy by hand.

## Required metadata

Every published lesson must include the fields and resource contract in [references/lesson-contract.md](references/lesson-contract.md).

## Required body flow

Use these headings in order when the source brief supports them:

1. `先想一想`
2. `看视频`
3. `去实验场玩一玩`
4. `动手做一做`
5. `今天的收获`
6. `下一讲预告`

Keep the body concise and action-oriented. Do not add greeting scripts, motivational filler, unsupported explanations, or presentation-only HTML.

## Workflow

1. Parse the approved lesson brief into frontmatter and the six-step Markdown body.
2. Preserve exact titles, questions, resource names, and URLs supplied by the author.
3. Add only resources with a known source URL or an explicitly supplied offline reading item.
4. Run `npm run content:sync` from `physics-spiral`.
5. Run `npm run lesson:validate -- <source-file>` for the generated lesson.
6. Run `npm run content:validate` and `npm run build`.
7. Report any missing required field, broken next-lesson reference, or unsupported resource category instead of guessing.
