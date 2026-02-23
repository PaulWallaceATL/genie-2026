# Genie - Watch, Earn & Win

A full-featured web and mobile application where users watch ads to earn **Genie Coins**, buy coins, and use them in exciting **penny auctions** to win amazing prizes.

Built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Capacitor** for seamless cross-platform deployment (Web, iOS, Android) from a single codebase.

---

## Features

- **User Authentication** — Secure sign-up and login with email/password (JWT-based)
- **Coin System** — Earn Genie Coins by watching ads or purchase them from the shop
- **Penny Auctions** — Each bid raises the price by $0.01 and resets a countdown timer
- **Live Bidding** — Real-time auction updates with current price, last bidder, and timer
- **Cross-Platform** — Capacitor wraps the web app for App Store and Play Store deployment
- **PWA Ready** — Includes manifest for Progressive Web App installation

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | better-sqlite3 |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| State | Zustand |
| Mobile | Capacitor |

---

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The SQLite database (`genie.db`) is automatically created and seeded with sample auctions and coin packages on first run.

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel will auto-detect Next.js — click **Deploy**

> **Note:** The SQLite database works for development and demo purposes. For production on Vercel, you should migrate to a cloud database (e.g., Vercel Postgres, PlanetScale, Neon, or Supabase).

---

## Build for Mobile (iOS & Android)

This project uses **Capacitor** to wrap the Next.js web app into native mobile apps.

### Option A: Use the Build Script

```bash
pnpm run build:mobile
```

This script will:
1. Configure Next.js for static export
2. Build the static web app into the `out/` directory
3. Sync web assets with native iOS/Android projects
4. Restore the dev configuration

### Option B: Manual Steps

```bash
# Build static export
npx next build   # (with output: 'export' in next.config.ts)

# Sync with native projects
npx cap sync

# Open in IDEs
npx cap open ios      # Opens Xcode
npx cap open android  # Opens Android Studio
```

### Run on Device

```bash
npx cap run ios       # Run on iOS simulator/device
npx cap run android   # Run on Android emulator/device
```

---

## Project Structure

```
genie/
├── public/                          # Static assets, PWA manifest
│   └── manifest.json
├── scripts/
│   └── build-mobile.sh              # Mobile build helper
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── register/route.ts
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── logout/route.ts
│   │   │   │   └── me/route.ts
│   │   │   ├── auctions/
│   │   │   │   ├── route.ts          # GET auctions list
│   │   │   │   └── bid/route.ts      # POST place bid
│   │   │   ├── coins/
│   │   │   │   ├── buy/route.ts      # GET packages, POST purchase
│   │   │   │   └── watch-ad/route.ts # POST earn coins
│   │   │   └── transactions/route.ts # GET transaction history
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── auctions/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── shop/page.tsx
│   │   ├── watch/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Landing page
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── BottomNav.tsx
│   │   ├── CoinBadge.tsx
│   │   └── TopBar.tsx
│   ├── lib/
│   │   ├── auth.ts                   # JWT helpers
│   │   └── db.ts                     # SQLite init + seed
│   └── store/
│       └── useAuth.ts                # Zustand auth store
├── capacitor.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create account (email, username, password) |
| POST | `/api/auth/login` | No | Login (email, password) |
| GET | `/api/auth/me` | Yes | Get current user profile |
| POST | `/api/auth/logout` | Yes | Logout (clears cookie) |
| POST | `/api/coins/watch-ad` | Yes | Watch ad → earn 2 coins (rate-limited) |
| GET | `/api/coins/buy` | No | List coin packages |
| POST | `/api/coins/buy` | Yes | Purchase a coin package |
| GET | `/api/auctions` | No | List all active auctions |
| POST | `/api/auctions/bid` | Yes | Place a bid (costs 1 coin) |
| GET | `/api/transactions` | Yes | Get transaction history |

---

## NPM Scripts

| Script | Command | Description |
|---|---|---|
| `pnpm dev` | `next dev` | Start development server |
| `pnpm build` | `next build` | Build for production |
| `pnpm start` | `next start` | Start production server |
| `pnpm build:mobile` | `bash scripts/build-mobile.sh` | Build + sync for mobile |
| `pnpm cap:sync` | `npx cap sync` | Sync web assets to native |
| `pnpm cap:ios` | `npx cap open ios` | Open in Xcode |
| `pnpm cap:android` | `npx cap open android` | Open in Android Studio |

---

## Production Checklist

- [ ] Replace SQLite with a cloud database (Postgres, MySQL, PlanetScale)
- [ ] Integrate real ad network (Google AdMob, Unity Ads)
- [ ] Integrate payment gateway (Stripe for web, Apple IAP / Google Play Billing for mobile)
- [ ] Add real-time WebSocket support for live auction updates
- [ ] Set `JWT_SECRET` environment variable (currently uses a default)
- [ ] Add rate limiting and abuse prevention
- [ ] Configure Capacitor app signing for App Store / Play Store submission
