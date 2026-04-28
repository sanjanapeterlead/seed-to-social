create table events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  path text,
  metadata jsonb,
  created_at timestamp with time zone default now()
);

create table generations (
  id uuid primary key default gen_random_uuid(),
  seed_text text not null,
  audience text,
  tone text,
  platforms text[],
  output jsonb,
  created_at timestamp with time zone default now()
);