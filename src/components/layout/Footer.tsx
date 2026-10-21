import React from 'react';
import styled from 'styled-components';
import { ArrowUp } from 'lucide-react';
import { Container } from '../ui/Container';
import { personalData } from '../../data/portfolioData';

const FooterWrapper = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  padding: 2.5rem 0;
  background: ${({ theme }) => theme.bgPrimary};
  position: relative;
  z-index: 2;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
  }
`;

const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  .brand-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.textPrimary};
  }

  .copyright {
    font-size: 0.825rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const ScrollTopButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${({ theme }) => theme.bgElevated};
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
    border-color: ${({ theme }) => theme.accentGlow};
    transform: translateY(-3px);
  }
`;

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <BrandBlock>
            <div className="brand-title">{personalData.name} ({personalData.handle})</div>
            <div className="copyright">
              © {new Date().getFullYear()} Harshit Keshari. Crafted with precision & 3D depth.
            </div>
          </BrandBlock>

          <ScrollTopButton onClick={scrollToTop} title="Scroll to Top" aria-label="Scroll to top">
            <ArrowUp size={18} />
          </ScrollTopButton>
        </FooterContent>
      </Container>
    </FooterWrapper>
  );
};
