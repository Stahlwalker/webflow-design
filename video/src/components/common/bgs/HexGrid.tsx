import {
  useCurrentFrame,
} from "remotion";
import { colors } from "../../../config/colors";

const W = 1920;
const H = 1080;

type HexGridProps = {
  size?: number;
  gap?: number;
  speed?: number;
  rippleCount?: number;
  rippleWidth?: number;
  rippleGap?: number;
  bgColor?: string;
  strokeColor?: string;
  strokeColorBright?: string;
  strokeColorDim?: string;
};

/**
 * HexGrid — Honeycomb grid with continuous water-ripple waves from center.
 * Brand-aligned: build principle, elevated tier, monochromatic blue.
 */
export const HexGrid: React.FC<HexGridProps> = ({
  size = 40,
  gap = 4,
  speed = 8,
  rippleCount = 5,
  rippleWidth = 200,
  rippleGap = 180,
  bgColor = colors.black,
  strokeColor = colors.blue[500],
  strokeColorBright = colors.blue[400],
  strokeColorDim = colors.blue[600],
}) => {
  const frame = useCurrentFrame();

  const cx = W / 2;
  const cy = H / 2;

  const colWidth = (size + gap) * 1.5;
  const rowHeight = (size + gap) * Math.sqrt(3);
  const cols = Math.ceil(W / colWidth) + 2;
  const rows = Math.ceil(H / (rowHeight / 2)) + 2;

  const hexPath = (s: number) => {
    const points = [];
    for (let a = 0; a < 6; a++) {
      const angle = (Math.PI / 3) * a;
      points.push(
        `${Math.cos(angle) * s},${Math.sin(angle) * s}`
      );
    }
    return `M${points.join("L")}Z`;
  };

  const hexes: React.JSX.Element[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isOffset = row % 2 === 1;
      const x = col * colWidth + (isOffset ? colWidth / 2 : 0);
      const y = row * (rowHeight / 2);

      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

      // Multiple ripple rings expanding from center
      let rippleGlow = 0;
      for (let r = 0; r < rippleCount; r++) {
        const ringPos = frame * speed - r * rippleGap;
        const delta = Math.abs(dist - ringPos);
        if (delta < rippleWidth / 2) {
          const glow =
            Math.cos((delta / (rippleWidth / 2)) * Math.PI * 0.5) ** 2;
          rippleGlow = Math.max(rippleGlow, glow);
        }
      }

      // Base visibility + ripple boost
      const baseOpacity = 0.08;
      const opacity = baseOpacity + rippleGlow * 0.55;
      const hexScale = size * 0.45 * (0.7 + rippleGlow * 0.3);

      // Slight Y displacement for water feel
      const displaceY = rippleGlow * Math.sin(dist * 0.03 + frame * 0.1) * 3;

      hexes.push(
        <path
          key={`${row}-${col}`}
          d={hexPath(hexScale)}
          transform={`translate(${x}, ${y + displaceY})`}
          fill="none"
          stroke={
            rippleGlow > 0.5
              ? strokeColorBright
              : rippleGlow > 0.2
                ? strokeColor
                : strokeColorDim
          }
          strokeWidth={1 + rippleGlow * 1}
          opacity={opacity}
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
        {hexes}
      </svg>
    </div>
  );
};
