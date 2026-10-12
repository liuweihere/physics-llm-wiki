# 小星星物理学项目

本目录包含两个彼此独立、可以联动的项目：

- [`feynman-physics-wiki/`](feynman-physics-wiki/)：私有或家庭使用的内容中枢，负责高频记录与知识沉淀。
- [`physics-spiral/`](physics-spiral/)：面向小星星、家长及未来公众的展示站，负责发布整理后的内容。

内容流向为：`feynman-physics-wiki` 生产和沉淀内容，`physics-spiral/content/` 接收适合公开展示的同步内容。

## 内容同步流程

1. 内容先写入 `feynman-physics-wiki/raw/`，保留讲次提纲、实验记录和孩子的原始回答。
2. 经过复盘和整理后，生成或更新 `feynman-physics-wiki/wiki/` 中的结构化页面。
3. 成熟且适合公开的内容，再通过手动复制或同步脚本发布到 `physics-spiral/content/`。
