import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Palette,
  Menu,
  X,
  ExternalLink,
  Code2
} from 'lucide-react';
import { useTheme } from '../../theme/ThemeContext';
import { ACCENT_PALETTES, breakpoints } from '../../theme/theme';
import type { AccentColor } from '../../types/portfolio';
import { personalData } from '../../data/portfolioData';

const NavHeader = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 1.25rem;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  pointer-events: none;
`;

const NavContainer = styled(motion.div)<{ $scrolled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
  max-width: 1100px;
  padding: 0.65rem 1.25rem;
  background: ${({ theme }) => theme.headerGlassBg};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme, $scrolled }) => ($scrolled ? theme.borderHover : theme.borderColor)};
  border-radius: 9999px;
  box-shadow: ${({ theme, $scrolled }) => ($scrolled ? theme.shadowSubtle : 'none')};
  pointer-events: auto;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: -0.02em;

  .logo-box {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: linear-gradient(135deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accentSecondary});
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    box-shadow: 0 0 15px ${({ theme }) => theme.accentGlow};
  }

  .brand-text {
    display: flex;
    flex-direction: column;

    .name {
      color: ${({ theme }) => theme.textPrimary};
      line-height: 1.1;
    }

    .status {
      font-size: 0.7rem;
      font-weight: 500;
      color: ${({ theme }) => theme.accent};
      display: flex;
      align-items: center;
      gap: 0.3rem;

      &::before {
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.accent};
        box-shadow: 0 0 6px ${({ theme }) => theme.accent};
      }
    }
  }
`;

const NavLinks = styled.nav`
  display: none;
  align-items: center;
  gap: 0.25rem;

  @media (min-width: ${breakpoints.laptop}) {
    display: flex;
  }
`;

const NavItem = styled.a<{ $active?: boolean }>`
  position: relative;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme, $active }) => ($active ? theme.accent : theme.textSecondary)};
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const ActivePill = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.accentMuted};
  border: 1px solid ${({ theme }) => theme.accentGlow};
  border-radius: 9999px;
  z-index: -1;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bgElevated};
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.textSecondary};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.accent};
    border-color: ${({ theme }) => theme.accentGlow};
    transform: scale(1.05);
  }
`;

const MobileMenuButton = styled(IconButton)`
  display: flex;

  @media (min-width: ${breakpoints.laptop}) {
    display: none;
  }
`;

const PaletteDropdown = styled(motion.div)`
  position: absolute;
  top: 48px;
  right: 0;
  background: ${({ theme }) => theme.bgElevated};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 16px;
  padding: 0.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 170px;
  z-index: 200;
`;

const PaletteOption = styled.button<{ $active: boolean; $color: string }>`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ theme, $active }) => ($active ? theme.accent : theme.textPrimary)};
  background: ${({ theme, $active }) => ($active ? theme.accentMuted : 'transparent')};
  transition: all 0.15s ease;
  width: 100%;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.accentMuted};
  }

  .color-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
    box-shadow: 0 0 8px ${({ $color }) => $color};
  }
`;

const MobileDrawer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.bgPrimary};
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  pointer-events: auto;
`;

const MobileDrawerLink = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' }
];

export const Navbar: React.FC = () => {
  const { mode, accent, toggleMode, setAccent } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = ['about', 'experience', 'projects', 'skills', 'education', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavHeader $scrolled={scrolled}>
      <NavContainer
        $scrolled={scrolled}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Brand href="#hero">
          <div className="logo-box">
            <Code2 size={18} />
          </div>
          <div className="brand-text">
            <span className="name">{personalData.name}</span>
            <span className="status">Software Dev @ CSOD</span>
          </div>
        </Brand>

        <NavLinks>
          {navLinks.map(link => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <NavItem key={link.name} href={link.href} $active={isActive}>
                {isActive && (
                  <ActivePill
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </NavItem>
            );
          })}
        </NavLinks>

        <ActionGroup>
          {/* Accent Color Palette Popover */}
          <div style={{ position: 'relative' }}>
            <IconButton
              onClick={() => setPaletteOpen(!paletteOpen)}
              title="Change Accent Theme"
              aria-label="Accent Palette"
            >
              <Palette size={17} />
            </IconButton>

            <AnimatePresence>
              {paletteOpen && (
                <PaletteDropdown
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  {(Object.keys(ACCENT_PALETTES) as AccentColor[]).map(key => (
                    <PaletteOption
                      key={key}
                      $active={accent === key}
                      $color={ACCENT_PALETTES[key].primary}
                      onClick={() => {
                        setAccent(key);
                        setPaletteOpen(false);
                      }}
                    >
                      <span className="color-dot" />
                      {ACCENT_PALETTES[key].name}
                    </PaletteOption>
                  ))}
                </PaletteDropdown>
              )}
            </AnimatePresence>
          </div>

          {/* Dark / Light Mode Toggle */}
          <IconButton
            onClick={toggleMode}
            title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Theme Mode"
          >
            {mode === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </IconButton>

          {/* Mobile Menu Toggle */}
          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </MobileMenuButton>
        </ActionGroup>
      </NavContainer>

      {/* Mobile Fullscreen Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileDrawer
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
              <IconButton onClick={() => setMobileMenuOpen(false)}>
                <X size={20} />
              </IconButton>
            </div>
            {navLinks.map(link => (
              <MobileDrawerLink
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </MobileDrawerLink>
            ))}
            <div style={{ marginTop: '1.5rem' }}>
              <NavItem href={personalData.resumeUrl} target="_blank" rel="noopener noreferrer">
                Resume <ExternalLink size={14} style={{ display: 'inline', marginLeft: 4 }} />
              </NavItem>
            </div>
          </MobileDrawer>
        )}
      </AnimatePresence>
    </NavHeader>
  );
};
