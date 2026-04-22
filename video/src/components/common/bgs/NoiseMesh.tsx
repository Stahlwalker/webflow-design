import {
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../../../config/colors";

const W = 1920;
const H = 1080;

const seed = (x: number, y: number) => {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

type NoiseMeshProps = {
  cols?: number;
  rows?: number;
  speed?: number;
  bgColor?: string;
  colorLight?: string;
  colorMid?: string;
  colorDark?: string;
  opacity?: number;
};

/**
 * NoiseMesh — Animated mesh of shifting colored cells.
 * Brand-aligned: elevated tier, monochromatic, subtle motion.
 */
export const NoiseMesh: React.FC<NoiseMeshProps> = ({
  cols = 24,
  rows = 14,
  speed = 1,
  bgColor = colors.black,
  colorLight = colors.blue[500],
  colorMid = colors.blue[600],
  colorDark = colors.blue[700],
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const cellW = W / cols;
  const cellH = H / rows;

  const cells: React.JSX.Element[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellW;
      const y = row * cellH;

      const n1 = Math.sin(col * 0.5 + frame * 0.04 * speed) * 0.5 + 0.5;
      const n2 = Math.cos(row * 0.4 + frame * 0.03 * speed) * 0.5 + 0.5;
      const n3 = seed(col + Math.floor(frame * 0.02 * speed), row) * 0.3;
      const noise = (n1 + n2 + n3) / 3;

      const cellOpacity = noise * 0.35 * opacity;

      const cellColor = noise > 0.6
        ? colorLight
        : noise > 0.35
          ? colorMid
          : colorDark;

      cells.push(
        <rect
          key={`${row}-${col}`}
          x={x}
          y={y}
          width={cellW + 1}
          height={cellH + 1}
          fill={cellColor}
          opacity={cellOpacity}
        />
      );
    }
  }

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
        {cells}
      </svg>
    </div>
  );
};
