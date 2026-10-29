import { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Divider,
  Alert,
  Box,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { addEntry, listEntries, isConfigured } from '../../lib/guestbook';

// 연락처·SNS 값은 임시 자리표시자. 실제 정보로 교체해서 사용한다.
const contacts = [
  { icon: <EmailOutlinedIcon />, label: 'jini0406@daum.net', href: 'mailto:jini0406@daum.net' },
  { icon: <PhoneOutlinedIcon />, label: '010-0000-0000', href: 'tel:01000000000' },
];

const socials = [
  { icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com/' },
  { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { icon: <InstagramIcon />, label: 'Instagram', href: 'https://www.instagram.com/' },
];

const REGIONS = [
  '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
  '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주',
];
const AGE_GROUPS = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];
const REFERRALS = ['검색', 'SNS', '지인 소개', '포트폴리오 링크', '기타'];

const EMPTY = {
  name: '',
  message: '',
  email: '',
  phone: '',
  sns: '',
  region: '',
  age_group: '',
  referral: '',
  startup_date: '',
  startup_amount: '',
  startup_reason: '',
};

const PRIVATE = '비공개로 저장됩니다';

const formatDate = (iso) => new Date(iso).toLocaleDateString('ko-KR');

function GroupTitle({ children, hint }) {
  return (
    <Stack spacing={0.25}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {children}
      </Typography>
      {hint && (
        <Typography variant="caption" sx={{ color: 'var(--color-text-muted)' }}>
          {hint}
        </Typography>
      )}
    </Stack>
  );
}

// 무채색(검정/흰색/회색)만 사용하는 심플한 컨택트 섹션 + 방명록
export default function ContactSection() {
  const [form, setForm] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [entries, setEntries] = useState([]);
  const [listError, setListError] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const load = useCallback(async () => {
    if (!isConfigured) return;
    try {
      setEntries(await listEntries());
      setListError(false);
    } catch {
      setListError(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return; // 봇이 채우는 숨김 필드
    setStatus('sending');
    try {
      await addEntry(form);
      setStatus('sent');
      setForm(EMPTY);
      load();
    } catch {
      setStatus('error');
    }
  };

  const fieldProps = { fullWidth: true, size: 'small' };

  return (
    <Card id="contact" component="section" sx={{ bgcolor: 'var(--color-bg-primary)' }}>
      <CardContent sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 6 } }}>
        <Stack spacing={4} alignItems="center" sx={{ maxWidth: 860, mx: 'auto' }}>
          <Stack spacing={1} alignItems="center" textAlign="center">
            <Typography variant="h4" component="h2">
              Contact
            </Typography>
            <Typography sx={{ color: 'var(--color-text-secondary)' }}>
              연락처로 편하게 연락 주시거나, 아래 방명록에 한 줄 남겨주세요.
            </Typography>
          </Stack>

          <Stack spacing={1.5} alignItems="center">
            {contacts.map((c) => (
              <Stack
                key={c.label}
                direction="row"
                spacing={1.5}
                alignItems="center"
                component="a"
                href={c.href}
                sx={{
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  '&:hover': { color: 'var(--color-text-secondary)' },
                }}
              >
                {c.icon}
                <Typography>{c.label}</Typography>
              </Stack>
            ))}
          </Stack>

          <Stack direction="row" spacing={1.5} justifyContent="center">
            {socials.map((s) => (
              <IconButton
                key={s.label}
                aria-label={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: 48,
                  height: 48,
                  border: '1px solid var(--color-border-strong)',
                  color: 'var(--color-text-primary)',
                  '&:hover': {
                    bgcolor: 'var(--color-button-primary)',
                    color: 'var(--color-bg-primary)',
                  },
                }}
              >
                {s.icon}
              </IconButton>
            ))}
          </Stack>

          <Divider flexItem sx={{ borderColor: 'var(--color-border)' }} />

          <Typography variant="h6" component="h3">
            방명록 남기기
          </Typography>

          <Stack component="form" spacing={4} sx={{ width: '100%' }} onSubmit={handleSubmit}>
            {/* 가로 2단: 1단 = 기본 필수 정보, 2단 = 연락처 관련 추가 정보 */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 4, md: 6 },
                alignItems: 'start',
              }}
            >
              <Stack spacing={2}>
                <GroupTitle hint={`이름과 메시지는 ${PRIVATE}`}>기본 정보</GroupTitle>
                <TextField {...fieldProps} label="이름" value={form.name} onChange={set('name')} required />
                <TextField
                  {...fieldProps}
                  label="메시지"
                  value={form.message}
                  onChange={set('message')}
                  multiline
                  minRows={6}
                  required
                />
              </Stack>

              <Stack spacing={4}>
                <Stack spacing={2}>
                  <GroupTitle hint={`선택 사항 · 모두 ${PRIVATE}`}>연락처</GroupTitle>
                  <TextField {...fieldProps} label="이메일" type="email" value={form.email} onChange={set('email')} />
                  <TextField {...fieldProps} label="전화번호" type="tel" value={form.phone} onChange={set('phone')} />
                  <TextField
                    {...fieldProps}
                    label="SNS 계정 (인스타, 트위터 등)"
                    value={form.sns}
                    onChange={set('sns')}
                  />
                </Stack>

                <Stack spacing={2}>
                  <GroupTitle hint="선택 사항 · 지역, 나이대, 알게 된 경로는 최근 방문자 목록에 공개됩니다">
                    추가 정보
                  </GroupTitle>
                  <TextField {...fieldProps} select label="거주 지역" value={form.region} onChange={set('region')}>
                    <MenuItem value="">선택 안 함</MenuItem>
                    {REGIONS.map((r) => (
                      <MenuItem key={r} value={r}>
                        {r}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField {...fieldProps} select label="나이대" value={form.age_group} onChange={set('age_group')}>
                    <MenuItem value="">선택 안 함</MenuItem>
                    {AGE_GROUPS.map((a) => (
                      <MenuItem key={a} value={a}>
                        {a}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    {...fieldProps}
                    select
                    label="어떻게 알게 되었나요?"
                    value={form.referral}
                    onChange={set('referral')}
                  >
                    <MenuItem value="">선택 안 함</MenuItem>
                    {REFERRALS.map((r) => (
                      <MenuItem key={r} value={r}>
                        {r}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Stack>
            </Box>

            {/* 마지막: 재미있는 정보 (전체 폭) */}
            <Stack spacing={2}>
              <GroupTitle hint="선택 사항 · 창업 시기는 공개, 창업 금액과 이유는 비공개로 저장됩니다">
                창업 이야기
              </GroupTitle>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <TextField
                  {...fieldProps}
                  label="창업 시기 (직접 입력)"
                  placeholder="예: 2026년 3월 / 준비 중"
                  value={form.startup_date}
                  onChange={set('startup_date')}
                  inputProps={{ maxLength: 50 }}
                />
                <TextField
                  {...fieldProps}
                  label="창업 금액 (원)"
                  type="number"
                  value={form.startup_amount}
                  onChange={set('startup_amount')}
                  inputProps={{ min: 0 }}
                />
              </Box>
              <TextField
                {...fieldProps}
                label="창업을 하는 이유"
                value={form.startup_reason}
                onChange={set('startup_reason')}
                multiline
                minRows={3}
              />
            </Stack>

            {/* 스팸 봇 방지용 숨김 필드 */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }}
              aria-hidden="true"
            />

            <Stack spacing={2}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={status === 'sending' || !isConfigured}
              >
                {status === 'sending' ? '남기는 중...' : '방명록 남기기'}
              </Button>
              {!isConfigured && <Alert severity="warning">방명록 서버 설정이 아직 연결되지 않았습니다.</Alert>}
              {status === 'sent' && <Alert severity="success">방명록이 등록되었습니다. 감사합니다!</Alert>}
              {status === 'error' && <Alert severity="error">등록에 실패했습니다. 잠시 후 다시 시도해주세요.</Alert>}
            </Stack>
          </Stack>

          <Divider flexItem sx={{ borderColor: 'var(--color-border)' }} />

          <Stack spacing={1.5} sx={{ width: '100%', maxWidth: 480 }}>
            <Typography variant="h6" component="h3" textAlign="center">
              최근 방문자
            </Typography>
            {listError && <Alert severity="error">목록을 불러오지 못했습니다.</Alert>}
            {!listError && isConfigured && entries.length === 0 && (
              <Typography textAlign="center" sx={{ color: 'var(--color-text-muted)' }}>
                아직 방명록이 없습니다. 첫 번째 방문자가 되어주세요.
              </Typography>
            )}
            {entries.map((en) => {
              const info = [en.region, en.age_group, en.referral && `${en.referral}로 알게 됨`, en.startup_date && `창업 ${en.startup_date}`]
                .filter(Boolean)
                .join(' · ');
              return (
                <Stack
                  key={en.id}
                  spacing={0.25}
                  sx={{ p: 1.5, border: '1px solid var(--color-border)', borderRadius: 2 }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    방문자 #{en.id}
                  </Typography>
                  {info && (
                    <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                      {info}
                    </Typography>
                  )}
                  <Typography variant="caption" sx={{ color: 'var(--color-text-muted)' }}>
                    {formatDate(en.created_at)}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
