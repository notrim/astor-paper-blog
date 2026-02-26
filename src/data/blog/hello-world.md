---
title: "Hello World"
description: "我的第一篇 Astro-Paper 博客"
pubDate: 2026-02-26
tags: ["astro", "blog"]
draft: false
---

这里开始写正文，支持 Markdown。
```

如果项目启用了 Astro Content Collections，字段名必须符合它的 schema（不符合会在 dev 时报错）。报错了把错误信息贴给我，我可以按你的项目 schema 帮你改到正确。

---

## 6) 配置站点信息（标题/作者/社交）
你需要找到主题的“站点配置文件”。常见位置：

- `src/config.ts`
- `src/consts.ts`
- `src/site.config.ts`
- 或者直接在 `astro.config.mjs` 里

你要改的通常包括：

- Site title / description
- 作者名、头像
- 社交链接（GitHub、X、Email 等）
- 站点 URL（用于 RSS、sitemap、SEO canonical）

如果你不确定配置文件在哪：
1. 全局搜索 `site`、`SITE_TITLE`、`consts`、`social`、`author`
2. 或把你项目根目录文件列表/截图发我，我帮你定位最该改的文件

---

## 7) 常用命令
```bash
# 本地开发
pnpm dev

# 构建静态站点
pnpm build

# 预览构建结果（本地模拟线上）
pnpm preview

# 类型检查（如果配置了）
pnpm check