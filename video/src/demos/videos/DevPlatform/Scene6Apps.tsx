import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Img } from "remotion";
import { GridBackground } from "../../../components/common/bgs/GridBackground";
import { colors } from "../../../config/colors";
import { fontFamily, eyebrow as eyebrowToken, heading, body } from "../../../config/typography";

const logos = [
  { name: "Figma",      file: "logos/figma.png"     },
  { name: "HubSpot",    file: "logos/hubspot.png"   },
  { name: "Google Ads", file: "logos/googleads.png" },
  { name: "Zapier",     file: "logos/zapier.png"    },
  { name: "Finsweet",   file: "logos/finsweet.png"  },
  { name: "Relume",     file: "logos/relume.png"    },
];

const SWOOP_X = 60;
const SWOOP_Y = 90;
const TRAIL_OFFSETS = [10, 5]; // frames behind main spring

export const Scene6Apps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowP = spring({ frame, fps, config: { damping: 200 } });

  const counterDelay = 110;
  const counterP = spring({ frame: frame - counterDelay, fps, config: { damping: 200 }, durationInFrames: 60 });
  const counterValue = Math.round(interpolate(counterP, [0, 1], [0, 300000]));
  const counterOpacity = interpolate(counterP, [0, 0.05, 1], [0, 1, 1]);
  const counterScale = interpolate(counterP, [0, 1], [0.85, 1]);

  const logosOpacity = interpolate(frame, [counterDelay - 10, counterDelay + 20], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <GridBackground dotColor={colors.blue[500]} opacity={0.15} />

      {/* Eyebrow */}
      <div style={{
        position: "absolute",
        top: 80,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: eyebrowP,
        transform: `translateY(${20 * (1 - eyebrowP)}px)`,
        zIndex: 10,
      }}>
        <span style={{ ...eyebrowToken.lg, fontFamily: fontFamily.text, color: colors.blue[400] }}>
          05 — APPS &amp; INTEGRATIONS
        </span>
      </div>

      {/* Logo grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: logosOpacity,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 40,
          padding: "0 160px",
        }}>
          {logos.map((logo, i) => {
            const delay = 10 + i * 14;
            const config = { damping: 110 };

            const p  = spring({ frame: frame - delay,                       fps, config });
            const p1 = spring({ frame: frame - delay - TRAIL_OFFSETS[0],    fps, config });
            const p2 = spring({ frame: frame - delay - TRAIL_OFFSETS[1],    fps, config });

            const getXY = (prog: number) => ({
              x: interpolate(prog, [0, 1], [SWOOP_X, 0]),
              y: interpolate(prog, [0, 1], [SWOOP_Y, 0]),
            });

            const main = getXY(p);
            const g1   = getXY(p1);
            const g2   = getXY(p2);

            const logoCard = (extraStyle: React.CSSProperties = {}) => (
              <div style={{
                width: 140,
                height: 140,
                borderRadius: 28,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...extraStyle,
              }}>
                <Img src={staticFile(logo.file)} style={{ width: 80, height: 80, objectFit: "contain" }} />
              </div>
            );

            return (
              <div
                key={logo.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  opacity: interpolate(p, [0, 1], [0, 1]),
                  transform: `translate(${main.x}px, ${main.y}px)`,
                  position: "relative",
                }}
              >
                {/* Ghost trail 2 — oldest, most offset */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: `translateX(-50%) translate(${g2.x - main.x}px, ${g2.y - main.y}px)`,
                  opacity: 0.18,
                  filter: "blur(10px)",
                  pointerEvents: "none",
                }}>
                  {logoCard()}
                </div>

                {/* Ghost trail 1 */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: `translateX(-50%) translate(${g1.x - main.x}px, ${g1.y - main.y}px)`,
                  opacity: 0.3,
                  filter: "blur(5px)",
                  pointerEvents: "none",
                }}>
                  {logoCard()}
                </div>

                {/* Main logo */}
                {logoCard()}

                <span style={{
                  fontFamily: fontFamily.text,
                  fontSize: 18,
                  fontWeight: 500,
                  color: colors.gray[400],
                }}>
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Counter reveal */}
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        opacity: counterOpacity,
        transform: `scale(${counterScale})`,
        pointerEvents: "none",
      }}>
        <div style={{
          fontFamily: fontFamily.display,
          fontSize: heading.h0.fontSize,
          fontWeight: heading.h0.fontWeight,
          letterSpacing: heading.h0.letterSpacing,
          color: colors.white,
        }}>
          {counterValue.toLocaleString()}+
        </div>
        <div style={{
          fontFamily: fontFamily.text,
          ...body.xl,
          color: colors.gray[400],
        }}>
          apps installed — no plugin chaos, no broken pipelines
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
