import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { colors } from "../../../config/colors";

const W = 1920;
const H = 1080;

type GridBackgroundProps = {
  bgColor?: string;
  dotColor?: string;
  gridSpacing?: number;
  dotSize?: number;
  ringCount?: number;
  ringSpeed?: number;
  ringWidth?: number;
  ringGap?: number;
  originX?: number;
  originY?: number;
  opacity?: number;
};

/**
 * GridBackground — Dot grid with concentric ring waves from a point.
 * Brand-aligned: monochromatic blue, build-principle.
 */
export const GridBackground: React.FC<GridBackgroundProps> = ({
  bgColor = colors.black,
  dotColor = colors.blue[500],
  gridSpacing = 40,
  dotSize = 2.5,
  ringCount = 4,
  ringSpeed = 36,
  ringWidth = 400,
  ringGap = 350,
  originX = W,
  originY = H,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const colCount = Math.ceil(W / gridSpacing) + 1;
  const rowCount = Math.ceil(H / gridSpacing) + 1;
  const maxDist = Math.sqrt(W * W + H * H);

  const breathe = Math.sin(frame / (fps * 1.5)) * 0.008 + 1;

  const dots: React.JSX.Element[] = [];

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const x = col * gridSpacing;
      const y = row * gridSpacing;
      const dist = Math.sqrt((x - originX) ** 2 + (y - originY) ** 2);
      const normDist = dist / maxDist;

      const radialOpacity = interpolate(
        normDist,
        [0, 0.4, 0.85, 1],
        [0.3, 0.2, 0.1, 0.05],
        { extrapolateRight: "clamp" }
      );

      let ringGlow = 0;
      for (let r = 0; r < ringCount; r++) {
        const ringPos = (frame + 30) * ringSpeed - r * ringGap;
        const delta = Math.abs(dist - ringPos);
        if (delta < ringWidth / 2) {
          const glow = Math.cos((delta / (ringWidth / 2)) * Math.PI * 0.5);
          ringGlow = Math.max(ringGlow, glow * glow);
        }
      }

      const dotOpacity = (radialOpacity + ringGlow * 0.6) * opacity;
      const radius = dotSize + ringGlow * (dotSize * 0.6);

      dots.push(
        <circle
          key={row * colCount + col}
          cx={x}
          cy={y}
          r={radius}
          fill={dotColor}
          opacity={Math.min(dotOpacity, 1)}
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
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{
          transform: `scale(${breathe})`,
          transformOrigin: `${originX}px ${originY}px`,
        }}
      >
        {dots}
      </svg>
    </div>
  );
};
