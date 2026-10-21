import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import type { AccentColor, ThemeMode } from '../types/portfolio';
import { getTheme, type ThemeColors } from './theme';

interface ThemeContextType {
  mode: ThemeMode;
  accent: AccentColor;
  theme: ThemeColors;
  toggleMode: () => void;
  setAccent: (accent: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme_mode');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const [accent, setAccentState] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_accent_color');
      if (saved && ['emerald', 'cyan', 'violet', 'amber', 'ruby'].includes(saved)) {
        return saved as AccentColor;
      }
    }
    return 'emerald';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_theme_mode', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('portfolio_accent_color', accent);
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  const toggleMode = () => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
  };

  const theme = getTheme(mode, accent);

  return (
    <ThemeContext.Provider value={{ mode, accent, theme, toggleMode, setAccent }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
