import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { StaggerText } from "../../../components/common/StaggerText";
import { colors } from "../../../config/colors";
import { fontFamily, eyebrow as eyebrowToken, heading } from "../../../config/typography";

const TERM_OUT  = 155;
const TICKER_IN = 140;

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const CMD1 = "$ npm install -g @webflow/webflow-cli";
const CMD2 = "✓  webflow-cli@1.12.2 installed";

const capabilities = [
  {
    label: "Share Code Components",
    sub: "Publish reusable React components to your team",
    icon: (c: string) => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    label: "Export with DevLink",
    sub: "Sync Webflow components directly into your codebase",
    icon: (c: string) => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="15" y1="4" x2="9" y2="20" />
      </svg>
    ),
  },
  {
    label: "Deploy to Cloud",
    sub: "Push full-stack apps to Webflow Cloud",
    icon: (c: string) => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
      </svg>
    ),
  },
  {
    label: "Designer Extensions",
    sub: "Build custom panels and tools inside the Designer",
    icon: (c: string) => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

export const SceneCLI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Terminal typing
  const totalChars = CMD1.length + CMD2.length + 2;
  const charsShown = Math.floor(interpolate(frame, [8, 110], [0, totalChars], CLAMP));
  const line1 = CMD1.slice(0, Math.min(charsShown, CMD1.length));
  const line2Chars = Math.max(0, charsShown - CMD1.length - 1);
  const line2 = line2Chars > 0 ? CMD2.slice(0, line2Chars) : "";
  const showCursor = frame < TERM_OUT - 10;

  const termOpacity  = interpolate(frame, [0, 8, TERM_OUT - 12, TERM_OUT], [0, 1, 1, 0], CLAMP);
  const tickerOpacity = interpolate(frame, [TICKER_IN, TICKER_IN + 12], [0, 1], CLAMP);

  const headlineP = spring({ frame: frame - TICKER_IN + 4, fps, config: { damping: 180 } });

  return (
    <AbsoluteFill>
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(${colors.gray[800]} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        opacity: 0.4,
      }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute",
        top: "45%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1000, height: 600, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(20,110,245,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Eyebrow */}
      <div style={{ position: "absolute", top: 72, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10 }}>
        <span style={{ ...eyebrowToken.lg, fontFamily: fontFamily.text, color: colors.blue[400] }}>
          CLI
        </span>
      </div>

      {/* Phase 1 — Terminal */}
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40,
        opacity: termOpacity, pointerEvents: "none",
      }}>
        <div style={{
          fontFamily: fontFamily.display,
          fontSize: heading.h2.fontSize,
          fontWeight: heading.h2.fontWeight,
          color: colors.white,
          letterSpacing: heading.h2.letterSpacing,
          textAlign: "center",
        }}>
          Get started with the Webflow CLI
        </div>

        <div style={{
          width: 820,
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(10,10,18,0.95)",
        }}>
          {/* Title bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "12px 16px",
            background: "rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c940" }} />
            <span style={{ flex: 1, textAlign: "center", fontFamily: fontFamily.text, fontSize: 13, color: colors.gray[500] }}>
              terminal
            </span>
          </div>
          {/* Body */}
          <div style={{ padding: "28px 36px 36px" }}>
            <div style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 20, lineHeight: 1.8 }}>
              <span style={{ color: colors.blue[400] }}>{line1}</span>
              {showCursor && charsShown <= CMD1.length && (
                <span style={{ display: "inline-block", width: 2, height: "1em", background: colors.blue[400], marginLeft: 2, verticalAlign: "text-bottom" }} />
              )}
              {line2 && (
                <div>
                  <span style={{ color: "#4ade80" }}>{line2}</span>
                  {showCursor && charsShown > CMD1.length && (
                    <span style={{ display: "inline-block", width: 2, height: "1em", background: "#4ade80", marginLeft: 2, verticalAlign: "text-bottom" }} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Phase 2 — Capability ticker */}
      <AbsoluteFill style={{ opacity: tickerOpacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 56 }}>
        <div style={{
          opacity: interpolate(headlineP, [0, 1], [0, 1]),
          transform: `translateY(${-16 * (1 - headlineP)}px)`,
          textAlign: "center",
        }}>
          <StaggerText
            text="Bring Webflow to your local environment"
            fontSize={heading.h2.fontSize}
            fontWeight={heading.h2.fontWeight}
            color={colors.white}
            stagger="words"
            staggerDelay={6}
            delay={0}
          />
        </div>

        {/* Ticker strip */}
        <div style={{ display: "flex", gap: 24, width: "100%", paddingLeft: 100, paddingRight: 100 }}>
          {capabilities.map((cap, i) => {
            const p = spring({ frame: frame - TICKER_IN - 10 - i * 14, fps, config: { damping: 150, stiffness: 100 } });
            const isHighlight = i === 2; // Deploy to Cloud
            return (
              <div
                key={cap.label}
                style={{
                  flex: 1,
                  padding: "28px 24px 24px",
                  borderRadius: 16,
                  border: `1px solid ${isHighlight ? colors.blue[700] : "rgba(255,255,255,0.07)"}`,
                  background: isHighlight ? "rgba(20,110,245,0.08)" : "rgba(255,255,255,0.025)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  opacity: interpolate(p, [0, 1], [0, 1]),
                  transform: `translateY(${28 * (1 - p)}px)`,
                }}
              >
                <div style={{ color: isHighlight ? colors.blue[400] : colors.gray[500] }}>
                  {cap.icon(isHighlight ? colors.blue[400] : colors.gray[500])}
                </div>
                <div style={{
                  fontFamily: fontFamily.display,
                  fontSize: 18,
                  fontWeight: 600,
                  color: isHighlight ? colors.white : colors.gray[200],
                  letterSpacing: "-0.01em",
                }}>
                  {cap.label}
                </div>
                <div style={{
                  fontFamily: fontFamily.text,
                  fontSize: 13,
                  color: colors.gray[600],
                  lineHeight: 1.5,
                }}>
                  {cap.sub}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
