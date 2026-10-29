-- Supabase 대시보드 > SQL Editor에서 한 번 실행한다.
create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 200),
  message text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- 누구나(anon) 메시지를 남길 수만 있고, 읽기·수정·삭제는 불가능하다.
-- 받은 메시지는 대시보드 Table Editor(소유자)에서 확인한다.
create policy "anyone can insert contact messages"
  on public.contact_messages
  for insert
  to anon
  with check (true);
