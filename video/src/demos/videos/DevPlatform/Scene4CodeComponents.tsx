import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Img } from "remotion";
import { StaggerText } from "../../../components/common/StaggerText";
import { CodeBlock } from "../../../components/common/ui/CodeBlock";
import { BrowserFrame } from "../../../components/common/ui/BrowserFrame";
import { colors } from "../../../config/colors";
import { fontFamily, eyebrow as eyebrowToken, heading } from "../../../config/typography";

// Phase 1: Developers (0 → CODE_IN)
// Phase 2: Import React Components (CODE_IN → DESIGN_IN)
// Phase 3: Configure in Webflow (DESIGN_IN → end)
const CODE_IN      = 185;
const DESIGN_IN    = 315;
const DEV_LOGO_IN  = 80;   // frames into scene before logo strip fades in
const SHIMMER_PERIOD = 90; // frames for one full shimmer sweep

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const componentCode = `import * as React from "react";

interface BadgeProps {
  text: string;
  variant: "Light" | "Dark";
}

export const Badge = ({ text, variant }: BadgeProps) => (
  <span
    style={{
      backgroundColor: variant === "Light" ? "#eee" : "#000",
      borderRadius: "1em",
      color: variant === "Light" ? "#000" : "#fff",
      display: "inline-block",
      fontSize: "14px",
      lineHeight: 2,
      padding: "0 1em",
    }}
  >
    {text}
  </span>
);`;

const IDE_LOGOS = [
  { src: "logos/cursor.png",   label: "Cursor" },
  { src: "logos/windsurf.png", label: "Windsurf" },
  { src: "logos/vscode.png",   label: "VS Code" },
  { src: "logos/zed-blue.png", label: "Zed" },
  { src: "logos/claude.png",   label: "Claude" },
  { src: "logos/codex.png",   label: "Codex" },
];

const devItems = [
  { label: "Build your way",       iconSrc: "icons/Build_your_way.svg" },
  { label: "Empower teammates",    iconSrc: "icons/Empower.svg" },
  { label: "Import into Webflow",  iconSrc: "icons/Import.svg" },
];

const designerItems = [
  { label: "Build visually",          iconSrc: "icons/Build_visually.svg" },
  { label: "Add dynamic content",     iconSrc: "icons/Dynamic_content.svg" },
  { label: "Personalize & optimize",  iconSrc: "icons/Optimize.svg" },
];

export const Scene4CodeComponents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 — Developers
  const devPhaseOpacity = interpolate(frame, [0, 8, CODE_IN - 12, CODE_IN], [0, 1, 1, 0], CLAMP);

  // Phase 2 — Import React Components (springs offset by CODE_IN)
  const reactLogoP   = spring({ frame: frame - CODE_IN,      fps, config: { damping: 200 } });
  const headlineP    = spring({ frame: frame - CODE_IN - 6,  fps, config: { damping: 180 } });
  const codeP        = spring({ frame: frame - CODE_IN - 14, fps, config: { damping: 160 } });
  const codePhaseOpacity = interpolate(frame, [CODE_IN, CODE_IN + 8, DESIGN_IN - 12, DESIGN_IN], [0, 1, 1, 0], CLAMP);

  // Phase 3 — Designers
  const designPhaseP       = spring({ frame: frame - DESIGN_IN, fps, config: { damping: 180 } });
  const designPhaseOpacity = interpolate(designPhaseP, [0, 1], [0, 1]);

  // Global eyebrow — always present
  const eyebrowP = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill>
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(${colors.gray[800]} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        opacity: 0.4,
      }} />

      {/* Eyebrow */}
      <div style={{
        position: "absolute", top: 72, left: 0, right: 0,
        display: "flex", justifyContent: "center",
        opacity: eyebrowP, transform: `translateY(${20 * (1 - eyebrowP)}px)`,
        zIndex: 2,
      }}>
        <span style={{ ...eyebrowToken.lg, fontFamily: fontFamily.text, color: colors.blue[400] }}>
          CODE COMPONENTS
        </span>
      </div>

      {/* Phase 1 — Developers */}
      <AbsoluteFill style={{ opacity: devPhaseOpacity, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 36,
        }}>
          {(() => {
            const titleP = spring({ frame, fps, config: { damping: 180 } });
            return (
              <div style={{
                textAlign: "center",
                opacity: interpolate(titleP, [0, 1], [0, 1]),
                transform: `translateY(${-14 * (1 - titleP)}px)`,
              }}>
                <div style={{ fontFamily: fontFamily.display, fontSize: heading.h2.fontSize, fontWeight: heading.h2.fontWeight, color: colors.white, letterSpacing: heading.h2.letterSpacing }}>
                  Develop outside of Webflow
                </div>
              </div>
            );
          })()}

          <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 620 }}>
            {devItems.map((item, i) => {
              const p = spring({ frame: frame - 14 - i * 22, fps, config: { damping: 150 } });
              return (
                <div key={item.label} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 24,
                  padding: "20px 28px", borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  opacity: interpolate(p, [0, 1], [0, 1]),
                  transform: `translateY(${24 * (1 - p)}px)`,
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Img src={staticFile(item.iconSrc)} style={{ width: 48, height: 48, objectFit: "contain" }} />
                  </div>
                  <div style={{ fontFamily: fontFamily.display, fontSize: 22, fontWeight: 600, color: colors.white, letterSpacing: "-0.01em" }}>
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* IDE logo strip with shimmer */}
          {(() => {
            const shimmerFrame = Math.max(0, frame - DEV_LOGO_IN);
            const stripP = spring({ frame: frame - DEV_LOGO_IN, fps, config: { damping: 160 } });
            const shimmerX = interpolate(shimmerFrame % SHIMMER_PERIOD, [0, SHIMMER_PERIOD], [-100, 520], CLAMP);
            return (
              <div style={{
                opacity: interpolate(stripP, [0, 1], [0, 1]),
                transform: `translateY(${16 * (1 - stripP)}px)`,
                position: "relative",
                display: "flex", gap: 16,
                overflow: "hidden",
                padding: 4, margin: -4,
              }}>
                <div style={{
                  position: "absolute", top: 0, bottom: 0, width: 100,
                  left: shimmerX,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 50%, transparent)",
                  pointerEvents: "none", zIndex: 10,
                }} />
                {IDE_LOGOS.map((logo) => (
                  <div key={logo.src} style={{
                    width: 72, height: 72, borderRadius: 16,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Img src={staticFile(logo.src)} style={{ width: 48, height: 48, objectFit: "contain" }} />
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </AbsoluteFill>

      {/* Phase 2 — Import React Components */}
      <AbsoluteFill style={{ opacity: codePhaseOpacity, pointerEvents: "none" }}>
        {/* Left: React logo + headline */}
        <div style={{
          position: "absolute", left: 100, top: 0, bottom: 0, width: 520,
          display: "flex", flexDirection: "column", alignItems: "flex-start",
          justifyContent: "center", gap: 24, zIndex: 1,
          opacity: interpolate(headlineP, [0, 1], [0, 1]),
          transform: `translateX(${-24 * (1 - headlineP)}px)`,
        }}>
          <div style={{
            width: 64, height: 64,
            borderRadius: 16,
            background: "rgba(97,218,251,0.1)",
            border: "1px solid rgba(97,218,251,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(97,218,251,0.15)",
            opacity: interpolate(reactLogoP, [0, 1], [0, 1]),
            transform: `scale(${interpolate(reactLogoP, [0, 1], [0.7, 1])})`,
          }}>
            <Img src={staticFile("logos/react.png")} style={{ width: 40, height: 40, objectFit: "contain" }} />
          </div>
          <div style={{ width: "100%" }}>
            <StaggerText
              text="Import React Components"
              fontSize={heading.h2.fontSize}
              fontWeight={heading.h2.fontWeight}
              color={colors.white}
              stagger="words"
              staggerDelay={6}
              delay={CODE_IN + 10}
            />
          </div>
        </div>

        {/* Right: code */}
        <div style={{
          position: "absolute", left: 700, right: 60, top: 0, bottom: 0,
          display: "flex", alignItems: "center", zIndex: 1,
          opacity: interpolate(codeP, [0, 1], [0, 1]),
          transform: `translateY(${20 * (1 - codeP)}px)`,
        }}>
          <div style={{ width: "100%", height: 740 }}>
            <BrowserFrame title="Badge.tsx" url="webflow.com/designer" variant="dark" height="100%">
              <div style={{ padding: "12px 20px" }}>
                <CodeBlock
                  code={componentCode}
                  language="tsx"
                  typingSpeed={0.01}
                  delay={0}
                  showLineNumbers
                  fontSize={13}
                />
              </div>
            </BrowserFrame>
          </div>
        </div>
      </AbsoluteFill>

      {/* Phase 3 — Configure in Webflow (Designers & Marketers) */}
      <AbsoluteFill style={{
        opacity: designPhaseOpacity,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 48,
      }}>
        {(() => {
          const titleP = spring({ frame: frame - DESIGN_IN, fps, config: { damping: 180 } });
          return (
            <div style={{
              textAlign: "center",
              opacity: interpolate(titleP, [0, 1], [0, 1]),
              transform: `translateY(${-14 * (1 - titleP)}px)`,
            }}>
              <div style={{ fontFamily: fontFamily.display, fontSize: heading.h2.fontSize, fontWeight: heading.h2.fontWeight, color: colors.white, letterSpacing: heading.h2.letterSpacing }}>
                …configure in Webflow
              </div>
            </div>
          );
        })()}

        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 700 }}>
          {designerItems.map((item, i) => {
            const p = spring({ frame: frame - DESIGN_IN - 14 - i * 22, fps, config: { damping: 150 } });
            return (
              <div key={item.label} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 24,
                padding: "20px 28px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                opacity: interpolate(p, [0, 1], [0, 1]),
                transform: `translateY(${24 * (1 - p)}px)`,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Img src={staticFile(item.iconSrc)} style={{ width: 48, height: 48, objectFit: "contain" }} />
                </div>
                <div style={{ fontFamily: fontFamily.display, fontSize: 22, fontWeight: 600, color: colors.white, letterSpacing: "-0.01em" }}>
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
