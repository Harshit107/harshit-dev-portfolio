import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Layout,
  Server,
  Database,
  Wrench,
  Bot,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { skillCategories } from '../../data/portfolioData';
import { breakpoints } from '../../theme/theme';

const SkillsWrapper = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const CategoriesGrid = styled.div`
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

const SkillCategoryCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 0.5rem;

  .icon-wrap {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: ${({ theme }) => theme.accentMuted};
    color: ${({ theme }) => theme.accent};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 1.15rem;
    font-weight: 700;
    color: ${({ theme }) => theme.textPrimary};
    font-family: 'Space Grotesk', sans-serif;
  }
`;

const CategoryDescription = styled.p`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1.25rem;
`;

const SkillItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: auto;
`;

const SkillItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.55rem 0.85rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.bgElevated};
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accentGlow};
    transform: translateX(3px);
  }

  .skill-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.textPrimary};
  }

  .skill-level {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.725rem;
    color: ${({ theme }) => theme.accent};
    font-weight: 500;
  }
`;

const categoryIcons: Record<string, React.ReactNode> = {
  'AI Engineering & Agents': <Bot size={20} />,
  'Frontend Architecture': <Layout size={20} />,
  'Backend & Distributed APIs': <Server size={20} />,
  'Databases & Caching': <Database size={20} />,
  'DevOps & Reliability': <ShieldCheck size={20} />,
  'Enterprise & Mobile Systems': <Wrench size={20} />
};

export const SkillsSection: React.FC = () => {
  return (
    <SkillsWrapper id="skills">
      <Container>
        <SectionHeading
          badge="CAPABILITIES & TOOLING"
          title="Technical Repertoire"
          subtitle="Specialized stack honed across enterprise production environments, scalable distributed systems, and real-time interfaces."
        />

        <CategoriesGrid>
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
            >
              <SkillCategoryCard tilt glowOnHover>
                <CategoryHeader>
                  <div className="icon-wrap">
                    {categoryIcons[cat.title] || <Sparkles size={20} />}
                  </div>
                  <div className="title">{cat.title}</div>
                </CategoryHeader>

                <CategoryDescription>{cat.description}</CategoryDescription>

                <SkillItemsList>
                  {cat.skills.map((skill) => (
                    <SkillItemRow key={skill.name}>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}</span>
                    </SkillItemRow>
                  ))}
                </SkillItemsList>
              </SkillCategoryCard>
            </motion.div>
          ))}
        </CategoriesGrid>
      </Container>
    </SkillsWrapper>
  );
};
