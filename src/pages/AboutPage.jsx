import { Card, CardContent, Typography } from '@mui/material';

export default function AboutPage() {
  return (
    <Card component="section" sx={{ textAlign: 'center' }}>
      <CardContent sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 6 } }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'var(--color-primary)' }}>
          About Me
        </Typography>
        <Typography sx={{ color: 'var(--color-text-secondary)' }}>
          About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다.
        </Typography>
      </CardContent>
    </Card>
  );
}
