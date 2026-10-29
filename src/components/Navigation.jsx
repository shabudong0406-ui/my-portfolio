import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Container, Box, Button, Typography } from '@mui/material';

const tabs = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Me' },
  { to: '/projects', label: 'Projects' },
];

export default function Navigation() {
  return (
    <AppBar position="sticky">
      <Container maxWidth="md">
        <Toolbar
          disableGutters
          sx={{ flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'space-between' }, gap: 1, py: 1 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--color-primary)' }}>
            My Portfolio
          </Typography>
          <Box component="nav" sx={{ display: 'flex', gap: 0.5 }}>
            {tabs.map((t) => (
              <Button
                key={t.to}
                component={NavLink}
                to={t.to}
                end
                sx={{
                  color: 'var(--color-text-secondary)',
                  '&:hover': { color: 'var(--color-link-hover)' },
                  '&.active': { color: 'var(--color-primary)', bgcolor: 'var(--color-bg-secondary)' },
                }}
              >
                {t.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
