// Layout constants and video format presets

// Video formats — dimensions, aspect ratios, and platform targets
export const format = {
  landscape: { width: 1920, height: 1080, ratio: "16:9" },
  vertical: { width: 1080, height: 1920, ratio: "9:16" },
  square: { width: 1080, height: 1080, ratio: "1:1" },
  portrait: { width: 1080, height: 1350, ratio: "4:5" },
} as const;

// Platform-specific constraints
export const platform = {
  youtube: { format: "landscape", maxDuration: "12h" },
  youtubeShorts: { format: "vertical", maxDuration: "3m" },
  instagram: {
    reels: { format: "vertical", maxDuration: "15m" },
    stories: { format: "vertical", maxDuration: "60s" },
    feed: { format: "portrait", maxDuration: "60m" },
    feedSquare: { format: "square", maxDuration: "60m" },
  },
  tiktok: { format: "vertical", maxDuration: "60m" },
  x: { format: "landscape", maxDuration: "2m20s" },
  linkedin: { format: "landscape", maxDuration: "15m" },
  facebook: {
    feed: { format: "landscape", maxDuration: "240m" },
    reels: { format: "vertical", maxDuration: "15m" },
    stories: { format: "vertical", maxDuration: "20s" },
  },
  pinterest: { format: "vertical", maxDuration: "15m" },
  threads: { format: "portrait", maxDuration: "5m" },
} as const;

// Safe zones for 9:16 vertical content (platform UI overlays)
export const safeZone = {
  vertical: {
    topInset: 192, // ~10% — username, audio label
    bottomInset: 384, // ~20% — captions, nav bar
    sideInset: 110, // ~10% each side
    safeWidth: 860,
    safeHeight: 1280,
  },
} as const;

// Typography & layout scale by format
export const formatTypography = {
  landscape: { heading: "h1", body: "xl", eyebrow: "lg", padding: 120, maxColumns: 3 as const },
  vertical: { heading: "h2", body: "lg", eyebrow: "md", padding: 60, maxColumns: 1 as const },
  square: { heading: "h2", body: "lg", eyebrow: "md", padding: 60, maxColumns: 2 as const },
  portrait: { heading: "h2", body: "lg", eyebrow: "md", padding: 60, maxColumns: 2 as const },
} as const;

// Encoding specs
export const encoding = {
  codec: "h264",
  audioCodec: "aac",
  container: "mp4",
  fps: 30,
  bitrate: "10M",
} as const;

// Layout tokens (shared across formats)
export const layout = {
  fps: 30,

  padding: {
    scene: 120,
    sceneSm: 60,
    card: 32,
    pill: "14px 36px",
  },

  gap: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 40,
    xl: 60,
  },

  container: {
    chat: 900,
    chatSm: 600,
    videoPreview: { width: 700, height: 500 },
    videoPreviewLarge: { width: 900, height: 850 },
  },
} as const;

// Composition naming helper
export const formatSuffix = {
  landscape: "",
  vertical: "-9x16",
  square: "-1x1",
  portrait: "-4x5",
} as const;
