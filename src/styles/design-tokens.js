// CanvasThink Design System - Design Tokens
// Based on MVP Design Specifications

export const colors = {
  // Primary Colors
  white: '#FFFFFF',
  deepCharcoal: '#1A1A1A',
  warmGray: '#6B7280',
  
  // Accent Colors
  refinedGold: '#D4AF37',
  softBlue: '#3B82F6',
  successGreen: '#10B981',
  alertRed: '#EF4444',
  
  // Extended Palette
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  }
}

export const typography = {
  fontFamily: {
    primary: ['Inter', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    micro: '12px',
    small: '14px',
    body: '16px',
    subheading: '24px',
    sectionHeadline: '32px',
    hero: '48px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  }
}

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
}

export const shadows = {
  subtle: '0 4px 6px rgba(0, 0, 0, 0.07)',
  enhanced: '0 8px 25px rgba(0, 0, 0, 0.15)',
  focus: '0 0 0 3px rgba(59, 130, 246, 0.1)',
}

export const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
}

export const transitions = {
  fast: '150ms ease',
  normal: '200ms ease-in-out',
  slow: '300ms ease-out',
  hover: '300ms ease-out',
}

export const breakpoints = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1200px',
}

export const gridSystem = {
  maxWidth: '1200px',
  columns: 12,
  gutters: {
    mobile: '16px',
    tablet: '20px',
    desktop: '24px',
  }
}
