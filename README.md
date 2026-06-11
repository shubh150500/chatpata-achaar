# 🥭 Chatpata Achaar — Premium Scrollytelling Storefront

A production-ready, cinematic e-commerce website for a luxury Indian pickle
brand. Built with a 3D hero, scroll-driven storytelling, a full shopping cart,
**WhatsApp-based checkout (no payment gateway)**, and a complete admin
dashboard.

> **Data layer:** This build uses **Prisma + SQLite** so the client demo runs
> instantly with zero cloud setup. When you deliver, swap to **Firebase** —
> see [Migrating to Firebase](#-migrating-to-firebase).

---

## ✨ Tech Stack

| Area        | Tech                                                        |
| ----------- | ----------------------------------------------------------- |
| Framework   | Next.js 15 (App Router) + TypeScript                        |
| Styling     | Tailwind CSS, glassmorphism, custom luxury theme            |
| Animation   | Framer Motion + GSAP-style scroll transforms                |
| 3D          | Three.js + React Three Fiber + Drei                         |
| State       | Zustand (persisted cart)                                    |
| Database    | Prisma ORM + SQLite (demo) → Firebase (production)          |
| Auth        | JWT session cookies (`jose`) + bcrypt                       |

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up the database (creates dev.db + sample data)
npm run db:push
npm run db:seed

# 3. Run the dev server
npm run dev
```

Open **http://localhost:3000**.

### Admin panel

Visit **http://localhost:3000/admin** and log in with the seeded credentials:

```
Email:    admin@chatpata.com
Password: achaar123
```

> ⚠️ Change these in `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`) and re-seed, and
> set a real `ADMIN_JWT_SECRET` before going live.

---

## 🔧 Configuration

All config lives in `.env` (copy from `.env.example`):

| Variable                       | Purpose                                              |
| ------------------------------ | ---------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`  | Fallback WhatsApp order number                       |
| `DATABASE_URL`                 | SQLite path (`file:./dev.db`)                        |
| `ADMIN_JWT_SECRET`             | Secret for signing admin sessions                    |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin login                                 |

**The WhatsApp number is also editable live** from the admin panel
(**Settings** page) — no redeploy needed.

### Add your logo

Drop your logo file as **`/public/logo.png`** (transparent PNG ~512×512). It
automatically replaces the "CA" placeholder emblem in the hero, navbar, footer
and admin. Until then a premium typographic placeholder is shown.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                # Home — composes all storefront sections
│   ├── layout.tsx              # Root layout, fonts, SEO metadata
│   ├── globals.css             # Theme, glassmorphism, utilities
│   ├── admin/                  # Admin dashboard (protected by middleware)
│   │   ├── layout.tsx          #   sidebar shell + auth gate
│   │   ├── page.tsx            #   analytics dashboard
│   │   ├── login/              #   admin login
│   │   ├── products/           #   product CRUD + image upload
│   │   ├── orders/             #   order management + statuses
│   │   ├── customers/          #   customer database
│   │   └── settings/           #   WhatsApp number config
│   └── api/                    # Route handlers (products, orders, auth,
│                               #   customers, analytics, settings)
├── components/
│   ├── three/                  # 3D hero: PickleJar, SpiceParticles, Canvas
│   ├── sections/               # Hero, StoryScenes, TasteScenes, About,
│   │                           #   WhyChooseUs, Reviews, Gallery, FAQ, Contact
│   ├── products/               # ProductShowcase + ProductCard (tilt/glow)
│   ├── cart/                   # Slide-in CartPanel
│   ├── checkout/               # CheckoutModal → WhatsApp order generator
│   ├── layout/                 # Navbar, Footer
│   ├── admin/                  # AdminSidebar
│   └── ui/                     # LogoPlaceholder, SectionHeading, FloatingWhatsApp
├── lib/                        # prisma, auth, utils, types, whatsapp
├── store/                      # Zustand cart store
└── middleware.ts               # Protects /admin/*
prisma/
├── schema.prisma               # Product, Order, OrderItem, Customer, AdminUser, Setting
└── seed.ts                     # Sample products + admin user
```

---

## 🛒 How Checkout Works (No Payment Gateway)

1. Customer adds products → slide-in cart → **Checkout via WhatsApp**.
2. They fill name, phone, address, city, state, PIN, notes.
3. On **Place Order**:
   - The order is **saved to the database** (so it appears in the admin panel).
   - A formatted WhatsApp message is generated with customer + cart details.
   - The browser opens `https://wa.me/<admin-number>?text=<order>`.

Example generated message:

```
🥭 NEW ORDER — CHATPATA ACHAAR
Order: CA-XXXXX-1234

Customer Details
Name: Shubham
Phone: 9876543210
Address: ...

Products
- Royal Aam ka Achaar 500g x 2 = ₹698

Total: ₹698
```

---

## 🧑‍💼 Admin Features

- **Dashboard** — total orders, revenue, customers, avg order value, monthly
  sales chart, best-selling products.
- **Products** — add / edit / delete, image via URL or file upload, spice
  level, featured & stock toggles.
- **Orders** — view all WhatsApp orders, filter by status, update status
  (Pending → Confirmed → Packed → Shipped → Delivered).
- **Customers** — auto-built database with order counts and total spend.
- **Settings** — change the WhatsApp order number live.

---

## 🔥 Migrating to Firebase

When delivering to the client, replace the Prisma demo layer with Firebase:

1. **Auth** → Firebase Authentication
   - Replace `src/lib/auth.ts` + `/api/auth/*` with Firebase Auth.
   - Use Firebase Admin SDK in `middleware.ts` / server to verify ID tokens.
2. **Database** → Firestore
   - Recreate collections `products`, `orders`, `customers`, `settings`
     mirroring `prisma/schema.prisma`.
   - Swap the `prisma.*` calls inside `src/app/api/**` for Firestore queries.
     The API contracts (request/response shapes) stay identical, so the
     frontend needs **no changes**.
3. **Images** → Firebase Storage
   - In `admin/products`, upload the file to Storage and store the download URL
     instead of the base64 data URL.

Because all data access is isolated behind the `/api` routes and `src/lib`,
this is a contained swap — the entire UI, cart, checkout and admin stay as-is.

---

## 📜 Scripts

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `npm run dev`      | Start dev server                           |
| `npm run build`    | Production build (runs `prisma generate`)  |
| `npm run start`    | Start production server                    |
| `npm run db:push`  | Create/update the SQLite schema            |
| `npm run db:seed`  | Seed sample products + admin               |
| `npm run db:reset` | Wipe + re-seed (dev only)                  |

---

Made with 🥭 & lots of mustard oil.
