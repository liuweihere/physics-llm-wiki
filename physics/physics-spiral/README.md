# physics-spiral

小星星物理学螺旋体系的展示站。

这里仅接收从 `../feynman-physics-wiki/wiki/讲次/` 整理并标记为 `published: true` 的公开内容。`raw/` 永不参与公开构建。

公开讲次的唯一 Astro 内容源是 `src/content/lessons/`。同步脚本负责把 Wiki 中已发布的结构化讲次导出到该目录；网站本身是静态构建，学习进度只保存在当前浏览器的 `localStorage` 中。

## 内容入口

- [`content/main-lines/`](content/main-lines/)：四根核心主线。
- [`content/spiral-map.md`](content/spiral-map.md)：螺旋进度地图。
- [`src/content/lessons/`](src/content/lessons/)：唯一公开课程内容源。
