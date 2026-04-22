import {
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { Video } from "@remotion/media";
import { colors } from "../../../config/colors";

type VideoPreviewBoxProps = {
  src: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  entranceDelay?: number;
  muted?: boolean;
  variant?: "dark" | "light";
  shadow?: boolean;
};

/**
 * VideoPreviewBox — Styled video container with spring entrance animation.
 * For embedding video clips inside scenes with consistent styling.
 */
export const VideoPreviewBox: React.FC<VideoPreviewBoxProps> = ({
  src,
  width = 700,
  height = 500,
  borderRadius = 20,
  entranceDelay = 15,
  muted = true,
  variant = "dark",
  shadow = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - entranceDelay,
    fps,
    config: { damping: 200 },
  });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.9, 1]);

  const isDark = variant === "dark";

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width,
          height,
          borderRadius,
          overflow: "hidden",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          boxShadow: shadow
            ? isDark
              ? "0 8px 40px rgba(0, 0, 0, 0.5)"
              : "0 8px 40px rgba(0, 0, 0, 0.15)"
            : undefined,
          background: isDark ? colors.gray[900] : colors.white,
        }}
      >
        <Video
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          muted={muted}
        />
      </div>
    </div>
  );
};
