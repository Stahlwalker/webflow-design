import {
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { colors } from "../../../config/colors";

const W = 1920;
const H = 1080;

type RippleGridProps = {
  direction?: "ltr" | "rtl" | "ttb" | "btt";
  bgColor?: string;
  dotColor?: string;
  speed?: number;
  opacity?: number;
  waveCount?: number;
  waveWidth?: number;
  waveGap?: number;
  dotSize?: number;
  cols?: number;
  rows?: number;
};

/**
 * RippleGrid — Dot grid with wave lines sweeping in a configurable direction.
 * Brand-aligned: monochromatic blue, build-principle reveal.
 */
export const PerspectiveGrid: React.FC<RippleGridProps> = ({
  direction = "ltr",
  bgColor = colors.black,
  dotColor = colors.blue[500],
  speed = 10,
  opacity = 1,
  waveCount = 3,
  waveWidth = 300,
  waveGap = 250,
  dotSize = 2,
  cols = 48,
  rows = 27,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spacingX = W / cols;
  const spacingY = H / rows;

  const fadeIn = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const getWaveAxis = (x: number, y: number) => {
    switch (direction) {
      case "ltr":
        return x;
      case "rtl":
        return W - x;
      case "ttb":
        return y;
      case "btt":
        return H - y;
    }
  };

  const dots: React.JSX.Element[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * spacingX + spacingX / 2;
      const y = row * spacingY + spacingY / 2;

      const axis = getWaveAxis(x, y);
      let waveGlow = 0;

      for (let w = 0; w < waveCount; w++) {
        const wavePos = frame * speed - w * waveGap;
        const delta = Math.abs(axis - wavePos);
        if (delta < waveWidth / 2) {
          const glow =
            Math.cos((delta / (waveWidth / 2)) * Math.PI * 0.5) ** 2;
          waveGlow = Math.max(waveGlow, glow);
        }
      }

      const baseOpacity = 0.1 * opacity;
      const dotOpacity = fadeIn * (baseOpacity + waveGlow * 0.7 * opacity);
      const radius = dotSize + waveGlow * (dotSize * 1.5);

      dots.push(
        <circle
          key={row * cols + col}
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
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {dots}
      </svg>
    </div>
  );
};
