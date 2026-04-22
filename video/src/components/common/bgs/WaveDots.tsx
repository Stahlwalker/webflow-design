import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { colors } from "../../../config/colors";

const W = 1920;
const H = 1080;

type WaveDotsProps = {
  bgColor?: string;
  dotColor?: string;
  cols?: number;
  rows?: number;
  speed?: number;
  opacity?: number;
  dotSize?: number;
  waveAmplitude?: number;
};

/**
 * WaveDots — Uniform dot grid with flowing sine-wave distortion.
 * Brand-aligned: monochromatic, organic motion.
 */
export const WaveDots: React.FC<WaveDotsProps> = ({
  bgColor = colors.blue[100],
  dotColor = colors.blue[300],
  cols = 60,
  rows = 30,
  speed = 1,
  opacity = 1,
  dotSize = 3,
  waveAmplitude = 1,
}) => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const spacingX = W / (cols - 1);
  const spacingY = H / (rows - 1);

  const dots: React.JSX.Element[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const baseX = col * spacingX;
      const baseY = row * spacingY;

      const wave1 = Math.sin((col + row) * 0.3 + frame * 0.15 * speed) * 8 * waveAmplitude;
      const wave2 = Math.sin((col - row) * 0.2 + frame * 0.12 * speed) * 5 * waveAmplitude;
      const wave3 = Math.cos(col * 0.15 + frame * 0.1 * speed) * 4 * waveAmplitude;

      const offsetY = wave1 + wave2;
      const offsetX = wave3;

      const sizeWave = Math.sin((col + row) * 0.3 + frame * 0.15 * speed);
      const radius = interpolate(sizeWave, [-1, 1], [dotSize * 0.5, dotSize * 1.5]);

      const opacityWave = (sizeWave + 1) / 2;
      const dotOpacity = interpolate(opacityWave, [0, 1], [0.08, 0.5]) * opacity;

      dots.push(
        <circle
          key={row * cols + col}
          cx={baseX + offsetX}
          cy={baseY + offsetY}
          r={radius}
          fill={dotColor}
          opacity={dotOpacity}
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
