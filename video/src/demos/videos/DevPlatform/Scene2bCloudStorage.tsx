import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { StaggerText } from "../../../components/common/StaggerText";
import { colors } from "../../../config/colors";
import { fontFamily, eyebrow as eyebrowToken, heading } from "../../../config/typography";

const storageTypes = [
  {
    label: "SQLite",
    tag: "Relational",
    desc: "Reliable, relational storage for structured data. Query with SQL, manage through the CLI, and inspect data in the built-in viewer.",
    icon: (color: string) => (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
        <path d="M3 12a9 3 0 0 0 18 0" />
      </svg>
    ),
  },
  {
    label: "Key Value Store",
    tag: "Edge-cached",
    desc: "Fast, edge-cached storage for configuration, sessions, or feature flags that need low-latency access.",
    icon: (color: string) => (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    label: "Object Store",
    tag: "Global",
    desc: "Scalable, secure storage for media files and unstructured data, deployed globally with your app.",
    icon: (color: string) => (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

export const Scene2bCloudStorage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowP   = spring({ frame,          fps, config: { damping: 200 } });
  const headlineP  = spring({ frame: frame - 6, fps, config: { damping: 180 } });

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(${colors.gray[800]} 1px, transparent 1px)`,
        backgroundSize: "52px 52px",
        opacity: 0.35,
      }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 900,
        height: 500,
        borderRadius: "50%",
        background: `radial-gradient(ellipse, rgba(20,110,245,0.1) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        paddingLeft: 100,
        paddingRight: 100,
      }}>

        {/* Eyebrow */}
        <div style={{
          opacity: eyebrowP,
          transform: `translateY(${14 * (1 - eyebrowP)}px)`,
          marginBottom: 24,
        }}>
          <span style={{ ...eyebrowToken.lg, fontFamily: fontFamily.text, color: colors.blue[400] }}>
            CLOUD STORAGE
          </span>
        </div>

        {/* Headline */}
        <div style={{
          textAlign: "center",
          opacity: interpolate(headlineP, [0, 1], [0, 1]),
          transform: `translateY(${18 * (1 - headlineP)}px)`,
          marginBottom: 64,
        }}>
          <StaggerText
            text="Flexible storage for every use case"
            fontSize={heading.h2.fontSize}
            fontWeight={heading.h2.fontWeight}
            color={colors.white}
            stagger="words"
            staggerDelay={5}
            delay={8}
          />
        </div>

        {/* Storage cards */}
        <div style={{ display: "flex", gap: 24, width: "100%" }}>
          {storageTypes.map((item, i) => {
            const p = spring({ frame: frame - 24 - i * 20, fps, config: { damping: 160 } });
            const isCenter = i === 1;

            return (
              <div
                key={item.label}
                style={{
                  flex: 1,
                  padding: "44px 40px",
                  borderRadius: 20,
                  border: `1px solid ${isCenter ? colors.blue[700] : "rgba(255,255,255,0.07)"}`,
                  background: isCenter
                    ? "rgba(20,110,245,0.08)"
                    : "rgba(255,255,255,0.025)",
                  boxShadow: isCenter ? `0 0 40px rgba(20,110,245,0.12)` : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  opacity: interpolate(p, [0, 1], [0, 1]),
                  transform: `translateY(${32 * (1 - p)}px)`,
                }}
              >
                {/* Icon */}
                <div style={{ color: isCenter ? colors.blue[400] : colors.gray[500] }}>
                  {item.icon(isCenter ? colors.blue[400] : colors.gray[500])}
                </div>

                {/* Tag */}
                <div>
                  <span style={{
                    fontFamily: fontFamily.text,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    color: isCenter ? colors.blue[400] : colors.gray[600],
                    textTransform: "uppercase",
                  }}>
                    {item.tag}
                  </span>
                </div>

                {/* Label */}
                <div style={{
                  fontFamily: fontFamily.display,
                  fontSize: heading.h4.fontSize,
                  fontWeight: heading.h4.fontWeight,
                  color: isCenter ? colors.white : colors.gray[300],
                  letterSpacing: heading.h4.letterSpacing,
                }}>
                  {item.label}
                </div>

              </div>
            );
          })}
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
