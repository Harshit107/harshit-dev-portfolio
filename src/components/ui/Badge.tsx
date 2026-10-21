import React from 'react';
import styled, { css } from 'styled-components';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const BadgeWrapper = styled.span<{ $variant: string; $size: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  border-radius: 9999px;
  white-space: nowrap;
  letter-spacing: 0.02em;
  transition: all 0.2s ease;

  ${({ $size }) =>
    $size === 'sm'
      ? css`
          font-size: 0.75rem;
          padding: 0.2rem 0.65rem;
        `
      : css`
          font-size: 0.8125rem;
          padding: 0.35rem 0.85rem;
        `}

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'accent':
        return css`
          background: ${theme.accentMuted};
          color: ${theme.accent};
          border: 1px solid ${theme.accentGlow};
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${theme.textSecondary};
          border: 1px solid ${theme.borderColor};
        `;
      case 'neutral':
      default:
        return css`
          background: ${theme.bgElevated};
          color: ${theme.textSecondary};
          border: 1px solid ${theme.borderColor};
        `;
    }
  }}
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.accent};
  box-shadow: 0 0 8px ${({ theme }) => theme.accent};
`;

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className
}) => {
  return (
    <BadgeWrapper $variant={variant} $size={size} className={className}>
      {dot && <Dot />}
      {children}
    </BadgeWrapper>
  );
};
