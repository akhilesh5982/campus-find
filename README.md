# CampusFind — College Discovery Platform

A production-grade MVP for discovering, comparing, and saving colleges in India.
Built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

---

## Features

- **College Listing + Search** — Filter by type, category, rating, sort by NIRF rank
- **College Detail Pages** — Overview, courses, placements, reviews tabs
- **Side-by-Side Compare** — Compare up to 3 colleges with highlighted best values
- **Authentication** — JWT-based login/signup with HTTP-only cookies
- **Saved Colleges** — Save and manage your favourite colleges

---

## Tech Stack

| Layer      | Tech                              |
|------------|-----------------------------------|
| Frontend   | Next.js 14 App Router, TypeScript |
| Styling    | Tailwind CSS                      |
| Backend    | Next.js API Routes                |
| Database   | PostgreSQL + Prisma ORM           |
| Auth       | JWT (jsonwebtoken) + bcryptjs     |
| Deployment | Vercel + Neon (recommended)       |

---

## Local Setup (Step-by-Step)

### 1. Clone / open the project

```bash
cd campusfind
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

**Option A — Neon (free cloud PostgreSQL, recommended)**
1. Go to https://neon.tech and create a free account
2. Create a new project → copy the connection string (looks like `postgresql://...`)

**Option B — Local PostgreSQL**
1. Make sure PostgreSQL is running locally
2. Create a database: `createdb campusfind`
3. Connection string: `postgresql://postgres:yourpassword@localhost:5432/campusfind`

### 4. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:
```
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="any-long-random-string"
```

### 5. Push the database schema

```bash
npx prisma db push
```

### 6. Seed the database with college data

```bash
npm run db:seed
```

This creates **12 colleges** (IITs, NITs, private, deemed) and a demo user:
- **Email:** `demo@campusfind.in`
- **Password:** `demo123`

### 7. Start the development server

```bash
npm run dev
```

Open http://localhost:3000

---

## Project Structure

```
campusfind/
├── prisma/
│   ├── schema.prisma          # Database models
│   └── seed.ts                # Seed data (12 colleges)
│
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout (Navbar + Providers)
│   │   ├── error.tsx          # Global error boundary
│   │   ├── not-found.tsx      # 404 page
│   │   │
│   │   ├── colleges/
│   │   │   ├── page.tsx       # College listing + filters
│   │   │   ├── loading.tsx    # Skeleton loader
│   │   │   └── [slug]/
│   │   │       ├── page.tsx   # College detail (tabs)
│   │   │       └── loading.tsx
│   │   │
│   │   ├── compare/
│   │   │   └── page.tsx       # Side-by-side comparison
│   │   │
│   │   ├── saved/
│   │   │   └── page.tsx       # Saved colleges (auth protected)
│   │   │
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   │
│   │   └── api/
│   │       ├── colleges/
│   │       │   ├── route.ts          # GET /api/colleges (search + filter)
│   │       │   └── [slug]/route.ts   # GET /api/colleges/:slug
│   │       ├── auth/
│   │       │   ├── login/route.ts
│   │       │   ├── signup/route.ts
│   │       │   ├── logout/route.ts
│   │       │   └── me/route.ts
│   │       ├── saved/route.ts        # GET/POST/DELETE saved colleges
│   │       ├── compare/route.ts      # GET /api/compare?ids=...
│   │       └── reviews/route.ts      # POST review
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── college/
│   │   │   ├── CollegeCard.tsx
│   │   │   └── CompareBar.tsx        # Floating compare tray
│   │   └── ui/
│   │       └── StarRating.tsx
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx    # User auth state
│   │   └── CompareContext.tsx # Compare list state (up to 3)
│   │
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   └── auth.ts            # JWT sign/verify helpers
│   │
│   ├── types/index.ts         # Shared TypeScript types
│   └── middleware.ts          # Protect /saved route
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/colleges` | List colleges (search, filter, paginate) |
| GET | `/api/colleges/:slug` | Single college with reviews |
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout (clears cookie) |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/saved` | Get saved colleges (auth) |
| POST | `/api/saved` | Save a college (auth) |
| DELETE | `/api/saved` | Unsave a college (auth) |
| GET | `/api/compare?ids=a,b,c` | Get colleges by IDs for compare |
| POST | `/api/reviews` | Post a review (auth) |

### Query params for `/api/colleges`

| Param | Example | Description |
|-------|---------|-------------|
| `search` | `iit` | Search name/city/state |
| `type` | `IIT` | Filter by type |
| `category` | `Engineering` | Filter by category |
| `minRating` | `4.0` | Minimum rating |
| `sortBy` | `rating` / `ranking` / `name` | Sort order |
| `page` | `1` | Page number |
| `pageSize` | `9` | Items per page |

---

## Deployment

### Vercel + Neon (recommended, both have free tiers)

1. **Database:** Create a project on https://neon.tech, copy `DATABASE_URL`
2. **Push to GitHub:**
   ```bash
   git init && git add . && git commit -m "initial"
   git remote add origin https://github.com/YOUR_USERNAME/campusfind.git
   git push -u origin main
   ```
3. **Deploy to Vercel:**
   - Go to https://vercel.com → New Project → import your repo
   - Add environment variables: `DATABASE_URL` and `JWT_SECRET`
   - Deploy
4. **Run migrations on prod:**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
   Or add `"build": "prisma generate && next build"` to run on deploy.

---

## Useful Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npx prisma studio    # Visual DB browser
npx prisma db push   # Sync schema to DB
npm run db:seed      # Seed college data
```

---

## Demo Credentials

After seeding, you can log in with:
- **Email:** demo@campusfind.in
- **Password:** demo123
