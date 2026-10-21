import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { projects } from '../../data/portfolioData';
import { breakpoints } from '../../theme/theme';

const ProjectsWrapper = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

const FilterTab = styled.button<{ $active: boolean }>`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1.15rem;
  border-radius: 9999px;
  background: ${({ theme, $active }) => ($active ? theme.accent : theme.bgElevated)};
  color: ${({ theme, $active }) => ($active ? '#FFFFFF' : theme.textSecondary)};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.accent : theme.borderColor)};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme, $active }) => ($active ? '#FFFFFF' : theme.textPrimary)};
    border-color: ${({ theme }) => theme.accent};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.25rem;
  position: relative;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.bgElevated};
  margin-bottom: 1.25rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  ${ProjectCard}:hover img {
    transform: scale(1.05);
  }

  .tech-overlay {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.35rem;
  font-family: 'Space Grotesk', sans-serif;
`;

const ProjectTagline = styled.div`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.accent};
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
`;

const ProjectDescription = styled.p`
  font-size: 0.885rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.25rem;
  flex-grow: 1;
`;

const TechChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const filters = ['All Projects', 'Full-Stack & Web', 'Android & Mobile', 'APIs & Libraries'];

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All Projects') return true;
    if (activeFilter === 'Full-Stack & Web') {
      return project.tech.some((t) => ['React', 'React 19', 'TypeScript', 'Node.js', 'Express', 'JavaScript'].includes(t));
    }
    if (activeFilter === 'Android & Mobile') {
      return project.tech.includes('Android');
    }
    if (activeFilter === 'APIs & Libraries') {
      return project.tech.some((t) =>
        ['NPM Package', 'Distributed Logging', 'Telemetry', 'Mongoose', 'OAuth2', 'JWT', 'QR 2FA', 'AWS-SES'].includes(t)
      );
    }
    return true;
  });

  return (
    <ProjectsWrapper id="projects">
      <Container>
        <SectionHeading
          badge="FEATURED WORK"
          title="Engineered Applications"
          subtitle="A curated portfolio of production-grade web ecosystems, developer libraries, and mobile architectures."
        />

        <FilterTabs>
          {filters.map((filter) => (
            <FilterTab
              key={filter}
              $active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </FilterTab>
          ))}
        </FilterTabs>

        <ProjectsGrid layout>
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <ProjectCard tilt glowOnHover>
                  <ImageContainer>
                    <img src={project.image} alt={project.name} />
                    {project.featured && (
                      <div className="tech-overlay">
                        <Badge variant="accent" size="sm" dot>
                          Featured
                        </Badge>
                      </div>
                    )}
                  </ImageContainer>

                  <ProjectTitle>{project.name}</ProjectTitle>
                  <ProjectTagline>{project.tagline}</ProjectTagline>
                  <ProjectDescription>{project.description}</ProjectDescription>

                  <TechChipRow>
                    {project.tech.map((t) => (
                      <Badge key={t} variant="neutral" size="sm">
                        {t}
                      </Badge>
                    ))}
                  </TechChipRow>

                  <ActionRow>
                    {project.codeLink && (
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Code2 size={15} />}
                        href={project.codeLink}
                        target="_blank"
                      >
                        Code
                      </Button>
                    )}

                    {project.liveLink && (
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<ExternalLink size={15} />}
                        href={project.liveLink}
                        target="_blank"
                      >
                        Live Demo
                      </Button>
                    )}
                  </ActionRow>
                </ProjectCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </Container>
    </ProjectsWrapper>
  );
};
