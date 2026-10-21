import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.bgPrimary};
    color: ${({ theme }) => theme.textPrimary};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.textPrimary};
  }

  code, pre, .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bgPrimary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.borderColor};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.accent};
  }

  /* Text Selection */
  ::selection {
    background-color: ${({ theme }) => theme.accent};
    color: #FFFFFF;
  }

  /* Accessible Focus */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
