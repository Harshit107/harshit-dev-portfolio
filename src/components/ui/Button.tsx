import React from 'react';
import styled, { css } from 'styled-components';
import { motion, type HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
  rel?: string;
  as?: any;
}

const ButtonBase = styled(motion.button)<{ $variant: ButtonVariant; $size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
        `;
      case 'lg':
        return css`
          font-size: 1.05rem;
          padding: 0.875rem 1.75rem;
        `;
      case 'md':
      default:
        return css`
          font-size: 0.95rem;
          padding: 0.7rem 1.4rem;
        `;
    }
  }}

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: linear-gradient(135deg, ${theme.accent}, ${theme.accentSecondary});
          color: #FFFFFF;
          box-shadow: 0 4px 20px -4px ${theme.accentGlow};
          border: 1px solid rgba(255, 255, 255, 0.2);

          &:hover {
            box-shadow: 0 6px 25px 0 ${theme.accentGlow};
            transform: translateY(-2px);
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${theme.textPrimary};
          border: 1px solid ${theme.borderColor};
          backdrop-filter: blur(8px);

          &:hover {
            border-color: ${theme.accent};
            color: ${theme.accent};
            background: ${theme.accentMuted};
            transform: translateY(-2px);
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.textSecondary};
          border: 1px solid transparent;

          &:hover {
            color: ${theme.accent};
            background: ${theme.accentMuted};
          }
        `;
      case 'secondary':
      default:
        return css`
          background: ${theme.bgElevated};
          color: ${theme.textPrimary};
          border: 1px solid ${theme.borderColor};

          &:hover {
            border-color: ${theme.borderHover};
            background: ${theme.bgSecondary};
            transform: translateY(-2px);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0px) scale(0.98);
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  href,
  target,
  rel,
  ...props
}) => {
  const content = (
    <>
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <ButtonBase
        as="a"
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        $variant={variant}
        $size={size}
        whileTap={{ scale: 0.98 }}
        {...(props as any)}
      >
        {content}
      </ButtonBase>
    );
  }

  return (
    <ButtonBase
      $variant={variant}
      $size={size}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </ButtonBase>
  );
};
