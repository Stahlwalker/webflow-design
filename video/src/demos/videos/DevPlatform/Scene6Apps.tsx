import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
  Img,
} from "remotion";
import { colors } from "../../../config/colors";
import { fontFamily, eyebrow as eyebrowToken, heading } from "../../../config/typography";

// ─── Phase timing (450 frames / 15s) ─────────────────────────────────────────
const TYPES_OUT    = 135;
const LOGOS_IN     = 120;
const BUILD_OWN_IN = 238;  // "or build your own" appears inside hub
const LOGOS_OUT    = 320;
const CTA_IN       = 308;

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ─── Integration type items ───────────────────────────────────────────────────
const integrationTypes = [
  {
    title: "Marketplace Apps",
    desc: "Apps and extensions built by partners and the community.",
    color: "#4F8EF7",  // blue
    icon: (color: string) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    title: "Native Integrations",
    desc: "Built-in connections to popular tools and services.",
    color: "#4F8EF7",
    icon: (color: string) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    title: "Custom Integrations",
    desc: "Build your own with Webflow's APIs and SDKs.",
    color: "#4F8EF7",
    icon: (color: string) => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
];

// ─── Featured apps ─────────────────────────────────────────────────────────────
const featuredApps = [
  { name: "Zapier",      category: "Automation",  file: "logos/zapier.png"    },
  { name: "Finsweet",    category: "Development", file: "logos/finsweet.png"  },
  { name: "HubSpot",     category: "Marketing",   file: "logos/hubspot.png"   },
  { name: "Google Ads",  category: "Advertising", file: "logos/googleads.png" },
  { name: "Relume",      category: "Design",      file: "logos/relume.png"    },
  { name: "Figma",       category: "Design",      file: "logos/figma.png"     },
];

export const Scene6Apps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowP = spring({ frame, fps, config: { damping: 200 } });
  const eyebrowOpacity = interpolate(frame, [0, 10, LOGOS_OUT - 12, LOGOS_OUT], [0, 1, 1, 0], CLAMP);

  const typesOpacity   = interpolate(frame, [0, 10, TYPES_OUT - 10, TYPES_OUT], [0, 1, 1, 0], CLAMP);
  const logosOpacity   = interpolate(frame, [LOGOS_IN, LOGOS_IN + 12, LOGOS_OUT - 10, LOGOS_OUT], [0, 1, 1, 0], CLAMP);
  const buildOwnOpacity = interpolate(frame, [BUILD_OWN_IN, BUILD_OWN_IN + 18], [0, 1], CLAMP);
  const ctaOpacity     = interpolate(frame, [CTA_IN, CTA_IN + 18], [0, 1], CLAMP);
  const bgOpacity      = interpolate(frame, [LOGOS_OUT - 12, LOGOS_OUT], [1, 0], CLAMP);

  return (
    <AbsoluteFill style={{ background: "#06091A" }}>

      {/* Subtle center glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 900, height: 600, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(20,110,245,0.07) 0%, transparent 70%)",
        pointerEvents: "none", opacity: bgOpacity,
      }} />

      {/* Eyebrow — fades out before CTA */}
      <div style={{
        position: "absolute", top: 64, left: 0, right: 0,
        display: "flex", justifyContent: "center",
        opacity: eyebrowOpacity * eyebrowP, transform: `translateY(${14 * (1 - eyebrowP)}px)`,
        zIndex: 10,
      }}>
        <span style={{ ...eyebrowToken.lg, fontFamily: fontFamily.text, color: colors.blue[400] }}>
          APPS &amp; INTEGRATIONS
        </span>
      </div>

      {/* ── Phase 1: Integration types ── */}
      <AbsoluteFill style={{
        opacity: typesOpacity,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "100px 100px 80px",
        gap: 48, pointerEvents: "none",
      }}>
        {/* Headline */}
        {(() => {
          const p = spring({ frame: frame - 6, fps, config: { damping: 170 } });
          return (
            <div style={{
              textAlign: "center",
              opacity: interpolate(p, [0, 1], [0, 1]),
              transform: `translateY(${16 * (1 - p)}px)`,
            }}>
              <div style={{
                fontFamily: fontFamily.display,
                fontSize: heading.h2.fontSize,
                fontWeight: heading.h2.fontWeight,
                color: colors.white,
                letterSpacing: heading.h2.letterSpacing,
              }}>
                Connect. Extend. Build.
              </div>
            </div>
          );
        })()}

        {/* Three horizontal rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 860 }}>
          {integrationTypes.map((item, i) => {
            const p = spring({ frame: frame - 16 - i * 20, fps, config: { damping: 155 } });
            return (
              <div
                key={item.title}
                style={{
                  display: "flex", alignItems: "center", gap: 28,
                  padding: "28px 36px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  borderLeft: `3px solid ${item.color}`,
                  opacity: interpolate(p, [0, 1], [0, 1]),
                  transform: `translateX(${-40 * (1 - p)}px)`,
                }}
              >
                {/* Icon pill */}
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {item.icon(item.color)}
                </div>

                {/* Text */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                  <div style={{
                    fontFamily: fontFamily.display,
                    fontSize: 20, fontWeight: 600,
                    color: colors.white,
                    letterSpacing: "-0.01em",
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontFamily: fontFamily.text,
                    fontSize: 15, fontWeight: 400, lineHeight: 1.5,
                    color: colors.gray[500],
                  }}>
                    {item.desc}
                  </div>
                </div>

                {/* Color dot accent */}
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: item.color, flexShrink: 0,
                  boxShadow: `0 0 12px ${item.color}80`,
                }} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* ── Phase 2: Apps Hub ── */}
      <AbsoluteFill style={{ opacity: logosOpacity, pointerEvents: "none" }}>
        {/* SVG connecting lines */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          viewBox="0 0 1920 1080"
        >
          {featuredApps.map((_, i) => {
            const angle = (-90 + i * 60) * Math.PI / 180;
            const HUB_R = 290;
            const CX = 960, CY = 560;
            const tx = CX + HUB_R * Math.cos(angle);
            const ty = CY + HUB_R * Math.sin(angle);
            const lineP = spring({ frame: frame - LOGOS_IN - 10 - i * 12, fps, config: { damping: 150 } });
            return (
              <line key={i} x1={CX} y1={CY} x2={tx} y2={ty}
                stroke="rgba(20,110,245,0.25)" strokeWidth={1.5}
                strokeDasharray="5 7" opacity={lineP}
              />
            );
          })}
        </svg>

        {/* Center hub */}
        {(() => {
          const p = spring({ frame: frame - LOGOS_IN - 4, fps, config: { damping: 180 } });
          return (
            <div style={{
              position: "absolute", top: "52%", left: "50%",
              transform: `translate(-50%, -50%) scale(${interpolate(p, [0, 1], [0.7, 1])})`,
              opacity: interpolate(p, [0, 1], [0, 1]),
              display: "flex", alignItems: "center", gap: 16,
              padding: "20px 32px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 0 40px rgba(20,110,245,0.15)",
              zIndex: 2,
            }}>
              <Img src={staticFile("logos/Mark_Logo_Blue.png")} style={{ width: 32, height: 32, objectFit: "contain" }} />
              <div style={{ fontFamily: fontFamily.display, fontSize: 22, fontWeight: 600, color: colors.white, letterSpacing: "-0.01em" }}>
                Install Apps
              </div>
            </div>
          );
        })()}

        {/* App nodes — floating */}
        {featuredApps.map((app, i) => {
          const angle = (-90 + i * 60) * Math.PI / 180;
          const HUB_R = 290;
          const x = HUB_R * Math.cos(angle);
          const y = HUB_R * Math.sin(angle);
          const bobY = Math.sin((frame - LOGOS_IN + i * 42) * 0.045) * 9;
          const nodeP = spring({ frame: frame - LOGOS_IN - 24 - i * 14, fps, config: { damping: 145 } });

          return (
            <div
              key={app.name}
              style={{
                position: "absolute", top: "52%", left: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y + bobY}px))`,
                opacity: interpolate(nodeP, [0, 1], [0, 1]),
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                zIndex: 1,
              }}
            >
              <div style={{
                width: 92, height: 92, borderRadius: 22,
                background: "rgba(15,20,35,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Img src={staticFile(app.file)} style={{ width: 56, height: 56, objectFit: "contain" }} />
              </div>
              <span style={{
                fontFamily: fontFamily.text, fontSize: 15, fontWeight: 500,
                color: colors.gray[300], letterSpacing: "0.01em",
              }}>
                {app.name}
              </span>
            </div>
          );
        })}

        {/* "or build your own" — bottom right, appears late in hub phase */}
        <div style={{
          position: "absolute", bottom: 80, right: 120,
          opacity: buildOwnOpacity,
          transform: `translateY(${interpolate(buildOwnOpacity, [0, 1], [12, 0])}px)`,
        }}>
          <span style={{
            fontFamily: fontFamily.text,
            fontSize: 26, fontWeight: 400,
            color: colors.gray[500],
            letterSpacing: "0.01em",
          }}>
            or{" "}
            <span style={{ color: colors.blue[400], fontWeight: 500 }}>build your own</span>
          </span>
        </div>
      </AbsoluteFill>

      {/* ── Phase 3: CTA ── */}
      <AbsoluteFill style={{
        opacity: ctaOpacity,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 20, pointerEvents: "none",
      }}>
        {(() => {
          const logoP    = spring({ frame: frame - CTA_IN - 2,  fps, config: { damping: 200 } });
          const titleP   = spring({ frame: frame - CTA_IN - 10, fps, config: { damping: 160 } });
          const bracketP = spring({ frame: frame - CTA_IN - 22, fps, config: { damping: 120, stiffness: 40 } });
          return (
            <>
              <div style={{
                opacity: interpolate(logoP, [0, 1], [0, 1]),
                transform: `translateY(${10 * (1 - logoP)}px)`,
              }}>
                <Img
                  src={staticFile("logos/Mark_Logo_Blue.png")}
                  style={{ width: 40, height: 40, objectFit: "contain" }}
                />
              </div>
              <div style={{
                opacity: interpolate(titleP, [0, 1], [0, 1]),
                transform: `translateY(${16 * (1 - titleP)}px)`,
                display: "flex", alignItems: "center", gap: 24,
              }}>
                {/* Left bracket */}
                <span style={{
                  fontFamily: fontFamily.display,
                  fontSize: heading.h1.fontSize,
                  fontWeight: 300,
                  color: colors.blue[400],
                  letterSpacing: "-0.04em",
                  opacity: interpolate(bracketP, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(bracketP, [0, 1], [-40, 0])}px)`,
                  display: "inline-block",
                }}>
                  &lt;
                </span>

                <span style={{
                  fontFamily: fontFamily.display,
                  fontSize: heading.h1.fontSize,
                  fontWeight: heading.h1.fontWeight,
                  color: colors.white,
                  letterSpacing: heading.h1.letterSpacing,
                }}>
                  Start Building Today
                </span>

                {/* Right bracket */}
                <span style={{
                  fontFamily: fontFamily.display,
                  fontSize: heading.h1.fontSize,
                  fontWeight: 300,
                  color: colors.blue[400],
                  letterSpacing: "-0.04em",
                  opacity: interpolate(bracketP, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(bracketP, [0, 1], [40, 0])}px)`,
                  display: "inline-block",
                }}>
                  /&gt;
                </span>
              </div>
            </>
          );
        })()}
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
