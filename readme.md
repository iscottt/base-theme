# nvpress综合示例主题

## 介绍

这是一个基于`vue3+nvpress`的示例主题。

## 安装

```bash
# 克隆项目
git clone https://github.com/iscottt/base-theme.git

# 进入项目目录
cd base-theme

# 安装依赖
npm install

# 启动项目
npm run dev
```

## 功能

- [x] 顶部导航栏
- [x] 文章列表
- [x] 文章详情
- [x] 文章标签
- [x] 文章分类
- [x] 文章归档
- [x] 文章评论

## 目录结构

```markdown
. 📂 base-theme
└── 📂 app/
│  ├── 📄 README.md
│  ├── 📄 application.html
│  ├── 📄 index.html
│  ├── 📄 package.json
│  ├── 📄 pnpm-lock.yaml
│  └── 📂 public/
│  └── 📂 src/
│    ├── 📄 App.vue
│    └── 📂 assets/
│      └── 📂 css/
│        ├── 📄 global.css
│      └── 📂 utils/
│        └── 📂 data/
│          ├── 📄 index.js
│        ├── 📄 index.js
│        └── 📂 request/
│          ├── 📄 index.js
│        └── 📂 storage/
│          ├── 📄 index.js
│    └── 📂 bases/
│      └── 📂 router/
│        ├── 📄 index.js
│      └── 📂 store/
│        ├── 📄 app.js
│        ├── 📄 index.js
│    └── 📂 components/
│      └── 📂 article-card/
│        ├── 📄 index.vue
│      └── 📂 block-parser/
│        ├── 📄 block-delimiter.vue
│        ├── 📄 block-header.vue
│        ├── 📄 block-image.vue
│        ├── 📄 block-list.vue
│        ├── 📄 block-paragraph.vue
│        ├── 📄 block-quote.vue
│        ├── 📄 block-raw.vue
│        ├── 📄 block-table.vue
│        ├── 📄 index.vue
│        ├── 📄 null.vue
│        ├── 📄 quote.svg
│      ├── 📄 index.js
│      └── 📂 nav-menu/
│        ├── 📄 index.vue
│        ├── 📄 nav-submenu.vue
│      └── 📂 pagination/
│        ├── 📄 index.vue
│        ├── 📄 readme.md
│      └── 📂 site-footer/
│        ├── 📄 index.vue
│      └── 📂 site-header/
│        ├── 📄 index.vue
│    ├── 📄 main.js
│    └── 📂 pages/
│      ├── 📄 404.vue
│      └── 📂 home/
│        ├── 📄 index.vue
│      └── 📂 post/
│        ├── 📄 comments.vue
│        ├── 📄 index.vue
│      └── 📂 term/
│        ├── 📄 index.vue
│  ├── 📄 vite.config.js
├── 📄 function.js
├── 📄 package.sh
├── 📄 readme.md
└── 📂 server/
│  ├── 📄 function-post.js
│  ├── 📄 function-ssr.js
│  ├── 📄 function.js
│  ├── 📄 package-lock.json
│  ├── 📄 package.json
│  ├── 📄 ssr-body.js
│  ├── 📄 ssr-common.js
│  ├── 📄 ssr-head.js
│  ├── 📄 webpack.config.cjs
│  ├── 📄 yarn.lock
└── 📂 srcs/
│  └── 📂 page-settings/
│    ├── 📄 index.vue
│  ├── 📄 ssr-style.css
└── 📄 theme.json
```

- `/app` 目录为`nvpress`的前台代码目录。
- `/server` 目录为`nvpress`的后台代码目录。
- `/srcs` 目录放置的是一些不用打包的可直接在后台引用的代码，如`page-settings`目录。
- `/package.sh` 为打包脚本，打包后会在项目生成一个`base-theme`文件夹，和`base-theme.zip`压缩包。

> 打包后的`base-theme`文件夹为`nvpress`的主题目录，您可以将其复制到`nvpress`的`themes`目录下，启用该主题。

## 注意事项

- 请确保您的`nvpress`版本为`5.3.0`以上。
- 本项目仅作为示例，不保证所有功能都可用。
- 如果您有任何问题，请提交`issue`。
