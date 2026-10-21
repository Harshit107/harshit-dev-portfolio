import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { experiences } from '../../data/portfolioData';
import { breakpoints } from '../../theme/theme';

const ExperienceWrapper = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    bottom: 20px;
    left: 24px;
    width: 2px;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.accent} 0%,
      ${({ theme }) => theme.accentSecondary} 50%,
      ${({ theme }) => theme.borderColor} 100%
    );

    @media (min-width: ${breakpoints.tablet}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const TimelineItem = styled(motion.div)<{ $isEven: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-left: 60px;

  @media (min-width: ${breakpoints.tablet}) {
    padding-left: 0;
    width: 50%;
    align-self: ${({ $isEven }) => ($isEven ? 'flex-start' : 'flex-end')};
    padding-right: ${({ $isEven }) => ($isEven ? '2.5rem' : '0')};
    padding-left: ${({ $isEven }) => ($isEven ? '0' : '2.5rem')};
  }
`;

const TimelineNode = styled.div<{ $isEven: boolean }>`
  position: absolute;
  top: 24px;
  left: 14px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bgPrimary};
  border: 3px solid ${({ theme }) => theme.accent};
  box-shadow: 0 0 12px ${({ theme }) => theme.accentGlow};
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.accent};
  }

  @media (min-width: ${breakpoints.tablet}) {
    left: ${({ $isEven }) => ($isEven ? 'auto' : '-11px')};
    right: ${({ $isEven }) => ($isEven ? '-11px' : 'auto')};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  .logo-box {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: ${({ theme }) => theme.bgElevated};
    border: 1px solid ${({ theme }) => theme.borderColor};
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .title-group {
    display: flex;
    flex-direction: column;

    .job-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: ${({ theme }) => theme.textPrimary};
      font-family: 'Space Grotesk', sans-serif;
    }

    .company-name {
      font-size: 0.95rem;
      color: ${({ theme }) => theme.accent};
      font-weight: 600;
    }
  }
`;

const DurationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.775rem;
  color: ${({ theme }) => theme.textSecondary};
  background: ${({ theme }) => theme.bgElevated};
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 0.3rem 0.65rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const WorkDescription = styled.p`
  font-size: 0.925rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.65;
  margin-bottom: 1.25rem;
`;

const SkillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

export const ExperienceSection: React.FC = () => {
  return (
    <ExperienceWrapper id="experience">
      <Container>
        <SectionHeading
          badge="CAREER TRAJECTORY"
          title="Professional Journey"
          subtitle="Proven track record in enterprise software engineering, module architecture, and full-stack innovation."
        />

        <TimelineContainer>
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <TimelineItem
                key={exp.id}
                $isEven={isEven}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <TimelineNode $isEven={isEven} />
                <GlassCard tilt glowOnHover style={{ width: '100%' }}>
                  <CardHeader>
                    <div className="logo-box">
                      <img src={exp.logo} alt={exp.name} />
                    </div>
                    <div className="title-group">
                      <div className="job-title">{exp.jobTitle}</div>
                      <div className="company-name">{exp.name}</div>
                    </div>
                  </CardHeader>

                  <DurationBadge>
                    <Calendar size={13} />
                    <span>{exp.year}</span>
                  </DurationBadge>

                  <WorkDescription>{exp.work}</WorkDescription>

                  {exp.skills && (
                    <SkillsRow>
                      {exp.skills.map((skill) => (
                        <Badge key={skill} variant="neutral" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </SkillsRow>
                  )}
                </GlassCard>
              </TimelineItem>
            );
          })}
        </TimelineContainer>
      </Container>
    </ExperienceWrapper>
  );
};
