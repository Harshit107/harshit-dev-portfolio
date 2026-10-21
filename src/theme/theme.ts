import type { AccentColor, ThemeMode } from '../types/portfolio';

export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgElevated: string;
  bgTranslucent: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderColor: string;
  borderHover: string;
  accent: string;
  accentSecondary: string;
  accentGlow: string;
  accentMuted: string;
  cardGlassBg: string;
  headerGlassBg: string;
  shadowSubtle: string;
  shadowGlow: string;
}

export const ACCENT_PALETTES: Record<AccentColor, { name: string; primary: string; secondary: string; glow: string; muted: string }> = {
  emerald: {
    name: 'Emerald Matrix',
    primary: '#10B981',
    secondary: '#059669',
    glow: 'rgba(16, 185, 129, 0.25)',
    muted: 'rgba(16, 185, 129, 0.12)'
  },
  cyan: {
    name: 'Cyber Cyan',
    primary: '#06B6D4',
    secondary: '#0891B2',
    glow: 'rgba(6, 182, 212, 0.25)',
    muted: 'rgba(6, 182, 212, 0.12)'
  },
  violet: {
    name: 'Electric Violet',
    primary: '#8B5CF6',
    secondary: '#7C3AED',
    glow: 'rgba(139, 92, 246, 0.25)',
    muted: 'rgba(139, 92, 246, 0.12)'
  },
  amber: {
    name: 'Sunset Amber',
    primary: '#F59E0B',
    secondary: '#D97706',
    glow: 'rgba(245, 158, 11, 0.25)',
    muted: 'rgba(245, 158, 11, 0.12)'
  },
  ruby: {
    name: 'Neon Crimson',
    primary: '#F43F5E',
    secondary: '#E11D48',
    glow: 'rgba(244, 63, 94, 0.25)',
    muted: 'rgba(244, 63, 94, 0.12)'
  }
};

export const getTheme = (mode: ThemeMode, accent: AccentColor): ThemeColors => {
  const palette = ACCENT_PALETTES[accent];
  const isDark = mode === 'dark';

  return {
    bgPrimary: isDark ? '#0A0D14' : '#F8FAFC',
    bgSecondary: isDark ? '#101522' : '#FFFFFF',
    bgElevated: isDark ? '#161D2E' : '#F1F5F9',
    bgTranslucent: isDark ? 'rgba(16, 21, 34, 0.75)' : 'rgba(255, 255, 255, 0.8)',
    textPrimary: isDark ? '#F8FAFC' : '#0F172A',
    textSecondary: isDark ? '#94A3B8' : '#475569',
    textMuted: isDark ? '#64748B' : '#94A3B8',
    borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
    borderHover: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)',
    accent: palette.primary,
    accentSecondary: palette.secondary,
    accentGlow: palette.glow,
    accentMuted: palette.muted,
    cardGlassBg: isDark ? 'rgba(18, 24, 38, 0.55)' : 'rgba(255, 255, 255, 0.7)',
    headerGlassBg: isDark ? 'rgba(10, 13, 20, 0.75)' : 'rgba(248, 250, 252, 0.8)',
    shadowSubtle: isDark ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)' : '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
    shadowGlow: `0 0 40px -10px ${palette.glow}`
  };
};

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
  wide: '1536px'
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  laptop: `@media (max-width: ${breakpoints.laptop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`
};
