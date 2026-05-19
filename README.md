# 自由英雄目录 · Lib Hero Catalog

一个专为英雄 / 角色爱好者设计的个人记录平台。用户可以注册登录、创建英雄档案、记录相遇故事，并写下属于自己的日记。

🌐 **线上体验：[lib-hero-catalog.vercel.app](https://lib-hero-catalog.vercel.app)**

---

## ✨ 功能特性

- 🔐 **用户认证** — 邮箱注册 / 登录，支持邮件验证
- 🦸 **英雄档案** — 创建和管理你的英雄角色信息
- ⚔️ **相遇记录** — 记录与英雄之间的每一次相遇
- 📖 **日记系统** — 写下你的冒险日志和个人感悟

---

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | [Next.js 14](https://nextjs.org) (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS |
| 后端 / 数据库 | [Supabase](https://supabase.com) (PostgreSQL + Auth + RLS) |
| 部署 | [Vercel](https://vercel.com) |

---

## 🚀 本地运行

### 1. 克隆项目

```bash
git clone https://github.com/Scyyyy4/lib-hero-catalog.git
cd lib-hero-catalog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=你的_Supabase_项目_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_Supabase_Anon_Key
```

> 在 [Supabase Dashboard](https://supabase.com/dashboard) → 项目 → Settings → API 中获取。

### 4. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

---

## 📁 项目结构

```
lib-hero-catalog/
├── app/                # Next.js App Router 页面
├── components/         # 可复用组件
├── lib/                # Supabase 客户端及工具函数
└── public/             # 静态资源
```

---

## 📄 License

MIT
