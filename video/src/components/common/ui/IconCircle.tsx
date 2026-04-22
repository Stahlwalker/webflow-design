import {
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors } from "../../../config/colors";

type IconCircleProps = {
  icon?: string;
  emoji?: string;
  color?: string;
  size?: number;
  entrance?: boolean;
  delay?: number;
};

/**
 * IconCircle — Circular icon container with optional entrance animation.
 * For feature cards, agent avatars, tool icons.
 */
export const IconCircle: React.FC<IconCircleProps> = ({
  icon,
  emoji,
  color = colors.blue[500],
  size = 64,
  entrance = true,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = entrance
    ? spring({ frame: frame - delay, fps, config: { damping: 200 } })
    : 1;
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.7, 1]);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale})`,
        flexShrink: 0,
      }}
    >
      {icon && (
        <Img
          src={staticFile(icon)}
          style={{ width: size * 0.55, height: size * 0.55, objectFit: "contain" }}
        />
      )}
      {emoji && !icon && (
        <span style={{ fontSize: size * 0.45 }}>{emoji}</span>
      )}
    </div>
  );
};
