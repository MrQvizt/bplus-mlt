-- ============================================================
-- Benefitplus – Supabase schema + seed data
-- Run this entire file in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ── Tables ──────────────────────────────────────────────────

create table if not exists public.providers (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  logo_url    text        not null,
  description text        not null,
  phone       text,
  instagram   text,
  areas       text[]      not null default '{}',
  locations   text[]      not null default '{}',
  created_at  timestamptz not null default now()
);

create table if not exists public.offers (
  id          uuid        primary key default gen_random_uuid(),
  provider_id uuid        not null references public.providers(id) on delete cascade,
  title       text        not null,
  description text        not null,
  category    text        not null check (category in ('Food','Fitness','Beauty','Activities','Shopping')),
  terms       text[]      not null default '{}',
  area        text        not null,
  address     text        not null,
  expiry_date date        not null,
  is_active   boolean     not null default true,
  base_code   text        not null,
  created_at  timestamptz not null default now()
);

create table if not exists public.promoted_offers (
  id          uuid        primary key default gen_random_uuid(),
  provider_id uuid        not null references public.providers(id) on delete cascade,
  offer_id    uuid        not null references public.offers(id)    on delete cascade,
  headline    text        not null,
  discount    text        not null,
  bg_gradient text        not null,
  sort_order  int         not null default 0,
  created_at  timestamptz not null default now()
);

-- ── Row-Level Security ───────────────────────────────────────

alter table public.providers       enable row level security;
alter table public.offers          enable row level security;
alter table public.promoted_offers enable row level security;

-- Public read (unauthenticated users can browse offers)
create policy "public read providers"
  on public.providers for select using (true);

create policy "public read offers"
  on public.offers for select using (true);

create policy "public read promoted_offers"
  on public.promoted_offers for select using (true);

-- ── Seed: Providers ─────────────────────────────────────────

insert into public.providers (id, name, logo_url, description, phone, instagram, areas, locations) values
(
  'aaaaaaaa-0000-0000-0000-000000000001',
  'Café del Mar',
  'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=100&h=100&fit=crop',
  'Premium beachside café serving artisan coffee, fresh pastries, and Mediterranean cuisine with stunning sea views.',
  '+356 2138 1234',
  'cafedelmar_malta',
  ARRAY['Sliema', 'St Julian''s'],
  ARRAY['Tower Road, Sliema', 'Spinola Bay, St Julian''s']
),
(
  'aaaaaaaa-0000-0000-0000-000000000002',
  'FitZone Gym',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop',
  'State-of-the-art fitness center with personal training, group classes, and modern equipment.',
  '+356 2731 5678',
  'fitzone_malta',
  ARRAY['Gzira', 'Msida'],
  ARRAY['Rue D''Argens, Gzira', 'University Heights, Msida']
),
(
  'aaaaaaaa-0000-0000-0000-000000000003',
  'Bella Vita Spa',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=100&h=100&fit=crop',
  'Luxury spa offering massages, facials, and wellness treatments in a tranquil setting.',
  '+356 2156 9012',
  null,
  ARRAY['Valletta'],
  ARRAY['Republic Street, Valletta']
),
(
  'aaaaaaaa-0000-0000-0000-000000000004',
  'Adventure Malta',
  'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=100&h=100&fit=crop',
  'Outdoor adventures including diving, kayaking, rock climbing, and island tours.',
  '+356 7934 5678',
  'adventure_malta',
  ARRAY['Sliema', 'Valletta'],
  ARRAY['The Strand, Sliema']
),
(
  'aaaaaaaa-0000-0000-0000-000000000005',
  'Trendy Threads',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
  'Contemporary fashion boutique featuring local designers and international brands.',
  null,
  'trendythreads_mt',
  ARRAY['Sliema', 'Birkirkara'],
  ARRAY['Bisazza Street, Sliema', 'Valley Road, Birkirkara']
),
(
  'aaaaaaaa-0000-0000-0000-000000000006',
  'Tasty Bites',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop',
  'Fast-casual restaurant serving gourmet burgers, wraps, and healthy bowls.',
  '+356 2123 4567',
  null,
  ARRAY['St Julian''s', 'Msida'],
  ARRAY['Paceville, St Julian''s', 'Regional Road, Msida']
),
(
  'aaaaaaaa-0000-0000-0000-000000000007',
  'Glow Studio',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop',
  'Beauty salon specializing in hair styling, makeup, and nail art.',
  '+356 2789 0123',
  'glowstudio_mt',
  ARRAY['Gzira'],
  ARRAY['Manoel Island, Gzira']
),
(
  'aaaaaaaa-0000-0000-0000-000000000008',
  'Island Escapes',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop',
  'Tour operator offering boat trips, sunset cruises, and Gozo day excursions.',
  '+356 9923 4567',
  'islandescapes_malta',
  ARRAY['Sliema', 'Valletta'],
  ARRAY['Ferries Terminal, Sliema']
)
on conflict (id) do nothing;

-- ── Seed: Offers ────────────────────────────────────────────

insert into public.offers (id, provider_id, title, description, category, terms, area, address, expiry_date, is_active, base_code) values
(
  'bbbbbbbb-0000-0000-0000-000000000001',
  'aaaaaaaa-0000-0000-0000-000000000001',
  '20% off all drinks',
  'Enjoy 20% discount on all beverages including specialty coffees, fresh juices, and cocktails.',
  'Food',
  ARRAY['Valid Monday to Friday', 'Not valid on public holidays', 'One redemption per visit'],
  'Sliema', 'Tower Road, Sliema', '2026-03-31', true, 'CAFE20'
),
(
  'bbbbbbbb-0000-0000-0000-000000000002',
  'aaaaaaaa-0000-0000-0000-000000000001',
  'Free dessert with main course',
  'Get a complimentary dessert when you order any main course from our Mediterranean menu.',
  'Food',
  ARRAY['Valid for dine-in only', 'Excludes special menus', 'Subject to availability'],
  'St Julian''s', 'Spinola Bay, St Julian''s', '2026-02-28', true, 'DESSRT'
),
(
  'bbbbbbbb-0000-0000-0000-000000000003',
  'aaaaaaaa-0000-0000-0000-000000000002',
  'First month 50% off',
  'New members get 50% off their first month of gym membership, including access to all facilities.',
  'Fitness',
  ARRAY['New members only', 'Valid ID required', '12-month commitment'],
  'Gzira', 'Rue D''Argens, Gzira', '2026-06-30', true, 'FIT50'
),
(
  'bbbbbbbb-0000-0000-0000-000000000004',
  'aaaaaaaa-0000-0000-0000-000000000002',
  'Free personal training session',
  'Book a complimentary 45-minute personal training session with our certified trainers.',
  'Fitness',
  ARRAY['One per person', 'Booking required', 'Subject to trainer availability'],
  'Msida', 'University Heights, Msida', '2026-04-30', true, 'PTFREE'
),
(
  'bbbbbbbb-0000-0000-0000-000000000005',
  'aaaaaaaa-0000-0000-0000-000000000003',
  '30% off all massages',
  'Relax and unwind with 30% off any massage treatment in our luxury spa.',
  'Beauty',
  ARRAY['Valid weekdays only', 'Advance booking required', 'Not valid with other offers'],
  'Valletta', 'Republic Street, Valletta', '2026-05-31', true, 'SPA30'
),
(
  'bbbbbbbb-0000-0000-0000-000000000006',
  'aaaaaaaa-0000-0000-0000-000000000003',
  'Facial + Manicure combo €45',
  'Special combo package: luxury facial treatment plus express manicure for only €45.',
  'Beauty',
  ARRAY['Save €25 on regular price', 'Booking 48h in advance', 'Valid until stock lasts'],
  'Valletta', 'Republic Street, Valletta', '2026-03-15', true, 'COMBO45'
),
(
  'bbbbbbbb-0000-0000-0000-000000000007',
  'aaaaaaaa-0000-0000-0000-000000000004',
  '25% off diving courses',
  'Learn to dive with our PADI-certified instructors at 25% off regular course fees.',
  'Activities',
  ARRAY['All certification levels', 'Equipment included', 'Min 2 participants'],
  'Sliema', 'The Strand, Sliema', '2026-08-31', true, 'DIVE25'
),
(
  'bbbbbbbb-0000-0000-0000-000000000008',
  'aaaaaaaa-0000-0000-0000-000000000004',
  'Buy 1 get 1 kayak rental',
  'Rent a kayak and get a second one free. Perfect for exploring Malta''s beautiful coastline.',
  'Activities',
  ARRAY['2-hour minimum rental', 'Subject to weather conditions', 'Safety briefing required'],
  'Sliema', 'The Strand, Sliema', '2026-09-30', true, 'KAYAK2'
),
(
  'bbbbbbbb-0000-0000-0000-000000000009',
  'aaaaaaaa-0000-0000-0000-000000000005',
  '15% off full-price items',
  'Enjoy 15% discount on all full-price clothing and accessories in store.',
  'Shopping',
  ARRAY['Excludes sale items', 'Cannot combine with other discounts', 'Valid in-store only'],
  'Sliema', 'Bisazza Street, Sliema', '2026-04-30', true, 'TREND15'
),
(
  'bbbbbbbb-0000-0000-0000-000000000010',
  'aaaaaaaa-0000-0000-0000-000000000005',
  'Free styling session',
  'Book a free 30-minute styling consultation with our fashion experts.',
  'Shopping',
  ARRAY['Booking required', 'One per customer', 'No purchase obligation'],
  'Birkirkara', 'Valley Road, Birkirkara', '2026-05-15', true, 'STYLE0'
),
(
  'bbbbbbbb-0000-0000-0000-000000000011',
  'aaaaaaaa-0000-0000-0000-000000000006',
  '€5 off orders over €20',
  'Get €5 off your bill when you spend €20 or more on food and drinks.',
  'Food',
  ARRAY['Dine-in or takeaway', 'One per transaction', 'Cannot combine with meal deals'],
  'St Julian''s', 'Paceville, St Julian''s', '2026-03-31', true, 'BITES5'
),
(
  'bbbbbbbb-0000-0000-0000-000000000012',
  'aaaaaaaa-0000-0000-0000-000000000006',
  'Free upgrade to large combo',
  'Order any medium combo and get upgraded to large for free.',
  'Food',
  ARRAY['Valid all day', 'One upgrade per order', 'While stocks last'],
  'Msida', 'Regional Road, Msida', '2026-02-28', true, 'UPSIZE'
),
(
  'bbbbbbbb-0000-0000-0000-000000000013',
  'aaaaaaaa-0000-0000-0000-000000000007',
  '20% off hair services',
  'Get 20% off any hair service including cuts, coloring, and treatments.',
  'Beauty',
  ARRAY['First-time clients', 'Excludes extensions', 'Booking required'],
  'Gzira', 'Manoel Island, Gzira', '2026-06-30', true, 'GLOW20'
),
(
  'bbbbbbbb-0000-0000-0000-000000000014',
  'aaaaaaaa-0000-0000-0000-000000000007',
  'Gel manicure + pedicure €35',
  'Treat yourself to a gel manicure and pedicure combo at a special price.',
  'Beauty',
  ARRAY['Save €15', 'Includes basic designs', 'Book 24h in advance'],
  'Gzira', 'Manoel Island, Gzira', '2026-04-15', true, 'NAILS35'
),
(
  'bbbbbbbb-0000-0000-0000-000000000015',
  'aaaaaaaa-0000-0000-0000-000000000008',
  '€10 off Gozo day trip',
  'Save €10 on our popular full-day Gozo island tour including lunch.',
  'Activities',
  ARRAY['Advance booking required', 'Subject to availability', 'Includes ferry transfer'],
  'Sliema', 'Ferries Terminal, Sliema', '2026-10-31', true, 'GOZO10'
),
(
  'bbbbbbbb-0000-0000-0000-000000000016',
  'aaaaaaaa-0000-0000-0000-000000000008',
  '2-for-1 sunset cruise',
  'Book one sunset cruise ticket and bring a friend for free.',
  'Activities',
  ARRAY['Every Wednesday & Friday', 'Includes welcome drink', 'Weather permitting'],
  'Valletta', 'Grand Harbour, Valletta', '2026-09-15', true, 'SUNSET2'
),
(
  'bbbbbbbb-0000-0000-0000-000000000017',
  'aaaaaaaa-0000-0000-0000-000000000002',
  '10 class pass for €60',
  'Get a 10-class fitness pass valid for yoga, spinning, or HIIT classes.',
  'Fitness',
  ARRAY['Valid 3 months', 'All group classes', 'Non-transferable'],
  'Gzira', 'Rue D''Argens, Gzira', '2026-07-31', true, 'CLASS10'
),
(
  'bbbbbbbb-0000-0000-0000-000000000018',
  'aaaaaaaa-0000-0000-0000-000000000001',
  'Brunch for 2 at €25',
  'Special weekend brunch menu for two including coffee and fresh juice.',
  'Food',
  ARRAY['Saturdays & Sundays only', '10am - 1pm', 'Reservation recommended'],
  'Sliema', 'Tower Road, Sliema', '2026-05-31', true, 'BRUNCH2'
),
(
  'bbbbbbbb-0000-0000-0000-000000000019',
  'aaaaaaaa-0000-0000-0000-000000000005',
  'Extra 10% off sale items',
  'Stack an extra 10% discount on already reduced sale items.',
  'Shopping',
  ARRAY['Valid in-store only', 'Selected items', 'While stocks last'],
  'Sliema', 'Bisazza Street, Sliema', '2026-02-15', true, 'SALE10'
),
(
  'bbbbbbbb-0000-0000-0000-000000000020',
  'aaaaaaaa-0000-0000-0000-000000000004',
  'Rock climbing intro €20',
  'Try indoor rock climbing with a 1-hour introduction session at a special rate.',
  'Activities',
  ARRAY['All equipment included', 'Beginners welcome', 'Age 12+'],
  'Sliema', 'The Strand, Sliema', '2026-08-15', true, 'CLIMB20'
)
on conflict (id) do nothing;

-- ── Seed: Promoted Offers ────────────────────────────────────

insert into public.promoted_offers (id, provider_id, offer_id, headline, discount, bg_gradient, sort_order) values
(
  'cccccccc-0000-0000-0000-000000000001',
  'aaaaaaaa-0000-0000-0000-000000000002',
  'bbbbbbbb-0000-0000-0000-000000000003',
  'New Year Fitness Deal',
  'UP TO 50% OFF',
  'from-rose-900 via-rose-800 to-rose-700',
  1
),
(
  'cccccccc-0000-0000-0000-000000000002',
  'aaaaaaaa-0000-0000-0000-000000000003',
  'bbbbbbbb-0000-0000-0000-000000000005',
  'Wellness Weekend',
  '30% OFF MASSAGES',
  'from-violet-900 via-violet-800 to-purple-700',
  2
),
(
  'cccccccc-0000-0000-0000-000000000003',
  'aaaaaaaa-0000-0000-0000-000000000008',
  'bbbbbbbb-0000-0000-0000-000000000016',
  'Island Adventure',
  '2-FOR-1 CRUISES',
  'from-sky-900 via-blue-800 to-cyan-700',
  3
)
on conflict (id) do nothing;
