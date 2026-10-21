import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tilt?: boolean;
  glowOnHover?: boolean;
  onClick?: () => void;
}

const CardWrapper = styled(motion.div)<{ $glowOnHover?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.cardGlassBg};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 20px;
  padding: 1.75rem;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  transform-style: preserve-3d;
  perspective: 1000px;

  &:hover {
    border-color: ${({ theme }) => theme.borderHover};
    ${({ $glowOnHover, theme }) =>
      $glowOnHover &&
      `box-shadow: 0 10px 40px -10px ${theme.accentGlow}, 0 0 20px -5px ${theme.accentMuted};`}
  }
`;

const GlareOverlay = styled.div<{ $x: number; $y: number; $opacity: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: radial-gradient(
    circle 250px at ${({ $x }) => $x}px ${({ $y }) => $y}px,
    ${({ theme }) => theme.accentMuted},
    transparent 80%
  );
  opacity: ${({ $opacity }) => $opacity};
  transition: opacity 0.3s ease;
  z-index: 1;
`;

const ContentLayer = styled.div`
  position: relative;
  z-index: 2;
`;

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  tilt = true,
  glowOnHover = true,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [glareOpacity, setGlareOpacity] = useState(0);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });
    setGlareOpacity(0.6);

    // Calculate subtle 3D tilt (-6 to +6 degrees max)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setGlareOpacity(0);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <CardWrapper
      ref={cardRef}
      className={className}
      $glowOnHover={glowOnHover}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <GlareOverlay $x={coords.x} $y={coords.y} $opacity={glareOpacity} />
      <ContentLayer>{children}</ContentLayer>
    </CardWrapper>
  );
};
