import { Card, CardContent, Typography } from '@mui/material';

export default function Projects() {
  return (
    <Card component="section" sx={{ textAlign: 'center' }}>
      <CardContent sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 6 } }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'var(--color-primary)' }}>
          Projects
        </Typography>
        <Typography sx={{ color: 'var(--color-text-secondary)' }}>
          Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
        </Typography>
      </CardContent>
    </Card>
  );
}
