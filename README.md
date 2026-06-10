# Budget Homes (Om Value Homes)

A modern, SSR-enabled real estate website for affordable homes across Maharashtra (Nalasopara, Boisar, Palghar, Umroli). Built with **TanStack Start**, **React 19**, **Tailwind CSS v4**, and **Lovable Cloud** (Postgres + Auth) as the backend.

Live: https://omvaluehomes.lovable.app

---

## Features

- Server-rendered marketing site (Home, About, Properties, Services, Contact)
- Dynamic property listings with filters (location, type, price)
- Rich property details page (`/properties/:slug`) with gallery, amenities, highlights, specs, map, JSON-LD Product schema
- Per-page SEO: title, meta description, Open Graph, Twitter cards, canonical URLs
- Sitemap (`/sitemap.xml`) and `robots.txt`
- **Admin panel** at `/admin` for managing all property listings and homepage/about/contact content
- Email + password and Google sign-in
- Role-based access (only users with the `admin` role see admin pages)

---

## Local development

```bash
bun install        # or npm install
bun dev            # starts vite dev server on http://localhost:5173
```

The project uses Lovable Cloud — credentials are already in `.env`. No additional setup needed for local dev.

### Required env vars
| Variable | Where it's used |
|---|---|
| `VITE_SUPABASE_URL` / `SUPABASE_URL` | Backend URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_PUBLISHABLE_KEY` | Public anon key (safe to ship) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only admin operations (do not commit) |

---

## First-time admin setup

1. Visit `/auth` and create your account (email + password, or Google).
2. Open the Lovable Cloud dashboard → SQL editor → run:
   ```sql
   INSERT INTO public.user_roles (user_id, role)
   VALUES ('<your-auth-user-id>', 'admin');
   ```
   Your user ID is shown on the `/admin` access-denied screen after you sign in.
3. Refresh `/admin` — you now have full access to manage properties and site content.

---

## Admin panel (`/admin`)

| Page | What it does |
|---|---|
| `/admin` | Dashboard with stats and quick actions |
| `/admin/properties` | List, create, edit, delete property listings |
| `/admin/properties/new` | Add a new property (slug, images, amenities, highlights, RERA, map URL, etc.) |
| `/admin/properties/$id` | Edit any existing property |
| `/admin/content` | Edit homepage hero text, about section, and contact info |

All admin writes go through Row Level Security policies that check `has_role(auth.uid(), 'admin')`. Non-admin signed-in users see a "no access" screen.

---

## Database schema

Three tables in the `public` schema:

- **`properties`** — full listing data (slug, location, BHK, price, description, amenities[], highlights[], gallery[], bedrooms, bathrooms, parking, floor, possession, RERA, address, map URL, featured, status, sort_order).
- **`user_roles`** — links auth users to `admin` or `user` roles (used by access policies).
- **`site_content`** — JSON key/value store for editable hero / about / contact text.

A `has_role()` SECURITY DEFINER function powers all RLS checks.

---

## Deployment

### Recommended: Lovable hosting (zero-config)

This project runs natively on Lovable's edge runtime. SSR, server functions, static assets, and `/api/*` routes all work without configuration.

```
https://omvaluehomes.lovable.app
```

Push to the `main` branch and click **Publish** in the Lovable editor to deploy.

### Vercel deployment — why the 404 happens, and how to fix it

If you imported this GitHub repo into Vercel and got a **404 NOT_FOUND** error, that's expected — TanStack Start is **not** a plain SPA and Vercel doesn't know how to serve it out of the box. Plain "Output Directory = dist" or "Framework Preset = Vite" will not work.

There are two options:

#### Option A — Deploy as a Vercel-native SSR app (recommended for Vercel)

1. Install the Vercel preset and update the Vite config to emit a Vercel build:

   ```bash
   bun add -D @vercel/node
   ```

2. Replace the Lovable-specific config in `vite.config.ts` with a stock TanStack Start + Vercel target:

   ```ts
   // vite.config.ts
   import { defineConfig } from "vite";
   import { tanstackStart } from "@tanstack/react-start/plugin/vite";
   import tsConfigPaths from "vite-tsconfig-paths";
   import tailwindcss from "@tailwindcss/vite";

   export default defineConfig({
     plugins: [
       tsConfigPaths(),
       tanstackStart({
         target: "vercel",
         customViteReactPlugin: true,
       }),
       tailwindcss(),
     ],
   });
   ```

3. Add a `vercel.json` (already included in this repo) that pins the Node runtime.

4. Set environment variables in Vercel's dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

5. In Vercel project settings:
   - Build Command: `bun run build` (or `npm run build`)
   - Output Directory: *(leave blank — the TanStack Start plugin emits `.vercel/output`)*
   - Install Command: `bun install` (or `npm install`)

#### Option B — Skip Vercel and use Lovable hosting

Just click **Publish** in the Lovable editor. Custom domains can be attached from Project Settings → Domains.

> **Note on the 404:** A naive SPA deploy on Vercel will return 404 on every route except `/` because each route file needs the SSR runtime to render. You cannot fix this with `vercel.json` rewrites alone — the server bundle has to actually exist.

---

## Project structure

```
src/
├── routes/
│   ├── __root.tsx              # global layout, SEO, fonts
│   ├── index.tsx               # /
│   ├── properties.tsx          # /properties (list)
│   ├── properties.$slug.tsx    # /properties/:slug (detail)
│   ├── about.tsx
│   ├── services.tsx
│   ├── contact.tsx
│   ├── auth.tsx                # /auth (sign in / sign up)
│   ├── sitemap[.]xml.ts        # /sitemap.xml
│   └── _authenticated/         # routes requiring sign-in
│       ├── route.tsx           # auth gate
│       ├── admin.tsx           # admin layout (role check + sidebar)
│       ├── admin.index.tsx     # /admin
│       ├── admin.properties.tsx
│       ├── admin.properties.new.tsx
│       ├── admin.properties.$id.tsx
│       └── admin.content.tsx
├── components/
│   ├── SiteHeader.tsx
│   ├── SiteFooter.tsx
│   ├── WhatsAppFab.tsx
│   └── PropertyForm.tsx        # shared admin form
├── hooks/
│   └── useAuth.ts              # session + isAdmin
└── integrations/supabase/      # auto-generated client
```

---

## License

Private project — © Budget Homes / Om Value Homes.
