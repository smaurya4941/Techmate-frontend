/**
 * Techmate Industries Design System Tokens (Phase 2)
 *
 * Mandatory Brand Palette:
 * Primary Blue: #174A83
 * Accent Red:   #D62836
 * Deep Navy:    #102B46
 * Light Grey:   #F3F6FA
 * Pure White:   #FFFFFF
 * Slate Grey:   #344054
 */

export const DESIGN_TOKENS = {
  colors: {
    primary: '#174A83',
    primaryHover: '#123a67',
    primaryLight: '#e8f0f8',
    accent: '#D62836',
    accentHover: '#b81d29',
    accentLight: '#fbe9ea',
    navy: '#102B46',
    navyLight: '#16395c',
    navyDark: '#0a1b2d',
    background: '#F3F6FA',
    surface: '#FFFFFF',
    text: '#344054',
    muted: '#64748B',
    border: '#E2E8F0',
    borderDark: 'rgba(255, 255, 255, 0.15)',
    success: '#16A34A',
    warning: '#D97706',
    error: '#DC2626',
    focus: '#174A83',
  },
  typography: {
    fontHeading: 'var(--font-heading), Plus Jakarta Sans, sans-serif',
    fontBody: 'var(--font-sans), Inter, sans-serif',
  },
  layout: {
    maxContentWidth: '1280px', // max-w-7xl
    containerPadding: '1rem',  // px-4 sm:px-6 lg:px-8
  },
  proportions: {
    whiteSurface: '50%',
    lightGreyBackground: '20%',
    primaryCorporateBlue: '15%',
    deepNavy: '10%',
    accentRed: '5%',
  },
} as const;
