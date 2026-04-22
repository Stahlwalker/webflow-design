import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Img } from "remotion";
import { colors } from "../../../config/colors";
import { fontFamily, eyebrow as eyebrowToken, heading } from "../../../config/typography";

const tools = [
  { name: "Claude",   logo: "logos/claude.png"   },
  { name: "Cursor",   logo: "logos/cursor.png"   },
  { name: "Postman",  logo: "logos/postman.png"  },
  { name: "Windsurf", logo: "logos/windsurf.png" },
  { name: "Rovo",     logo: "logos/rovo.png"     },
];

const ORBIT_RADIUS = 320;
const ORBIT_SPEED = 0.4;
const toRad = (deg: number) => (deg * Math.PI) / 180;
const CX = 960;
const CY = 540;

// ─── Phase timing (390 frames / 13s) ─────────────────────────────────────────
const HERO_OUT   = 130; // hero fades out at frame 130
const ORBIT_IN   = 130; // orbit starts after hero is fully gone (clean cut)

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Scene5MCP: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Hero phase ─────────────────────────────────────────────────────────────
  const heroEyebrowP = spring({ frame, fps, config: { damping: 200 } });
  const heroTitleP   = spring({ frame: frame - 8, fps, config: { damping: 160 } });
  const heroScale    = interpolate(frame, [0, HERO_OUT], [1.04, 1.0], CLAMP);
  const heroOpacity  = interpolate(frame, [0, 10, HERO_OUT - 15, HERO_OUT], [0, 1, 1, 0], CLAMP);

  // ── Orbit phase (all springs offset by ORBIT_IN) ───────────────────────────
  const orbitFrame   = Math.max(0, frame - ORBIT_IN);
  const eyebrowP     = spring({ frame: orbitFrame, fps, config: { damping: 200 } });
  const centerP      = spring({ frame: Math.max(0, orbitFrame - 5), fps, config: { damping: 140 } });
  const orbitReveal  = spring({ frame: Math.max(0, orbitFrame - 10), fps, config: { damping: 200 } });
  const orbitOpacity = interpolate(frame, [ORBIT_IN, ORBIT_IN + 20], [0, 1], CLAMP);

  const orbitAngle = orbitFrame * ORBIT_SPEED;
  const sweepAngle = (orbitFrame * 1.8) % 360;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>

      {/* ── Hero image intro ── */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: heroOpacity,
        overflow: "hidden",
        zIndex: 5,
      }}>
        <Img
          src={staticFile("product/mcp_hero.png")}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            transform: `scale(${heroScale})`,
            transformOrigin: "center center",
          }}
        />
        {/* Scrim so text reads cleanly */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%)",
        }} />

        {/* Hero title */}
        <div style={{
          position: "absolute", bottom: 100, left: 0, right: 0,
          display: "flex", justifyContent: "center",
          opacity: interpolate(heroTitleP, [0, 1], [0, 1]),
          transform: `translateY(${16 * (1 - heroTitleP)}px)`,
        }}>
          <div style={{
            fontFamily: fontFamily.display,
            fontSize: heading.h2.fontSize,
            fontWeight: heading.h2.fontWeight,
            color: colors.white,
            letterSpacing: heading.h2.letterSpacing,
            textAlign: "center",
          }}>
            MCP Server
          </div>
        </div>
      </div>

      {/* ── Orbit animation ── */}
      <div style={{ position: "absolute", inset: 0, opacity: orbitOpacity, zIndex: 2 }}>

        {/* SVG layer — rings, radar, lines */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 1920 1080"
        >
          <defs>
            <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.blue[400]} stopOpacity="0.25" />
              <stop offset="100%" stopColor={colors.blue[400]} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.blue[500]} stopOpacity="0.3" />
              <stop offset="100%" stopColor={colors.blue[500]} stopOpacity="0" />
            </radialGradient>
            <clipPath id="orbitClip">
              <circle cx={CX} cy={CY} r={ORBIT_RADIUS + 80} />
            </clipPath>
          </defs>

          {[ORBIT_RADIUS, ORBIT_RADIUS * 0.6, ORBIT_RADIUS * 0.3].map((r, i) => (
            <circle key={i} cx={CX} cy={CY} r={r * orbitReveal}
              fill="none" stroke={colors.blue[600]} strokeWidth={1}
              strokeDasharray="4 8" opacity={0.3 - i * 0.05}
            />
          ))}

          <g clipPath="url(#orbitClip)" opacity={orbitReveal * 0.8}>
            <path
              d={`M ${CX} ${CY} L ${CX + ORBIT_RADIUS * Math.cos(toRad(sweepAngle - 40))} ${CY + ORBIT_RADIUS * Math.sin(toRad(sweepAngle - 40))} A ${ORBIT_RADIUS} ${ORBIT_RADIUS} 0 0 1 ${CX + ORBIT_RADIUS * Math.cos(toRad(sweepAngle))} ${CY + ORBIT_RADIUS * Math.sin(toRad(sweepAngle))} Z`}
              fill="url(#radarSweep)"
            />
            <line
              x1={CX} y1={CY}
              x2={CX + ORBIT_RADIUS * Math.cos(toRad(sweepAngle))}
              y2={CY + ORBIT_RADIUS * Math.sin(toRad(sweepAngle))}
              stroke={colors.blue[400]} strokeWidth={1.5} opacity={0.7}
            />
          </g>

          <circle cx={CX} cy={CY} r={200} fill="url(#centerGlow)" opacity={centerP * 0.6} />

          {tools.map((_, i) => {
            const angle = orbitAngle + i * 72;
            const tx = CX + ORBIT_RADIUS * Math.cos(toRad(angle));
            const ty = CY + ORBIT_RADIUS * Math.sin(toRad(angle));
            return (
              <line key={i} x1={CX} y1={CY} x2={tx} y2={ty}
                stroke={colors.blue[600]} strokeWidth={1}
                strokeDasharray="6 6" opacity={orbitReveal * 0.35}
              />
            );
          })}
        </svg>

        {/* Orbiting tool nodes */}
        {tools.map((tool, i) => {
          const nodeP = spring({ frame: Math.max(0, orbitFrame - 20 - i * 8), fps, config: { damping: 160 } });
          const angle = orbitAngle + i * 72;
          const x = ORBIT_RADIUS * Math.cos(toRad(angle));
          const y = ORBIT_RADIUS * Math.sin(toRad(angle));

          return (
            <div
              key={tool.name}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                opacity: nodeP,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
                zIndex: 2,
              }}
            >
              <div style={{
                width: 120, height: 120, borderRadius: 28,
                background: "rgba(10,10,20,0.85)",
                border: "1px solid rgba(20,110,245,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 20px rgba(20,110,245,0.15)",
              }}>
                <Img src={staticFile(tool.logo)} style={{ width: 72, height: 72, objectFit: "contain" }} />
              </div>
              <span style={{
                fontFamily: fontFamily.text, fontSize: 18, fontWeight: 500,
                color: colors.gray[300], letterSpacing: "0.03em",
              }}>
                {tool.name}
              </span>
            </div>
          );
        })}

        {/* Center — Webflow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: `translate(-50%, -50%) scale(${interpolate(centerP, [0, 1], [0.6, 1])})`,
          zIndex: 3,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 18,
          opacity: centerP,
        }}>
          <div style={{
            width: 160, height: 160, borderRadius: 40,
            background: `linear-gradient(135deg, ${colors.blue[600]}, ${colors.blue[400]})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 80px rgba(20,110,245,0.6)",
          }}>
            <Img src={staticFile("logos/Mark_Logo_White.png")} style={{ width: 100, height: 100, objectFit: "contain" }} />
          </div>
          <span style={{
            fontFamily: fontFamily.text, fontSize: 20, fontWeight: 500,
            color: colors.gray[300], letterSpacing: "0.04em", textTransform: "uppercase",
          }}>
            Webflow MCP
          </span>
        </div>

        {/* Bottom headline */}
        <div style={{
          position: "absolute", bottom: 80, left: 0, right: 0,
          display: "flex", justifyContent: "center",
          opacity: interpolate(orbitReveal, [0, 1], [0, 1]),
          transform: `translateY(${16 * (1 - orbitReveal)}px)`,
          zIndex: 10,
        }}>
          <span style={{
            fontFamily: fontFamily.display, fontSize: 28, fontWeight: 500,
            color: colors.gray[300], letterSpacing: "0.01em",
          }}>
            Build with agents that understand Webflow
          </span>
        </div>

      </div>
    </AbsoluteFill>
  );
};
