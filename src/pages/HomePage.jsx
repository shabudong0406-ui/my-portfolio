import { Stack } from '@mui/material';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillSection from '../components/sections/SkillSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';

export default function HomePage() {
  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      <HeroSection />
      <AboutSection />
      <SkillSection />
      <ProjectsSection />
      <ContactSection />
    </Stack>
  );
}
