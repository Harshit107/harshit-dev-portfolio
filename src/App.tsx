import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from './theme/ThemeContext';
import { GlobalStyles } from './theme/GlobalStyles';
import { AtmosphereBackground } from './components/3d/AtmosphereBackground';
import { ScrollFloatingShapes } from './components/3d/ScrollFloatingShapes';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { EducationSection } from './components/sections/EducationSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  position: relative;
  z-index: 1;
`;

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <AppContainer>
        <AtmosphereBackground />
        <ScrollFloatingShapes />
        <Navbar />
        <MainContent>
          <Hero />
          <About />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <ContactSection />
        </MainContent>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
