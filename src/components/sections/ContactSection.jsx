import { useState } from 'react';
import { Card, CardContent, Typography, Stack, IconButton, Button, TextField, Divider, Alert } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { sendContact } from '../../lib/contact';

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

const MAIL_TO = contacts[0].label;

// 무채색(검정/흰색/회색)만 사용하는 심플한 컨택트 섹션
export default function ContactSection() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields = { name: data.get('name'), email: data.get('email'), message: data.get('message') };

    setStatus('sending');
    try {
      const sent = await sendContact(fields, MAIL_TO);
      setStatus(sent ? 'sent' : 'idle');
      if (sent) form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <Card id="contact" component="section" sx={{ bgcolor: 'var(--color-bg-primary)' }}>
      <CardContent sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 6 } }}>
        <Stack spacing={4} alignItems="center" sx={{ maxWidth: 480, mx: 'auto' }}>
          <Stack spacing={1} alignItems="center" textAlign="center">
            <Typography variant="h4" component="h2">
              Contact
            </Typography>
            <Typography sx={{ color: 'var(--color-text-secondary)' }}>
              여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
            </Typography>
          </Stack>

          <Divider flexItem sx={{ borderColor: 'var(--color-border)' }} />

          <Stack spacing={1.5} sx={{ width: '100%' }}>
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
                  justifyContent: { xs: 'center', sm: 'flex-start' },
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

          <Stack component="form" spacing={2} sx={{ width: '100%' }} onSubmit={handleSubmit}>
            <TextField name="name" label="이름" size="small" required fullWidth />
            <TextField name="email" label="이메일" type="email" size="small" required fullWidth />
            <TextField name="message" label="메시지" multiline minRows={4} required fullWidth />
            <Button type="submit" variant="contained" size="large" disabled={status === 'sending'}>
              {status === 'sending' ? '보내는 중...' : '보내기'}
            </Button>
            {status === 'sent' && <Alert severity="success">메시지가 전송되었습니다.</Alert>}
            {status === 'error' && <Alert severity="error">전송에 실패했습니다. 잠시 후 다시 시도해주세요.</Alert>}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
