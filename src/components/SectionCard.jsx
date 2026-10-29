import { Card, CardContent, Typography, Chip } from '@mui/material';

// 홈 화면 섹션 공통 카드. accent가 true면 Primary 컬러 배경을 쓴다.
export default function SectionCard({ id, index, title, text, accent = false }) {
  return (
    <Card
      id={id}
      component="section"
      sx={{
        textAlign: 'center',
        ...(accent && {
          bgcolor: 'var(--color-primary)',
          color: '#FFFFFF',
          borderColor: 'var(--color-primary-dark)',
        }),
        ...(!accent && index % 2 === 1 && { bgcolor: 'var(--color-bg-primary)' }),
      }}
    >
      <CardContent sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 6 } }}>
        <Chip
          label={`0${index}`}
          size="small"
          sx={{
            mb: 2,
            fontWeight: 700,
            bgcolor: accent ? '#FFFFFF' : 'var(--color-accent)',
            color: accent ? 'var(--color-primary-dark)' : '#FFFFFF',
          }}
        />
        <Typography variant={accent ? 'h2' : 'h4'} component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography
          sx={{ color: accent ? '#FFFFFF' : 'var(--color-text-secondary)', maxWidth: 560, mx: 'auto' }}
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
