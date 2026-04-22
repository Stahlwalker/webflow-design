import type React from "react";

type TypographyStyle = {
  fontSize: number;
  fontWeight: string;
  letterSpacing: string;
  lineHeight: number;
};

type LabelStyle = TypographyStyle & {
  textTransform: React.CSSProperties["textTransform"];
};

// Font families
export const fontFamily = {
  display: "WFVisualSans, system-ui, sans-serif",
  text: "WFVisualSansText, system-ui, sans-serif",
  mono: "monospace",
} as const;

// Heading styles — display variant, medium weight
// Sizes are scaled for 1920x1080 video (larger than web brand spec)
export const heading = {
  h0: {
    fontSize: 112,
    fontWeight: "500",
    letterSpacing: "0.01em",
    lineHeight: 1.04,
  },
  h1: {
    fontSize: 90,
    fontWeight: "500",
    letterSpacing: "0.01em",
    lineHeight: 1.04,
  },
  h2: {
    fontSize: 80,
    fontWeight: "500",
    letterSpacing: "0.01em",
    lineHeight: 1.04,
  },
  h3: {
    fontSize: 64,
    fontWeight: "500",
    letterSpacing: "0.01em",
    lineHeight: 1.2,
  },
  h4: {
    fontSize: 60,
    fontWeight: "500",
    letterSpacing: "0.02em",
    lineHeight: 1.3,
  },
  h5: {
    fontSize: 48,
    fontWeight: "500",
    letterSpacing: "0.02em",
    lineHeight: 1.3,
  },
} as const satisfies Record<string, TypographyStyle>;

// Body styles — text variant, regular weight
export const body = {
  xxl: {
    fontSize: 36,
    fontWeight: "400",
    letterSpacing: "0.01em",
    lineHeight: 1.6,
  },
  xl: {
    fontSize: 28,
    fontWeight: "400",
    letterSpacing: "0.01em",
    lineHeight: 1.6,
  },
  lg: {
    fontSize: 24,
    fontWeight: "400",
    letterSpacing: "0.01em",
    lineHeight: 1.6,
  },
  md: {
    fontSize: 18,
    fontWeight: "400",
    letterSpacing: "0.01em",
    lineHeight: 1.6,
  },
  sm: {
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: "0.01em",
    lineHeight: 1.6,
  },
  xs: {
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: "0.01em",
    lineHeight: 1.6,
  },
} as const satisfies Record<string, TypographyStyle>;

// Eyebrow styles — text variant, medium weight
export const eyebrow = {
  lg: {
    fontSize: 22,
    fontWeight: "500",
    letterSpacing: "0.1em",
    lineHeight: 1.3,
    textTransform: "uppercase" as const,
  },
  md: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: "0.1em",
    lineHeight: 1.3,
    textTransform: "uppercase" as const,
  },
  sm: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: "0.1em",
    lineHeight: 1.3,
    textTransform: "uppercase" as const,
  },
} as const satisfies Record<string, LabelStyle>;

// Caption styles — text variant, medium weight
export const caption = {
  md: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: "0.01em",
    lineHeight: 1.3,
  },
  sm: {
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: "0.01em",
    lineHeight: 1.3,
  },
} as const satisfies Record<string, TypographyStyle>;
