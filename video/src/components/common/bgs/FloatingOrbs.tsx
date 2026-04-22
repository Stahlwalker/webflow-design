import {
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../../../config/colors";

const W = 1920;
const H = 1080;

const seed = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

type FloatingOrbsProps = {
  orbCount?: number;
  orbColor?: string;
  bgColor?: string;
  blurAmount?: number;
  speed?: number;
  minRadius?: number;
  maxRadius?: number;
  opacity?: number;
};

/**
 * FloatingOrbs — Large soft circles drifting slowly.
 * Elevated tier: subtle, atmospheric, monochromatic.
 */
export const FloatingOrbs: React.FC<FloatingOrbsProps> = ({
  orbCount = 12,
  orbColor = colors.blue[500],
  bgColor = colors.black,
  blurAmount = 60,
  speed = 1,
  minRadius = 80,
  maxRadius = 280,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const orbs = Array.from({ length: orbCount }, (_, i) => ({
    x: seed(i) * W,
    y: seed(i + 100) * H,
    radius: minRadius + seed(i + 200) * (maxRadius - minRadius),
    speedX: (seed(i + 300) - 0.5) * 0.8 * speed,
    speedY: (seed(i + 400) - 0.5) * 0.6 * speed,
    opacity: 0.05 + seed(i + 500) * 0.2,
    phase: seed(i + 600) * Math.PI * 2,
  }));

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
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <filter id="orb-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={blurAmount} />
          </filter>
        </defs>
        {orbs.map((orb, i) => {
          const x =
            orb.x +
            Math.sin(frame * 0.02 * speed + orb.phase) * 80 +
            frame * orb.speedX;
          const y =
            orb.y +
            Math.cos(frame * 0.015 * speed + orb.phase) * 60 +
            frame * orb.speedY;
          const breathe = 1 + Math.sin(frame * 0.03 * speed + orb.phase) * 0.15;

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={orb.radius * breathe}
              fill={orbColor}
              opacity={orb.opacity * opacity}
              filter="url(#orb-blur)"
            />
          );
        })}
      </svg>
    </div>
  );
};
