# SoundKart · Supabase setup

Database + storage for the storefront. ~10 minutes.

## 1. Create the project
1. Go to https://supabase.com → New project.
2. Note the **Project URL** and **anon public key** (Project Settings → API).

## 2. Run the SQL
1. Open **SQL Editor** → New query.
2. Paste the full contents of `schema.sql` → **Run**.
   - Creates `profiles`, `products`, `orders` with RLS, plus the public
     `product-images` storage bucket and its read policy.
3. New query → paste `seed.sql` → **Run**.
   - Inserts/updates the 28 sample products (idempotent — safe to re-run).

Verify: **Table Editor** → `products` should show 28 rows.

## 3. Upload product images
1. Open **Storage** → `product-images` bucket (public).
2. Upload the 9 `.webp` files from the frontend repo's `src/assets/`:
   `hero.webp`, `product-guitar.webp`, `product-headphones.webp`,
   `product-keyboard.webp`, `product-drums.webp`, `product-speakers.webp`,
   `product-mic.webp`, `product-strings.webp`, `product-synth.webp`.
3. The seed's `image_url` values are bare filenames, so the frontend builds
   the public URL as `{SUPABASE_URL}/storage/v1/object/public/product-images/{image_url}`.

## 4. Wire the frontend
In the frontend `.env`:
```
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon public key>
```

## 5. Auth (for accounts + order history)
**Authentication** → Providers → Email is on by default. For testing you may
turn off "Confirm email" under **Authentication** → Settings.

When a user signs up, the frontend inserts a matching row into `profiles`
(`id` = the auth user id) — RLS allows users to manage only their own row.

## 6. Swapping in the real catalogue
The `products` table is the source of truth once Supabase is wired. To replace
the 28 sample SKUs with the real brand/manufacturer import, upload a CSV
(export format: `id,name,brand,category,price_inr,mrp_inr,badge,image_url,blurb`)
via **Table Editor** → Insert → Import CSV, then upload the matching photos to
the `product-images` bucket.
