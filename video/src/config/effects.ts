// Reusable visual effect tokens

export const blur = {
  sm: 10,
  md: 20,
  lg: 40,
  xl: 60,
} as const;

export const shadow = {
  sm: "0 2px 8px rgba(0, 0, 0, 0.1)",
  md: "0 4px 20px rgba(0, 0, 0, 0.15)",
  lg: "0 8px 40px rgba(0, 0, 0, 0.25)",
  xl: "0 16px 60px rgba(0, 0, 0, 0.4)",
  dark: {
    sm: "0 2px 8px rgba(0, 0, 0, 0.3)",
    md: "0 4px 20px rgba(0, 0, 0, 0.4)",
    lg: "0 8px 40px rgba(0, 0, 0, 0.5)",
    xl: "0 16px 60px rgba(0, 0, 0, 0.7)",
  },
} as const;

export const radius = {
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  pill: 100,
} as const;

export const glass = {
  dark: {
    background: "rgba(0, 0, 0, 0.45)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  light: {
    background: "rgba(255, 255, 255, 0.45)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
  },
} as const;
