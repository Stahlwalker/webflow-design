import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { fontFamily, body } from "../../../config/typography";
import { colors } from "../../../config/colors";

type ProgressBarProps = {
  progress?: number;
  duration?: number;
  delay?: number;
  color?: string;
  variant?: "dark" | "light";
  label?: string;
  showPercent?: boolean;
  height?: number;
  width?: number | string;
};

/**
 * ProgressBar — Animated progress/loading bar.
 * For build progress, deployment, timed processes.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 100,
  duration = 30,
  delay = 5,
  color = colors.blue[500],
  variant = "dark",
  label,
  showPercent = true,
  height = 8,
  width = 500,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isDark = variant === "dark";

  const animProgress = interpolate(
    frame,
    [delay, delay + duration],
    [0, progress],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div style={{ width, opacity }}>
      {(label || showPercent) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            fontFamily: fontFamily.text,
            ...body.sm,
            color: isDark ? colors.gray[400] : colors.gray[600],
          }}
        >
          <span>{label}</span>
          {showPercent && <span>{Math.round(animProgress)}%</span>}
        </div>
      )}
      <div
        style={{
          width: "100%",
          height,
          borderRadius: height / 2,
          background: isDark ? colors.gray[800] : colors.gray[200],
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${animProgress}%`,
            height: "100%",
            borderRadius: height / 2,
            background: color,
          }}
        />
      </div>
    </div>
  );
};
