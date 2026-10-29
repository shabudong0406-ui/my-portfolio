import { Routes, Route, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Container, Box, Button, Typography } from '@mui/material';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';

const tabs = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Me' },
  { to: '/projects', label: 'Projects' },
];

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--color-bg-primary)' }}>
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
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Container>
    </Box>
  );
}
