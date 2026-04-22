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

type SpeedLinesProps = {
  bgColor?: string;
  lineColor?: string;
  particleColor?: string;
  lineCount?: number;
  particleCount?: number;
  speed?: number;
  opacity?: number;
};

export const SpeedLines: React.FC<SpeedLinesProps> = ({
  bgColor = colors.black,
  lineColor = colors.blue[500],
  particleColor = colors.blue[400],
  lineCount = 60,
  particleCount = 20,
  speed = 1,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const drift = Math.sin(frame / (fps * 2)) * 10;

  const lines = Array.from({ length: lineCount }, (_, i) => ({
    y: seed(i) * H,
    speed: (8 + seed(i + 100) * 16) * speed,
    length: 80 + seed(i + 200) * 300,
    opacity: (0.1 + seed(i + 300) * 0.2) * opacity,
    thickness: 0.5 + seed(i + 400) * 2,
    offset: seed(i + 500) * W * 2,
  }));

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
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
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <radialGradient id="sl-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.06" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#sl-glow)" />

        {lines.map((line, i) => {
          const x = ((line.offset - frame * line.speed) % (W + line.length * 2)) + line.length;
          const xEnd = x + line.length;
          const y = line.y + drift;

          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={xEnd}
              y2={y}
              stroke={lineColor}
              strokeWidth={line.thickness}
              opacity={line.opacity * fadeIn}
              strokeLinecap="round"
            />
          );
        })}

        {Array.from({ length: particleCount }, (_, i) => {
          const px = ((seed(i + 600) * W * 3 - frame * (12 + seed(i + 700) * 10) * speed) % (W + 40)) + 20;
          const py = seed(i + 800) * H + drift * 0.5;
          const pr = 1 + seed(i + 900) * 2;
          const po = (0.4 + seed(i + 1000) * 0.5) * opacity;

          return (
            <circle
              key={`p-${i}`}
              cx={px}
              cy={py}
              r={pr}
              fill={particleColor}
              opacity={po * fadeIn}
            />
          );
        })}
      </svg>
    </div>
  );
};
