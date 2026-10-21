import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Badge } from './Badge';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

const HeadingContainer = styled(motion.div)<{ $align: 'left' | 'center' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => ($align === 'center' ? 'center' : 'flex-start')};
  text-align: ${({ $align }) => ($align === 'center' ? 'center' : 'left')};
  margin-bottom: 3.5rem;
  position: relative;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  letter-spacing: -0.03em;

  span.highlight {
    background: linear-gradient(135deg, ${({ theme }) => theme.textPrimary} 30%, ${({ theme }) => theme.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  color: ${({ theme }) => theme.textSecondary};
  max-width: 650px;
  line-height: 1.6;
`;

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className
}) => {
  return (
    <HeadingContainer
      $align={align}
      className={className}
      initial={{ opacity: 0, y: 35, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      {badge && (
        <Badge variant="accent" dot>
          {badge}
        </Badge>
      )}
      <Title>
        <span className="highlight">{title}</span>
      </Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </HeadingContainer>
  );
};
