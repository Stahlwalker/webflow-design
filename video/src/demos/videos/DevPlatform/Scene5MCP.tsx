import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Img } from "remotion";
import { colors } from "../../../config/colors";
import { fontFamily, eyebrow as eyebrowToken } from "../../../config/typography";

const tools = [
  { name: "Claude",   logo: "logos/claude.png"   },
  { name: "Cursor",   logo: "logos/cursor.png"   },
  { name: "Postman",  logo: "logos/postman.png"  },
  { name: "Windsurf", logo: "logos/windsurf.png" },
  { name: "Rovo",     logo: "logos/rovo.png"     },
];

const ORBIT_RADIUS = 320;
const ORBIT_SPEED = 0.4; // degrees per frame
const toRad = (deg: number) => (deg * Math.PI) / 180;
const CX = 960;
const CY = 540;

export const Scene5MCP: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowP = spring({ frame, fps, config: { damping: 200 } });
  const centerP = spring({ frame: frame - 5, fps, config: { damping: 140 } });
  const orbitReveal = spring({ frame: frame - 10, fps, config: { damping: 200 } });

  // Orbit angle advances over time
  const orbitAngle = frame * ORBIT_SPEED;
  // Radar sweep angle
  const sweepAngle = (frame * 1.8) % 360;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>

      {/* SVG layer — rings, radar, lines */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 1920 1080"
      >
        <defs>
          {/* Radar sweep gradient */}
          <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.blue[400]} stopOpacity="0.25" />
            <stop offset="100%" stopColor={colors.blue[400]} stopOpacity="0" />
          </radialGradient>
          {/* Center glow */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.blue[500]} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.blue[500]} stopOpacity="0" />
          </radialGradient>
          <clipPath id="orbitClip">
            <circle cx={CX} cy={CY} r={ORBIT_RADIUS + 80} />
          </clipPath>
        </defs>

        {/* Concentric orbit rings */}
        {[ORBIT_RADIUS, ORBIT_RADIUS * 0.6, ORBIT_RADIUS * 0.3].map((r, i) => (
          <circle key={i} cx={CX} cy={CY} r={r * orbitReveal}
            fill="none" stroke={colors.blue[600]} strokeWidth={1}
            strokeDasharray="4 8" opacity={0.3 - i * 0.05}
          />
        ))}

        {/* Radar sweep wedge */}
        <g clipPath="url(#orbitClip)" opacity={orbitReveal * 0.8}>
          <path
            d={`M ${CX} ${CY} L ${CX + ORBIT_RADIUS * Math.cos(toRad(sweepAngle - 40))} ${CY + ORBIT_RADIUS * Math.sin(toRad(sweepAngle - 40))} A ${ORBIT_RADIUS} ${ORBIT_RADIUS} 0 0 1 ${CX + ORBIT_RADIUS * Math.cos(toRad(sweepAngle))} ${CY + ORBIT_RADIUS * Math.sin(toRad(sweepAngle))} Z`}
            fill={`url(#radarSweep)`}
          />
          {/* Leading edge line */}
          <line
            x1={CX} y1={CY}
            x2={CX + ORBIT_RADIUS * Math.cos(toRad(sweepAngle))}
            y2={CY + ORBIT_RADIUS * Math.sin(toRad(sweepAngle))}
            stroke={colors.blue[400]} strokeWidth={1.5} opacity={0.7}
          />
        </g>

        {/* Center glow circle */}
        <circle cx={CX} cy={CY} r={200} fill="url(#centerGlow)" opacity={centerP * 0.6} />

        {/* Lines from center to each tool */}
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
        const nodeP = spring({ frame: frame - 20 - i * 8, fps, config: { damping: 160 } });
        const angle = orbitAngle + i * 72;
        const x = ORBIT_RADIUS * Math.cos(toRad(angle));
        const y = ORBIT_RADIUS * Math.sin(toRad(angle));

        return (
          <div
            key={tool.name}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              opacity: nodeP,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              zIndex: 2,
            }}
          >
            <div style={{
              width: 120,
              height: 120,
              borderRadius: 28,
              background: "rgba(10,10,20,0.85)",
              border: `1px solid rgba(20,110,245,0.3)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 20px rgba(20,110,245,0.15)`,
            }}>
              <Img src={staticFile(tool.logo)} style={{ width: 72, height: 72, objectFit: "contain" }} />
            </div>
            <span style={{
              fontFamily: fontFamily.text,
              fontSize: 18,
              fontWeight: 500,
              color: colors.gray[300],
              letterSpacing: "0.03em",
            }}>
              {tool.name}
            </span>
          </div>
        );
      })}

      {/* Center — Webflow */}
      <div style={{
        position: "relative",
        zIndex: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        opacity: centerP,
        transform: `scale(${interpolate(centerP, [0, 1], [0.6, 1])})`,
      }}>
        <div style={{
          width: 160,
          height: 160,
          borderRadius: 40,
          background: `linear-gradient(135deg, ${colors.blue[600]}, ${colors.blue[400]})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 80px rgba(20,110,245,0.6)`,
        }}>
          <Img src={staticFile("logos/Mark_Logo_White.png")} style={{ width: 100, height: 100, objectFit: "contain" }} />
        </div>
        <span style={{
          fontFamily: fontFamily.text,
          fontSize: 20,
          fontWeight: 500,
          color: colors.gray[300],
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>
          Webflow MCP
        </span>
      </div>

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
          04 — MCP SERVER
        </span>
      </div>

      {/* Bottom headline */}
      <div style={{
        position: "absolute",
        bottom: 80,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: interpolate(orbitReveal, [0, 1], [0, 1]),
        transform: `translateY(${16 * (1 - orbitReveal)}px)`,
        zIndex: 10,
      }}>
        <span style={{
          fontFamily: fontFamily.display,
          fontSize: 28,
          fontWeight: 500,
          color: colors.gray[300],
          letterSpacing: "0.01em",
        }}>
          Build with agents that understand Webflow
        </span>
      </div>
    </AbsoluteFill>
  );
};
