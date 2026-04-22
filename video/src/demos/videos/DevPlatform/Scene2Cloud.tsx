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

// ─── Timing (360 frames / 12s) ───────────────────────────────────────────────
const INTRO_OUT = 72;
const GRID_IN   = 60;
const STAGGER   = 14;

// [spotlightIn, spotlightOut] — Deploy has no out (holds to scene end)
const SP: [number, number][] = [
  [125, 205],  // Build
  [215, 295],  // Run
  [305, 360],  // Deploy
];

// ─── Spotlight card dimensions ────────────────────────────────────────────────
const SP_W = 1560;
const SP_H = Math.round(SP_W * 9 / 16); // 877
const SP_L = (1920 - SP_W) / 2;          // 180
const SP_T = (1080 - SP_H) / 2;          // ~101

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const phases = [
  { label: "Build",  src: "product/cloud/cloud-editor.png" },
  { label: "Run",    src: "product/cloud/Webflow Cloud Projects.png" },
  { label: "Deploy", src: "product/cloud/devlink_export-webflow.png" },
];

export const Scene2Cloud: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Intro ──────────────────────────────────────────────────────────────────
  const eyebrowP  = spring({ frame,            fps, config: { damping: 200 } });
  const titleP    = spring({ frame: frame - 8,  fps, config: { damping: 160 } });
  const subtitleP = spring({ frame: frame - 18, fps, config: { damping: 150 } });
  const introOpacity = interpolate(frame, [INTRO_OUT - 14, INTRO_OUT], [1, 0], CLAMP);
  const gridOpacity  = interpolate(frame, [GRID_IN - 8, GRID_IN + 8], [0, 1], CLAMP);

  // ── Grid dim — fades down when first spotlight starts ──────────────────────
  const gridDimP   = spring({ frame: frame - SP[0][0] + 6, fps, config: { damping: 140 } });
  const gridDim    = interpolate(gridDimP, [0, 1], [1, 0.1]);

  // ── Scrim — dark overlay behind spotlight ──────────────────────────────────
  const scrimP     = spring({ frame: frame - SP[0][0] + 6, fps, config: { damping: 140 } });
  const scrimOp    = interpolate(scrimP, [0, 1], [0, 0.72]);

  return (
    <AbsoluteFill style={{ background: "#000" }}>

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(${colors.gray[800]} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        opacity: 0.4,
      }} />

      {/* Center radial glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1100, height: 600, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(20,110,245,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Intro title card ── */}
      <AbsoluteFill style={{
        opacity: introOpacity,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 20, pointerEvents: "none",
      }}>
        <div style={{ opacity: eyebrowP, transform: `translateY(${12 * (1 - eyebrowP)}px)` }}>
          <span style={{ ...eyebrowToken.lg, fontFamily: fontFamily.text, color: colors.blue[400] }}>
            WEBFLOW CLOUD
          </span>
        </div>
        <div style={{
          opacity: interpolate(titleP, [0, 1], [0, 1]),
          transform: `translateY(${18 * (1 - titleP)}px)`,
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: fontFamily.display,
            fontSize: heading.h1.fontSize,
            fontWeight: heading.h1.fontWeight,
            color: colors.white,
            letterSpacing: heading.h1.letterSpacing,
          }}>
            Build. Run. Deploy.
          </div>
        </div>
        <div style={{
          opacity: interpolate(subtitleP, [0, 1], [0, 1]),
          transform: `translateY(${10 * (1 - subtitleP)}px)`,
        }}>
          <div style={{
            fontFamily: fontFamily.text, fontSize: 22, fontWeight: 400,
            color: colors.gray[400], textAlign: "center", letterSpacing: "0.01em",
          }}>
            Full-stack hosting, built for Webflow.
          </div>
        </div>
      </AbsoluteFill>

      {/* ── Base grid (dims when spotlights start) ── */}
      <AbsoluteFill style={{
        opacity: gridOpacity * gridDim,
        display: "flex", flexDirection: "row",
        alignItems: "center", justifyContent: "center",
        padding: "72px 80px", gap: 24,
        pointerEvents: "none",
      }}>
        {phases.map(({ label, src }, i) => {
          const cardIn = GRID_IN + i * STAGGER;
          const rotP   = spring({ frame: frame - cardIn, fps, config: { damping: 110, stiffness: 65 } });
          const labelP = spring({ frame: frame - cardIn - 6, fps, config: { damping: 200 } });
          const cardOp = interpolate(frame, [cardIn, cardIn + 10], [0, 1], CLAMP);
          const rotY   = interpolate(rotP, [0, 1], [20, 0]);
          const transY = interpolate(rotP, [0, 1], [28, 0]);

          return (
            <div key={src} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, opacity: cardOp }}>
              <div style={{
                opacity: interpolate(labelP, [0, 1], [0, 1]),
                transform: `translateY(${6 * (1 - labelP)}px)`,
              }}>
                <span style={{
                  fontFamily: fontFamily.text, fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.14em", color: colors.blue[400], textTransform: "uppercase",
                }}>
                  {label}
                </span>
              </div>
              <div style={{
                borderRadius: 14, overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.13)",
                boxShadow: [
                  "0 0 0 1px rgba(20,110,245,0.1)",
                  "0 24px 64px rgba(0,0,0,0.75)",
                  "inset 0 1px 0 rgba(255,255,255,0.08)",
                ].join(", "),
                transform: `perspective(1400px) rotateY(${rotY}deg) translateY(${transY}px)`,
                transformOrigin: "center center",
                aspectRatio: "16 / 9",
                position: "relative",
              }}>
                <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.25) 100%)",
                  pointerEvents: "none",
                }} />
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* ── Scrim — sits above grid, below spotlight cards ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "#000",
        opacity: scrimOp,
        zIndex: 15,
        pointerEvents: "none",
      }} />

      {/* ── Spotlight cards — each rises to center-screen ── */}
      {phases.map(({ label, src }, i) => {
        const [spIn, spOut] = SP[i];
        const isLast = i === phases.length - 1;

        const inP  = spring({ frame: frame - spIn,  fps, config: { damping: 85, stiffness: 50 } });
        const outP = spring({ frame: frame - spOut, fps, config: { damping: 100, stiffness: 58 } });

        const afterOut = !isLast && frame >= spOut;

        const scale   = afterOut
          ? interpolate(outP, [0, 1], [1, 0.22])
          : interpolate(inP,  [0, 1], [0.22, 1]);
        const ty      = afterOut
          ? interpolate(outP, [0, 1], [0, 200])
          : interpolate(inP,  [0, 1], [200, 0]);
        const opacity = frame < spIn
          ? 0
          : afterOut
            ? interpolate(outP, [0.6, 1], [1, 0], CLAMP)
            : interpolate(inP,  [0, 0.25], [0, 1], CLAMP);

        return (
          <div
            key={`sp-${i}`}
            style={{
              position: "absolute",
              left: SP_L, top: SP_T,
              width: SP_W, height: SP_H,
              borderRadius: 16, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: [
                "0 0 0 1px rgba(20,110,245,0.2)",
                "0 48px 120px rgba(0,0,0,0.9)",
                "0 0 80px rgba(20,110,245,0.12)",
                "inset 0 1px 0 rgba(255,255,255,0.14)",
              ].join(", "),
              transform: `translateY(${ty}px) scale(${scale})`,
              transformOrigin: "center center",
              opacity,
              zIndex: 20,
            }}
          >
            <Img
              src={staticFile(src)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Label overlay — top left of card */}
            <div style={{ position: "absolute", top: 22, left: 28, zIndex: 2 }}>
              <span style={{
                fontFamily: fontFamily.text, fontSize: 13, fontWeight: 700,
                letterSpacing: "0.14em", color: colors.blue[400], textTransform: "uppercase",
              }}>
                {label}
              </span>
            </div>
            {/* Framework icons overlay — Build card open editor area */}
            {i === 0 && (() => {
              const ICON_START = SP[0][0] + 10;
              const frameworks = [
                { src: "logos/astro.png",   delay: 0  },
                { src: "logos/nextjs.png",  delay: 18 },
              ];
              return (
                <div style={{
                  position: "absolute", top: "52%", right: "18%", zIndex: 3,
                  display: "flex", gap: 24, alignItems: "center",
                }}>
                  {frameworks.map(({ src, delay }) => {
                    const p = spring({ frame: frame - ICON_START - delay, fps, config: { damping: 120, stiffness: 60 } });
                    const bob = Math.sin((frame - ICON_START - delay) * 0.06) * 5;
                    return (
                      <div key={src} style={{
                        opacity: interpolate(p, [0, 1], [0, 1]),
                        transform: `scale(${interpolate(p, [0, 1], [0.5, 1])}) translateY(${bob}px)`,
                      }}>
                        <Img src={staticFile(src)} style={{ width: 72, height: 72, objectFit: "contain" }} />
                      </div>
                    );
                  })}
                </div>
              );
            })()}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 14%, transparent 86%, rgba(0,0,0,0.32) 100%)",
              pointerEvents: "none",
            }} />
          </div>
        );
      })}

    </AbsoluteFill>
  );
};
