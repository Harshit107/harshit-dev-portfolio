import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { educationList } from '../../data/portfolioData';
import { breakpoints } from '../../theme/theme';

const EducationWrapper = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const EducationCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
`;

const ImageBanner = styled.div`
  width: 100%;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.25rem;
  background: ${({ theme }) => theme.bgElevated};
  border: 1px solid ${({ theme }) => theme.borderColor};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #FFFFFF;
    padding: 10px;
  }
`;

const InstitutionName = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.35rem;
  font-family: 'Space Grotesk', sans-serif;
`;

const DegreeTitle = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.accent};
  font-weight: 600;
  margin-bottom: 1rem;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};

  .duration {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.775rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const EducationSection: React.FC = () => {
  return (
    <EducationWrapper id="education">
      <Container>
        <SectionHeading
          badge="ACADEMIC FOUNDATION"
          title="Education & Credentials"
          subtitle="Formal computer science training and foundational coursework in algorithms and software engineering."
        />

        <EducationGrid>
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <EducationCard tilt glowOnHover>
                <ImageBanner>
                  <img src={edu.image} alt={edu.institution} />
                </ImageBanner>

                <InstitutionName>{edu.institution}</InstitutionName>
                <DegreeTitle>{edu.degree}</DegreeTitle>

                <MetaRow>
                  <div className="duration">
                    <Calendar size={13} />
                    <span>{edu.duration}</span>
                  </div>

                  <Badge variant="accent" size="sm">
                    {edu.grade}
                  </Badge>
                </MetaRow>
              </EducationCard>
            </motion.div>
          ))}
        </EducationGrid>
      </Container>
    </EducationWrapper>
  );
};
