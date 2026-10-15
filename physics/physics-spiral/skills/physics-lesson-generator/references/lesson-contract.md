# Lesson Contract

## Frontmatter

```yaml
id: l02
route: throw-ball-on-train
title: 向上抛球，为什么它总落回手里？
pillar: motion
stage: 2
age_range: 7-8
loop_depth: 2
order: 2
published: true
summary: 简短、事实性的课程摘要。
core_question: 球会因为火车向前跑而落后吗？
wiki_source: https://example.com/known-source
prerequisites: [l01]
next_lesson_id: l03
resources:
  - slot: visual-primer
    kind: video
    title: 已确认的视频名称
    url: https://example.com/video
    provider: Provider
    language: en
  - slot: sandbox
    kind: simulator
    title: 已确认的互动模拟器
    url: https://example.com/simulator
    provider: Provider
  - slot: reading
    kind: book
    title: 书名与章节
    provider: 亲子阅读
```

## Field rules

- `id` is stable and matches `lNN`.
- `route` is a readable URL segment and must be unique.
- `pillar` is one of `motion`, `fields`, `energy`, `micro`.
- `stage` is the age-layer number used by the site.
- `published: true` is required before export.
- `core_question` and `wiki_source` are optional only when the source brief does not provide them.
- `resources[].slot` is one of `visual-primer`, `sandbox`, `reading`, `hook`.
- `resources[].kind` is one of `video`, `simulator`, `book`, `audio`.
- URLs are included only when supplied or verified in the source material.

## Body rules

The canonical body uses short Wiki sections, not UI markup:

```markdown
## 先想一想
...

## 看视频
使用上方的视频资源，观察并记录关键现象。

## 去实验场玩一玩
使用上方的模拟器完成任务。

## 动手做一做
材料与步骤。

## 今天的收获
- 事实性的结论。

## 下一讲预告
下一讲的问题。
```
