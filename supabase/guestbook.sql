-- Supabase 대시보드 > SQL Editor에서 한 번 실행한다.
-- 방명록 테이블: 방문자는 "쓰기"만 가능하고, 비공개 항목은 소유자(대시보드)만 읽을 수 있다.

create table if not exists public.guestbook (
  -- 기본 정보
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),          -- 비공개
  message text not null check (char_length(message) between 1 and 5000),   -- 비공개

  -- 연락처 (선택, 모두 비공개)
  email text check (char_length(email) <= 200),
  phone text check (char_length(phone) <= 50),
  sns text check (char_length(sns) <= 200),

  -- 추가 정보 (선택, 공개 목록에 표시)
  region text check (char_length(region) <= 30),
  age_group text check (age_group in ('10대', '20대', '30대', '40대', '50대', '60대 이상')),
  referral text check (char_length(referral) <= 50),

  -- 창업 이야기 (선택)
  startup_date text check (char_length(startup_date) <= 50),               -- 직접 입력, 공개
  startup_amount bigint check (startup_amount >= 0),                       -- 비공개 (원)
  startup_reason text check (char_length(startup_reason) <= 2000)          -- 비공개
);

-- 최근 순 조회용
create index if not exists guestbook_created_at_idx on public.guestbook (created_at desc);

alter table public.guestbook enable row level security;

-- 익명 방문자(anon)는 insert만 허용. select/update/delete 정책은 만들지 않는다.
drop policy if exists "anyone can sign guestbook" on public.guestbook;
create policy "anyone can sign guestbook"
  on public.guestbook
  for insert
  to anon
  with check (true);

revoke select, update, delete on public.guestbook from anon;

-- 공개 목록: 비공개가 아닌 컬럼만 노출하는 뷰 (최근 순).
-- 뷰는 소유자 권한으로 실행되어 RLS를 우회하므로, 컬럼을 이 목록으로 한정하는 것이 보안 장치다.
create or replace view public.guestbook_public as
  select id, created_at, region, age_group, referral, startup_date
  from public.guestbook
  order by created_at desc;

grant select on public.guestbook_public to anon;
