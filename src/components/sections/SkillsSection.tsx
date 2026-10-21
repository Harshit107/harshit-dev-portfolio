import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import {
  Layout,
  Server,
  Database,
  Wrench,
  Bot,
  ShieldCheck,
  Sparkles,
  Cpu,
  Boxes
} from 'lucide-react';
import { Container } from '../ui/Container';
import { GlassCard } from '../ui/GlassCard';
import { skillCategories } from '../../data/portfolioData';
import { breakpoints } from '../../theme/theme';

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(3deg); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 0.65; transform: scale(1.08); }
`;

const SkillsWrapper = styled.section`
  padding: 6.5rem 0;
  position: relative;
  overflow: hidden;
`;

const AmbientGlowOrb = styled.div<{ $top: string; $left: string; $size: string; $color?: string }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme, $color }) => $color || theme.accent} 0%,
    transparent 70%
  );
  filter: blur(80px);
  opacity: 0.25;
  pointer-events: none;
  animation: ${pulseGlow} 8s ease-in-out infinite alternate;
  z-index: 0;
`;

const AnimatedHeadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;

  .heading-halo {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 380px;
    height: 140px;
    background: radial-gradient(circle, ${({ theme }) => theme.accent} 0%, transparent 70%);
    filter: blur(65px);
    opacity: 0.28;
    pointer-events: none;
  }
`;

const BadgeRow = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.95rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.cardGlassBg};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.accentGlow};
  box-shadow: 0 4px 20px -5px ${({ theme }) => theme.accentMuted};
  margin-bottom: 1rem;

  .badge-icon {
    color: ${({ theme }) => theme.accent};
    animation: ${float} 4s ease-in-out infinite;
    display: flex;
    align-items: center;
  }

  .badge-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.775rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.accent};
    text-transform: uppercase;
  }
`;

const AnimatedTitle = styled(motion.h2)`
  font-size: clamp(2.2rem, 4.8vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 0.85rem;
  line-height: 1.15;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;

  .shimmer-text {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.textPrimary} 0%,
      ${({ theme }) => theme.accent} 40%,
      ${({ theme }) => theme.accentSecondary} 70%,
      ${({ theme }) => theme.textPrimary} 100%
    );
    background-size: 250% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 6s linear infinite;
    text-shadow: 0 0 30px ${({ theme }) => theme.accentMuted};
  }

  .floating-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.accent};
    animation: ${float} 3.5s ease-in-out infinite;
  }
`;

const SubtitleText = styled.p`
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  color: ${({ theme }) => theme.textSecondary};
  max-width: 660px;
  line-height: 1.65;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  position: relative;
  z-index: 2;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Styled3DGlassCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.cardGlassBg} 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(24px) saturate(190%);
  -webkit-backdrop-filter: blur(24px) saturate(190%);
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.12);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    border-top: 1px solid ${({ theme }) => theme.accentGlow};
    box-shadow: 0 24px 48px -12px ${({ theme }) => theme.accentGlow},
      inset 0 1px 2px 0 rgba(255, 255, 255, 0.25);
    transform: translateY(-4px);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.65rem;

  .icon-sphere {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.accentMuted} 0%,
      ${({ theme }) => theme.bgElevated} 100%
    );
    border: 1px solid ${({ theme }) => theme.accentGlow};
    color: ${({ theme }) => theme.accent};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 18px -4px ${({ theme }) => theme.accentMuted};
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    flex-shrink: 0;

    &:hover {
      transform: scale(1.08) rotate(5deg);
      box-shadow: 0 0 20px ${({ theme }) => theme.accentGlow};
    }
  }

  .title-group {
    display: flex;
    flex-direction: column;

    .title {
      font-size: 1.15rem;
      font-weight: 700;
      color: ${({ theme }) => theme.textPrimary};
      font-family: 'Space Grotesk', sans-serif;
      letter-spacing: -0.01em;
    }

    .meta {
      font-size: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      color: ${({ theme }) => theme.accent};
      font-weight: 500;
    }
  }
`;

const CategoryDescription = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1.35rem;
  line-height: 1.55;
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
  padding: 0.65rem 0.95rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.bgElevated};
  border: 1px solid ${({ theme }) => theme.borderColor};
  backdrop-filter: blur(8px);
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${({ theme }) => theme.accent};
    opacity: 0;
    transition: opacity 0.2s ease, width 0.2s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.accentGlow};
    transform: translateX(4px);
    background: ${({ theme }) => theme.accentMuted};

    &::before {
      opacity: 1;
      width: 4px;
    }

    .skill-name {
      color: ${({ theme }) => theme.textPrimary};
    }

    .skill-pill {
      background: ${({ theme }) => theme.accent};
      color: #ffffff;
      box-shadow: 0 0 10px ${({ theme }) => theme.accent};
    }
  }

  .skill-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.textPrimary};
    transition: color 0.2s ease;
  }

  .skill-pill {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.725rem;
    color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.cardGlassBg};
    border: 1px solid ${({ theme }) => theme.borderColor};
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    font-weight: 600;
    transition: all 0.2s ease;
  }
`;

const categoryIcons: Record<string, React.ReactNode> = {
  'AI Engineering & Agents': <Bot size={22} />,
  'Frontend Architecture': <Layout size={22} />,
  'Backend & Distributed APIs': <Server size={22} />,
  'Databases & Caching': <Database size={22} />,
  'DevOps & Reliability': <ShieldCheck size={22} />,
  'Enterprise & Mobile Systems': <Wrench size={22} />
};

export const SkillsSection: React.FC = () => {
  return (
    <SkillsWrapper id="skills">
      <AmbientGlowOrb $top="10%" $left="-5%" $size="450px" />
      <AmbientGlowOrb $top="65%" $left="85%" $size="500px" />

      <Container>
        <AnimatedHeadingContainer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="heading-halo" />

          <BadgeRow
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <span className="badge-icon">
              <Cpu size={14} />
            </span>
            <span className="badge-text">CAPABILITIES &amp; TOOLING // 5+ YEARS</span>
          </BadgeRow>

          <AnimatedTitle>
            <span className="shimmer-text">Technical Repertoire</span>
            <span className="floating-icon">
              <Boxes size={28} />
            </span>
          </AnimatedTitle>

          <SubtitleText>
            Specialized engineering stack honed across 5+ years of enterprise production systems,
            scalable distributed APIs, and AI-orchestrated architectures.
          </SubtitleText>
        </AnimatedHeadingContainer>

        <CategoriesGrid>
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Styled3DGlassCard tilt glowOnHover>
                <CategoryHeader>
                  <div className="icon-sphere">
                    {categoryIcons[cat.title] || <Sparkles size={22} />}
                  </div>
                  <div className="title-group">
                    <span className="title">{cat.title}</span>
                    <span className="meta">{cat.skills.length} core competencies</span>
                  </div>
                </CategoryHeader>

                <CategoryDescription>{cat.description}</CategoryDescription>

                <SkillItemsList>
                  {cat.skills.map((skill) => (
                    <SkillItemRow key={skill.name}>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-pill">{skill.level}</span>
                    </SkillItemRow>
                  ))}
                </SkillItemsList>
              </Styled3DGlassCard>
            </motion.div>
          ))}
        </CategoriesGrid>
      </Container>
    </SkillsWrapper>
  );
};
