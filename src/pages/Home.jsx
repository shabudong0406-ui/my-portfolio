import { Card, CardContent, Typography, Stack, Chip } from '@mui/material';

const sections = [
  { id: 'hero', title: 'Hero', accent: true, text: '여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.' },
  { id: 'about', title: 'About Me', text: "여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다." },
  { id: 'skill', title: 'Skill Tree', text: '여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.' },
  { id: 'projects', title: 'Projects', text: "여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다." },
  { id: 'contact', title: 'Contact', text: '여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.' },
];

export default function Home() {
  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      {sections.map((s, i) => (
        <Card
          key={s.id}
          component="section"
          sx={{
            textAlign: 'center',
            ...(s.accent && {
              bgcolor: 'var(--color-primary)',
              color: '#FFFFFF',
              borderColor: 'var(--color-primary-dark)',
            }),
            ...(i % 2 === 1 && !s.accent && { bgcolor: 'var(--color-bg-primary)' }),
          }}
        >
          <CardContent sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 6 } }}>
            <Chip
              label={`0${i + 1}`}
              size="small"
              sx={{
                mb: 2,
                fontWeight: 700,
                bgcolor: s.accent ? '#FFFFFF' : 'var(--color-accent)',
                color: s.accent ? 'var(--color-primary-dark)' : '#FFFFFF',
              }}
            />
            <Typography variant={s.accent ? 'h2' : 'h4'} component="h2" gutterBottom>
              {s.title}
            </Typography>
            <Typography
              sx={{ color: s.accent ? '#FFFFFF' : 'var(--color-text-secondary)', maxWidth: 560, mx: 'auto' }}
            >
              {s.text}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
