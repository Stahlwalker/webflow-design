import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { colors } from "../../../config/colors";

const W = 1920;
const H = 1080;

type PulseRingsProps = {
  ringCount?: number;
  ringColor?: string;
  bgColor?: string;
  speed?: number;
  maxRadius?: number;
  strokeMax?: number;
  strokeMin?: number;
  peakOpacity?: number;
  originX?: number;
  originY?: number;
  staggerDelay?: number;
};

/**
 * PulseRings — Concentric rings expanding from a point with staggered fade.
 * Brand-aligned: build principle, monochromatic, polished.
 */
export const PulseRings: React.FC<PulseRingsProps> = ({
  ringCount = 6,
  ringColor = colors.blue[500],
  bgColor = colors.black,
  speed = 1,
  maxRadius = 800,
  strokeMax = 3,
  strokeMin = 1,
  peakOpacity = 0.35,
  originX = W / 2,
  originY = H / 2,
  staggerDelay = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
        {Array.from({ length: ringCount }, (_, i) => {
          const delay = i * staggerDelay;
          const progress = interpolate(
            frame - delay,
            [0, (2.5 * fps) / speed],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const radius = progress * maxRadius;
          const opacity = interpolate(
            progress,
            [0, 0.15, 0.6, 1],
            [0, peakOpacity, peakOpacity * 0.4, 0]
          );
          const strokeWidth = interpolate(progress, [0, 1], [strokeMax, strokeMin]);

          return (
            <circle
              key={i}
              cx={originX}
              cy={originY}
              r={radius}
              fill="none"
              stroke={ringColor}
              strokeWidth={strokeWidth}
              opacity={opacity}
            />
          );
        })}
      </svg>
    </div>
  );
};
