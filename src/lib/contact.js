// 메시지 전송 백엔드 선택.
// VITE_CONTACT_BACKEND = 'supabase' | 'formspree' | 'mailto' 로 직접 고르거나,
// 비워두면 설정된 값을 보고 supabase → formspree → mailto 순으로 자동 선택한다.
const env = import.meta.env;

const SUPABASE_URL = env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;
const FORMSPREE_ID = env.VITE_FORMSPREE_ID;

export function resolveBackend() {
  const chosen = env.VITE_CONTACT_BACKEND;
  if (chosen === 'supabase' && SUPABASE_URL && SUPABASE_ANON_KEY) return 'supabase';
  if (chosen === 'formspree' && FORMSPREE_ID) return 'formspree';
  if (chosen === 'mailto') return 'mailto';
  if (SUPABASE_URL && SUPABASE_ANON_KEY) return 'supabase';
  if (FORMSPREE_ID) return 'formspree';
  return 'mailto';
}

async function sendSupabase({ name, email, message }) {
  // anon key는 공개용이며, 테이블의 RLS 정책(insert만 허용)으로 보호한다. supabase/contact_messages.sql 참고.
  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ name, email, message }),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
}

async function sendFormspree(fields) {
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error(`Formspree ${res.status}`);
}

function openMailto({ name, email, message }, to) {
  const subject = encodeURIComponent(`[포트폴리오] ${name}님의 문의`);
  const body = encodeURIComponent(`${message}\n\n보낸 사람: ${name} (${email})`);
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
}

// 서버 전송이면 true, 메일 앱으로 넘기면 false를 반환한다.
export async function sendContact(fields, mailTo) {
  const backend = resolveBackend();
  if (backend === 'supabase') await sendSupabase(fields);
  else if (backend === 'formspree') await sendFormspree(fields);
  else {
    openMailto(fields, mailTo);
    return false;
  }
  return true;
}
