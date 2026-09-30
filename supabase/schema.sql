-- ═══════════════════════════════════════════════════════════
-- SOUNDKART · Supabase schema
-- Run in the Supabase SQL editor: schema.sql first, then seed.sql.
-- ═══════════════════════════════════════════════════════════

-- gen_random_uuid() for orders.id. Enabled by default on Supabase;
-- if this errors, enable it via Dashboard → Database → Extensions.
create extension if not exists "pgcrypto";

-- ── profiles ─────────────────────────────────────────────
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

-- ── products ─────────────────────────────────────────────
create table if not exists products (
  id text primary key,
  name text not null,
  brand text,                      -- Fender | Yamaha | JBL | ... (sample data)
  category text not null,           -- guitars | keyboards | drums | headphones | speakers | strings | mics | bundles
  price_inr integer not null,
  mrp_inr integer,
  rating numeric,
  reviews integer,
  badge text,                      -- Bestseller | Pro pick | Bundle deal
  image_url text,                   -- filename in product-images bucket / frontend assets
  blurb text,
  specs jsonb,                      -- ["spec 1", "spec 2"]
  in_stock boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── orders ───────────────────────────────────────────────
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  items jsonb not null,             -- [{ id, name, price_inr, qty }]
  subtotal integer,
  shipping integer,
  total integer,
  status text not null default 'placed',
  payment_method text,              -- razorpay | cod | upi_direct | whatsapp
  payment_id text,
  address jsonb,                    -- { name, phone, line1, city, state, pincode }
  created_at timestamptz not null default now()
);

-- ── RLS ──────────────────────────────────────────────────
alter table profiles enable row level security;
alter table products enable row level security;
alter table orders enable row level security;

-- products: public read (catalogue is public)
drop policy if exists "products public read" on products;
create policy "products public read"
  on products for select
  using (true);

-- profiles: users manage only their own row
drop policy if exists "profiles select own" on profiles;
create policy "profiles select own"
  on profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles insert own" on profiles;
create policy "profiles insert own"
  on profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles update own" on profiles;
create policy "profiles update own"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- orders: users read their own; anyone (signed-in or guest) may place an order
drop policy if exists "orders select own" on orders;
create policy "orders select own"
  on orders for select
  using (auth.uid() = user_id);

drop policy if exists "orders insert any" on orders;
create policy "orders insert any"
  on orders for insert
  with check (auth.uid() = user_id or user_id is null);

-- ── storage: public product-images bucket ────────────────
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product images public read" on storage.objects;
create policy "product images public read"
  on storage.objects for select
  using (bucket_id = 'product-images');
