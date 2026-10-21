import React from 'react';
import styled from 'styled-components';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const GlowField = styled.div<{ $top: string; $left: string; $size: string; $opacity: number }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.accent} 0%, transparent 70%);
  filter: blur(120px);
  opacity: ${({ $opacity }) => $opacity};
  transition: background 0.8s ease;
  transform: translate(-50%, -50%);
  animation: floatOrb 18s ease-in-out infinite alternate;

  @keyframes floatOrb {
    0% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-45%, -55%) scale(1.15); }
    100% { transform: translate(-55%, -45%) scale(0.9); }
  }
`;

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(${({ theme }) => theme.borderColor} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.borderColor} 1px, transparent 1px);
  background-size: 80px 80px;
  background-position: center center;
  opacity: 0.35;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
`;

export const AtmosphereBackground: React.FC = () => {
  return (
    <BackgroundWrapper aria-hidden="true">
      <GlowField $top="15%" $left="15%" $size="550px" $opacity={0.12} />
      <GlowField $top="80%" $left="85%" $size="650px" $opacity={0.08} />
      <GlowField $top="50%" $left="90%" $size="450px" $opacity={0.1} />
      <GridOverlay />
    </BackgroundWrapper>
  );
};
