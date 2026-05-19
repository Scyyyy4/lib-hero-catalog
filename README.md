# Lib Hero Catalog

> *Born in a library during finals week.*

It started with a simple idea from my friend **LING Shuyun** — we were cramming for finals together at the library when she turned to me and said: *"You're an engineering student, right? Can you build something that makes this place a little less boring?"*

So I did. **Lib Hero Catalog** is a personal record-keeping app for the library — a place to catalog the interesting people you spot, log the encounters that break the monotony, and capture your thoughts in a diary. Because every library has its own cast of characters.

🌐 **Live at: [lib-hero-catalog.vercel.app](https://lib-hero-catalog.vercel.app)**

---

## Features

- 🔐 **Auth** — Sign up / sign in with email verification
- 🦸 **Hero Profiles** — Catalog the interesting people you spot in the library
- ⚔️ **Encounter Log** — Record every memorable sighting or interaction
- 📖 **Diary** — Write down your thoughts, feelings, and study-session stories

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Backend / DB | [Supabase](https://supabase.com) (PostgreSQL + Auth + RLS) |
| Deployment | [Vercel](https://vercel.com) |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Scyyyy4/lib-hero-catalog.git
cd lib-hero-catalog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Get these from your [Supabase Dashboard](https://supabase.com/dashboard) → Project → Settings → API.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it running.

---

## Project Structure

```
lib-hero-catalog/
├── app/               # Next.js App Router pages
├── components/        # Reusable UI components
├── lib/               # Supabase client & utilities
└── public/            # Static assets
```

---

## A Note

This project exists because of Shuyun's spark of an idea on a quiet finals afternoon. Sometimes the best things are built just to make one place feel a little more alive.

---

## License

MIT
