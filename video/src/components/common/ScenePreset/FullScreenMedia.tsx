import { AbsoluteFill, Img, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { colors } from "../../../config/colors";

type FullScreenMediaProps = {
  src: string;
  type?: "video" | "image";
  overlay?: React.ReactNode;
  gradient?: boolean;
  gradientDirection?: "top" | "bottom";
  children?: React.ReactNode;
  muted?: boolean;
  bgColor?: string;
};

/**
 * FullScreenMedia — Full-bleed video or image with optional overlay, gradient, and children.
 * More flexible than VideoCaption — no caption required.
 */
export const FullScreenMedia: React.FC<FullScreenMediaProps> = ({
  src,
  type = "video",
  overlay,
  gradient = false,
  gradientDirection = "bottom",
  children,
  muted = true,
  bgColor = colors.black,
}) => {
  const gradientStyle =
    gradientDirection === "bottom"
      ? "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.02) 20%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.8) 100%)"
      : "linear-gradient(rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.55) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.02) 80%, rgba(0,0,0,0) 100%)";

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      {type === "video" ? (
        <Video
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          muted={muted}
        />
      ) : (
        <Img
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {gradient && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: gradientStyle,
            pointerEvents: "none",
          }}
        />
      )}

      {overlay}
      {children}
    </AbsoluteFill>
  );
};
