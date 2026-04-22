import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { colors } from "../../../config/colors";

const W = 1920;
const H = 1080;

const seed = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

type ParticleDriftProps = {
  particleCount?: number;
  particleColor?: string;
  bgColor?: string;
  speed?: number;
  minRadius?: number;
  maxRadius?: number;
  opacity?: number;
  direction?: "up" | "down";
};

/**
 * ParticleDrift — Tiny particles drifting with gentle sway.
 * Brand-aligned: build principle (emergence), monochromatic, subtle.
 */
export const ParticleDrift: React.FC<ParticleDriftProps> = ({
  particleCount = 80,
  particleColor = colors.blue[500],
  bgColor = colors.gray[100],
  speed = 1,
  minRadius = 1,
  maxRadius = 4,
  opacity = 2,
  direction = "up",
}) => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    x: seed(i) * W,
    y: seed(i + 100) * H,
    radius: minRadius + seed(i + 200) * (maxRadius - minRadius),
    speedY: (0.3 + seed(i + 300) * 0.8) * speed,
    drift: (seed(i + 400) - 0.5) * 0.3 * speed,
    opacity: (0.1 + seed(i + 500) * 0.4) * opacity,
    phase: seed(i + 600) * Math.PI * 2,
  }));

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        width: W,
        height: H,
        background: bgColor,
        overflow: "hidden",
      }}
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ opacity: fadeIn }}
      >
        {particles.map((p, i) => {
          const x =
            p.x + Math.sin(frame * 0.02 * speed + p.phase) * 30 + frame * p.drift;
          const dy = frame * p.speedY;
          const y =
            direction === "up"
              ? ((p.y - dy) % (H + 40) + H + 40) % (H + 40)
              : ((p.y + dy) % (H + 40));
          const edgeFade = interpolate(
            y,
            [0, 80, H - 80, H],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <circle
              key={i}
              cx={((x % W) + W) % W}
              cy={y}
              r={p.radius}
              fill={particleColor}
              opacity={p.opacity * edgeFade}
            />
          );
        })}
      </svg>
    </div>
  );
};
