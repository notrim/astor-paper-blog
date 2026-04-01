# 慧灯禅语博客 📄

![AstroPaper](public/astropaper-og.jpg)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/community/file/1356898632249991861)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub](https://img.shields.io/github/license/satnaing/astro-paper?color=%232F3741&style=for-the-badge)

这是一个基于 Astro 框架和 AstroPaper 主题的博客项目，专注于分享佛学相关内容。

## 🔥 特性

- [x] 类型安全的 Markdown
- [x] 超高性能
- [x] 可访问性（键盘/屏幕阅读器）
- [x] 响应式设计（移动设备 ~ 桌面端）
- [x] SEO 友好
- [x] 明暗模式
- [x] 模糊搜索
- [x] 草稿文章和分页
- [x] 站点地图和 RSS 订阅
- [x] 遵循最佳实践
- [x] 高度可定制
- [x] 动态生成博客文章的 OG 图片

## 📁 工程结构

项目的主要目录结构如下：

```bash
/
├── public/             # 静态资源目录
│   ├── images/         # 图片资源
│   ├── astropaper-og.jpg
│   ├── favicon.png
│   └── favicon.svg
├── src/                # 源代码目录
│   ├── assets/         # 资源文件
│   │   ├── icons/      # 图标
│   │   └── images/     # 图片
│   ├── components/     # 组件
│   ├── data/           # 数据目录
│   │   ├── blog/       # 博客文章
│   │   ├── astro-introduce/ # AstroPaper 主题相关文档
│   │   └── buddhist-calendar/ # 佛教日历
│   ├── layouts/        # 布局组件
│   ├── pages/          # 页面
│   ├── scripts/        # 脚本
│   ├── styles/         # 样式
│   ├── utils/          # 工具函数
│   ├── config.ts       # 配置文件
│   ├── constants.ts    # 常量
│   ├── content.config.ts # 内容配置
│   └── env.d.ts        # 环境类型定义
├── astro.config.ts     # Astro 配置
├── package.json        # 项目依赖
└── tsconfig.json       # TypeScript 配置
```

## 📝 新增博客文章指南

### 1. 创建 Markdown 文件

在 `src/data/blog/` 目录下创建一个新的 Markdown 文件，文件名建议使用小写字母和连字符，例如 `my-new-post.md`。

### 2. 编写 Frontmatter

在文件顶部添加 YAML 格式的 frontmatter，至少包含以下字段：

```yaml
---
title: 文章标题
author: 作者名
pubDatetime: 2026-04-01T00:00:00Z
featured: false
draft: false
tags:
  - 标签1
  - 标签2
description: 文章描述
---
```

**必填字段**：
- `title`：文章标题
- `description`：文章描述（用于 SEO 和摘要）
- `pubDatetime`：发布时间（ISO 8601 格式）

**可选字段**：
- `author`：作者名（默认使用站点配置）
- `slug`：自定义 slug（默认使用文件名）
- `featured`：是否在首页特色区域显示（默认 false）
- `draft`：是否为草稿（默认 false）
- `tags`：文章标签（默认使用 "others"）
- `ogImage`：OG 图片（默认自动生成）
- `canonicalURL`：规范 URL
- `hideEditPost`：是否隐藏编辑按钮
- `timezone`：时区设置

### 3. 添加文章内容

在 frontmatter 下方添加 Markdown 格式的文章内容。

**注意事项**：
- 文章标题使用 frontmatter 中的 `title`，正文应使用 h2 及以下标题
- 可以使用 `## Table of contents` 添加目录
- 支持语法高亮
- 图片可以存储在 `src/assets/` 目录（推荐，会自动优化）或 `public` 目录（需自行优化）

### 4. 组织文章（可选）

- 可以在 `src/data/blog/` 下创建子目录组织文章，例如 `src/data/blog/2026/`
- 子目录名会成为 URL 的一部分，例如 `src/data/blog/2026/my-post.md` 会生成 URL `/posts/2026/my-post`
- 如果不希望子目录影响 URL，可以在目录名前加下划线，例如 `src/data/blog/_2026/my-post.md` 会生成 URL `/posts/my-post`

### 5. 预览和构建

- 本地预览：运行 `pnpm dev` 启动开发服务器
- 构建：运行 `pnpm build` 构建生产版本

## 📄 示例文章结构

```markdown
---
title: 我的新博客文章
author: 慧灯禅语
pubDatetime: 2026-04-01T00:00:00Z
featured: false
draft: false
tags:
  - 佛学
  - 修行
description: 这是一篇关于佛学修行的新文章。
---

## 引言

这里是文章的引言部分。

## 主要内容

这里是文章的主要内容。

## 结论

这里是文章的结论部分。
```

## 💻 技术栈

**主框架** - [Astro](https://astro.build/)
**类型检查** - [TypeScript](https://www.typescriptlang.org/)
**样式** - [TailwindCSS](https://tailwindcss.com/)
**UI/UX** - [Figma Design File](https://www.figma.com/community/file/1356898632249991861)
**静态搜索** - [FuseJS](https://pagefind.app/)
**图标** - [Tablers](https://tabler-icons.io/)
**代码格式化** - [Prettier](https://prettier.io/)
**部署** - [Cloudflare Pages](https://pages.cloudflare.com/)
**代码检查** - [ESLint](https://eslint.org)

## 👨🏻‍💻 本地运行

在您的目标目录中运行以下命令来开始使用这个项目：

```bash
# pnpm
pnpm create astro@latest --template satnaing/astro-paper

# npm
npm create astro@latest -- --template satnaing/astro-paper

# yarn
yarn create astro --template satnaing/astro-paper

# bun
bun create astro@latest -- --template satnaing/astro-paper
```

然后通过运行以下命令启动项目：

```bash
# 安装依赖（如果之前步骤没有安装）
pnpm install

# 启动项目
pnpm run dev
```

作为替代方法，如果您安装了 Docker，可以使用 Docker 在本地运行此项目：

```bash
# 构建 Docker 镜像
docker build -t astropaper .

# 运行 Docker 容器
docker run -p 4321:80 astropaper
```

## 🧞 命令

所有命令都从项目根目录的终端运行：

| 命令                              | 操作                                                                                                                           |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`                    | 安装依赖                                                                                                                        |
| `pnpm run dev`                    | 在 `localhost:4321` 启动本地开发服务器                                                                                          |
| `pnpm run build`                  | 构建生产站点到 `./dist/`                                                                                                        |
| `pnpm run preview`                | 在部署前本地预览构建结果                                                                                                         |
| `pnpm run format:check`           | 使用 Prettier 检查代码格式                                                                                                      |
| `pnpm run format`                 | 使用 Prettier 格式化代码                                                                                                         |
| `pnpm run sync`                   | 为所有 Astro 模块生成 TypeScript 类型。[了解更多](https://docs.astro.build/en/reference/cli-reference/#astro-sync)。             |
| `pnpm run lint`                   | 使用 ESLint 进行代码检查                                                                                                         |
| `docker compose up -d`            | 在 docker 上运行 AstroPaper，您可以使用与 `dev` 命令相同的主机名和端口访问。                                                    |
| `docker compose run app npm install` | 您可以在 docker 容器中运行上述任何命令。                                                                                         |
| `docker build -t astropaper .`    | 为 AstroPaper 构建 Docker 镜像。                                                                                                |
| `docker run -p 4321:80 astropaper` | 在 Docker 上运行 AstroPaper。网站将可在 `http://localhost:4321` 访问。                                                            |

## 📜 许可证

根据 MIT 许可证授权，版权 © 2025

---

由 [慧灯禅语](/) 制作 🤍