import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--color-bg-primary)' }}>
      <Navigation />
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </Container>
    </Box>
  );
}
