import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FileText,
  Send,
  Briefcase
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { HeroSculpture } from '../3d/HeroSculpture';
import { personalData, socialLinks } from '../../data/portfolioData';
import { breakpoints } from '../../theme/theme';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 7.5rem;
  padding-bottom: 4rem;
  overflow: hidden;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 3rem;

  @media (min-width: ${breakpoints.laptop}) {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 2rem;
  }
`;

const ContentCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 2;
`;

const VisualCol = styled.div`
  position: relative;
  width: 100%;
  height: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  @media (min-width: ${breakpoints.tablet}) {
    height: 520px;
  }
`;

const FloatingProfileCard = styled(motion.div)`
  position: absolute;
  bottom: 15px;
  left: 20px;
  background: ${({ theme }) => theme.cardGlassBg};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 18px;
  padding: 0.85rem 1.15rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  box-shadow: ${({ theme }) => theme.shadowSubtle};
  z-index: 10;
  max-width: 300px;

  img.avatar {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.accent};
  }

  .meta {
    display: flex;
    flex-direction: column;

    .name {
      font-weight: 700;
      font-size: 0.9rem;
      color: ${({ theme }) => theme.textPrimary};
    }

    .role {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.accent};
      font-weight: 500;
    }
  }
`;

const GreetingBadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
`;

const MainHeading = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 4.2rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;

  .name-gradient {
    background: linear-gradient(135deg, ${({ theme }) => theme.textPrimary} 20%, ${({ theme }) => theme.accent} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const TypewriterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-family: 'JetBrains Mono', monospace;
  color: ${({ theme }) => theme.textPrimary};

  .prompt-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: clamp(0.95rem, 1.4vw, 1.15rem);
    font-weight: 500;
    color: ${({ theme }) => theme.textSecondary};

    .terminal-prompt {
      color: ${({ theme }) => theme.accent};
      font-weight: 700;
    }
  }

  .phrase-line {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: clamp(1.05rem, 1.9vw, 1.45rem);
    font-weight: 700;
    min-height: 2.2rem;
    height: 2.2rem;
    line-height: 2.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .highlight-word {
    color: ${({ theme }) => theme.accent};
    border-bottom: 2px solid ${({ theme }) => theme.accentGlow};
  }

  .cursor {
    display: inline-block;
    width: 2px;
    height: 1.25em;
    background-color: ${({ theme }) => theme.accent};
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const BioSnippet = styled.p`
  font-size: clamp(1rem, 1.35vw, 1.15rem);
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  max-width: 620px;

  a {
    color: ${({ theme }) => theme.accent};
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const CTAButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  margin-top: 0.5rem;

  span.label {
    font-size: 0.8125rem;
    font-family: 'JetBrains Mono', monospace;
    color: ${({ theme }) => theme.textMuted};
  }

  .links {
    display: flex;
    gap: 0.65rem;
  }
`;

const SocialIconButton = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ theme }) => theme.bgElevated};
  border: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
    border-color: ${({ theme }) => theme.accentGlow};
    transform: translateY(-2px);
  }
`;

const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatItem = styled.div`
  background: ${({ theme }) => theme.cardGlassBg};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 14px;
  padding: 0.85rem 1rem;
  backdrop-filter: blur(10px);

  .number {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.accent};
  }

  .label {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.textSecondary};
    font-weight: 500;
  }
`;

const typewriterPhrases = [
  'Scalable Web & Cloud Architectures',
  'High-Performance React & Next.js Systems',
  'GraphQL APIs & Apollo Client Optimization',
  'Configurable Workflow & RBAC Platforms',
  'AI Systems & Autonomous MCP Tooling'
];

export const Hero: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullPhrase = typewriterPhrases[phraseIndex];
    const speed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullPhrase.substring(0, currentText.length + 1));
        if (currentText === fullPhrase) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setCurrentText(fullPhrase.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <HeroSection id="hero">
      <Container>
        <HeroGrid>
          <ContentCol>
            <GreetingBadgeRow>
              <Badge variant="accent" dot size="md">
                Available for high-impact technical initiatives
              </Badge>
              <Badge variant="outline" size="md">
                <Briefcase size={12} style={{ marginRight: 4 }} />
                Software Developer @ Cornerstone
              </Badge>
            </GreetingBadgeRow>

            <MainHeading>
              Hello, I'm <br />
              <span className="name-gradient">{personalData.name}</span>
            </MainHeading>

            <TypewriterWrapper>
              <div className="prompt-label">
                <span className="terminal-prompt">&gt;</span>
                <span>Specializing in:</span>
              </div>
              <div className="phrase-line">
                <span className="highlight-word">{currentText}</span>
                <span className="cursor" />
              </div>
            </TypewriterWrapper>

            <BioSnippet>
              Software Developer at{' '}
              <a href={personalData.companyUrl} target="_blank" rel="noopener noreferrer">
                {personalData.company}
              </a>
              . Known in the developer community as <strong>{personalData.handle}</strong>.
              I engineer scalable enterprise web platforms, dynamic workflow & permission engines, and low-latency API architectures with React, TypeScript, Node.js, GraphQL, and AI tooling.
            </BioSnippet>

            <CTAButtonGroup>
              <Button
                variant="primary"
                size="lg"
                icon={<FileText size={18} />}
                href={personalData.resumeUrl}
                target="_blank"
              >
                View Resume
              </Button>

              <Button
                variant="outline"
                size="lg"
                icon={<Send size={18} />}
                href="#contact"
              >
                Get In Touch
              </Button>
            </CTAButtonGroup>

            <StatsBar>
              {personalData.stats.map((stat, idx) => (
                <StatItem key={idx}>
                  <div className="number">{stat.value}</div>
                  <div className="label">{stat.label}</div>
                </StatItem>
              ))}
            </StatsBar>

            <SocialStrip>
              <span className="label">CONNECT //</span>
              <div className="links">
                {socialLinks.map((s) => {
                  const IconComponent =
                    s.icon === 'github' ? GithubIcon : s.icon === 'linkedin' ? LinkedinIcon : TwitterIcon;
                  return (
                    <SocialIconButton
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      aria-label={s.name}
                    >
                      <IconComponent size={16} />
                    </SocialIconButton>
                  );
                })}
              </div>
            </SocialStrip>
          </ContentCol>

          <VisualCol>
            <HeroSculpture />

            <FloatingProfileCard
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <img src={personalData.avatar} alt={personalData.name} className="avatar" />
              <div className="meta">
                <span className="name">{personalData.name}</span>
                <span className="role">Software Developer @ Cornerstone</span>
              </div>
            </FloatingProfileCard>
          </VisualCol>
        </HeroGrid>
      </Container>
    </HeroSection>
  );
};
