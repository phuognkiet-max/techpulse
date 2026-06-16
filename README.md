# TechPulse — Tin Tức Công Nghệ

Website tin tức công nghệ hiện đại, built với **Next.js 15** + **Sanity CMS** + **Tailwind CSS**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router, SSG/SSR Hybrid) |
| CMS | Sanity.io (Headless CMS) |
| Styling | Tailwind CSS |
| Deployment | Vercel (Frontend) + Sanity Cloud (CMS) |

## Features

- ✅ Hybrid Rendering (SSG + SSR)
- ✅ Headless CMS với Sanity
- ✅ Dark mode design
- ✅ Responsive on all devices
- ✅ SEO optimized
- ✅ Search functionality
- ✅ Category filtering
- ✅ Newsletter subscription
- ✅ Contact form

## Categories

- 🤖 AI & Machine Learning
- 📱 Mobile
- 🚀 Startup
- 💻 Software
- 🔧 Hardware

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account (free)

### Setup

```bash
# Clone repo
git clone https://github.com/yourusername/techpulse.git
cd techpulse

# Install dependencies
npm install

# Setup environment
cp .env.local.example .env.local
# Edit .env.local with your Sanity Project ID

# Run development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Sanity Setup

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize Sanity project
sanity init

# Deploy Sanity Studio
sanity deploy
```

## Project Structure

```
techpulse/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Homepage
│   │   ├── layout.tsx    # Root layout
│   │   ├── articles/     # Article detail pages
│   │   ├── categories/   # Category pages
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   └── search/       # Search page
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ArticleCard.tsx
│   ├── lib/              # Utilities
│   │   ├── sanity.ts     # Sanity client
│   │   └── queries.ts    # GROQ queries
│   └── types/            # TypeScript types
├── sanity/
│   └── schemas/          # Sanity content schemas
│       ├── article.ts
│       ├── category.ts
│       ├── author.ts
│       └── siteSettings.ts
└── public/               # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy!

### Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## License

MIT
