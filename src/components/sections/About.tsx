import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Layers,
  Cpu,
  Sparkles
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { personalData } from '../../data/portfolioData';
import { breakpoints } from '../../theme/theme';

const AboutSectionWrapper = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.5rem;
  align-items: center;

  @media (min-width: ${breakpoints.laptop}) {
    grid-template-columns: 0.9fr 1.1fr;
  }
`;

const PhotoPerspectiveFrame = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .glow-ring {
    position: absolute;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, ${({ theme }) => theme.accent} 0%, transparent 70%);
    filter: blur(50px);
    opacity: 0.3;
    z-index: 0;
  }

  .image-wrapper {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 380px;
    border-radius: 28px;
    padding: 8px;
    background: linear-gradient(135deg, ${({ theme }) => theme.borderColor}, ${({ theme }) => theme.accentGlow});
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);

    img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 22px;
      object-fit: cover;
      background: ${({ theme }) => theme.bgElevated};
    }
  }

  .tech-stamp {
    position: absolute;
    bottom: -15px;
    right: 20px;
    background: ${({ theme }) => theme.bgElevated};
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 14px;
    padding: 0.65rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 2;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.accent};
  }
`;

const StoryCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BioParagraph = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;

  strong {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const FeatureCardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-top: 1rem;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const MiniFeatureCard = styled(GlassCard)`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  .icon-wrap {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: ${({ theme }) => theme.accentMuted};
    color: ${({ theme }) => theme.accent};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: ${({ theme }) => theme.textPrimary};
  }

  .card-desc {
    font-size: 0.825rem;
    color: ${({ theme }) => theme.textSecondary};
    line-height: 1.5;
  }
`;

export const About: React.FC = () => {
  return (
    <AboutSectionWrapper id="about">
      <Container>
        <SectionHeading
          badge="IDENTITY & PURPOSE"
          title="Engineering Systems with Precision"
          subtitle="A senior full-stack developer and module architect delivering mission-critical web applications."
        />

        <ContentGrid>
          <PhotoPerspectiveFrame
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glow-ring" />
            <div className="image-wrapper">
              <img src={personalData.avatar} alt="Harshit Keshari" />
            </div>
            <div className="tech-stamp">
              <Sparkles size={14} />
              <span>Full-Stack & Web Performance</span>
            </div>
          </PhotoPerspectiveFrame>

          <StoryCol>
            <BioParagraph>
              <strong>Greetings!</strong> I am Harshit Keshari, currently working as a Software
              Developer at{' '}
              <a href={personalData.companyUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                Cornerstone OnDemand
              </a>{' '}
              and a graduate in Computer Science from the University of Engineering and Management (UEM) Jaipur.
            </BioParagraph>

            <BioParagraph>
              <strong>Who is Harshit Keshari (Harshit107)?</strong><br />
              As a core module owner at Cornerstone, I drive the end-to-end design, implementation,
              and maintenance of high-throughput web modules using React, TypeScript, Node.js, and GraphQL.
              My work emphasizes microfrontends, web performance optimization, strict WCAG accessibility,
              and maintainable software architectures.
            </BioParagraph>

            <BioParagraph>
              <strong>What do I build?</strong><br />
              I specialize in designing resilient, API-driven systems connecting REST and GraphQL endpoints
              with modern storage layers (PostgreSQL, MongoDB, and Firebase). I have a proven track record of
              boosting interface responsiveness, AI-readiness, and developer velocity through reusable design
              systems and internal tooling.
            </BioParagraph>

            <FeatureCardsGrid>
              <MiniFeatureCard tilt={false} glowOnHover={false}>
                <div className="icon-wrap">
                  <Layers size={18} />
                </div>
                <div className="card-title">Core Module Owner</div>
                <div className="card-desc">
                  Leading frontend architecture, code quality, and production scalability at Cornerstone OnDemand.
                </div>
              </MiniFeatureCard>

              <MiniFeatureCard tilt={false} glowOnHover={false}>
                <div className="icon-wrap">
                  <Cpu size={18} />
                </div>
                <div className="card-title">Performance & WCAG</div>
                <div className="card-desc">
                  Optimized Core Web Vitals, accessible design patterns, and clean component decoupling.
                </div>
              </MiniFeatureCard>
            </FeatureCardsGrid>
          </StoryCol>
        </ContentGrid>
      </Container>
    </AboutSectionWrapper>
  );
};
