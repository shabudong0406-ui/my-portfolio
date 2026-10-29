// Supabase REST로 방명록을 쓰고 읽는다. (supabase/guestbook.sql 참고)
const env = import.meta.env;
const SUPABASE_URL = env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

export const isConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const headers = () => ({
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
});

// 빈 입력은 null로 저장한다.
const clean = (v) => {
  const t = typeof v === 'string' ? v.trim() : v;
  return t === '' || t == null ? null : t;
};

export async function addEntry(f) {
  const amount = clean(f.startup_amount);
  const body = {
    name: clean(f.name),
    message: clean(f.message),
    email: clean(f.email),
    phone: clean(f.phone),
    sns: clean(f.sns),
    region: clean(f.region),
    age_group: clean(f.age_group),
    referral: clean(f.referral),
    startup_date: clean(f.startup_date),
    startup_amount: amount == null ? null : Number(amount),
    startup_reason: clean(f.startup_reason),
  };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/guestbook`, {
    method: 'POST',
    headers: { ...headers(), 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
}

// 공개 가능한 항목만 최근 순으로 가져온다.
export async function listEntries(limit = 20) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/guestbook_public?select=*&order=created_at.desc&limit=${limit}`,
    { headers: headers() },
  );
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  return res.json();
}
