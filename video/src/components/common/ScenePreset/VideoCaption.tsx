import { AbsoluteFill, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { CaptionPill } from "../ui/CaptionPill";
import { colors } from "../../../config/colors";

type VideoCaptionProps = {
  videoSrc: string;
  caption: string;
  captionPosition?: React.ComponentProps<typeof CaptionPill>["position"];
  captionVariant?: "dark" | "light";
  captionDelay?: number;
  captionFontSize?: number;
  children?: React.ReactNode;
  muted?: boolean;
  bgColor?: string;
};

/**
 * VideoCaption — Full-screen video with frosted caption pill overlay.
 * Use for demo clips, screen recordings, product walkthroughs.
 */
export const VideoCaption: React.FC<VideoCaptionProps> = ({
  videoSrc,
  caption,
  captionPosition = "bottom",
  captionVariant = "dark",
  captionDelay = 15,
  captionFontSize,
  children,
  muted = true,
  bgColor = colors.black,
}) => {
  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <Video
        src={staticFile(videoSrc)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        muted={muted}
      />
      {children}
      <CaptionPill
        text={caption}
        position={captionPosition}
        variant={captionVariant}
        delay={captionDelay}
        fontSize={captionFontSize}
      />
    </AbsoluteFill>
  );
};
