import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { fontFamily, body } from "../../../config/typography";

type CaptionPillProps = {
  text: string;
  delay?: number;
  position?: "bottom" | "top" | "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  offset?: number;
  variant?: "dark" | "light";
  textColor?: string;
  bgOpacity?: number;
  blurAmount?: number;
  fontSize?: number;
  entrance?: "slide-up" | "slide-down" | "fade";
};

/**
 * CaptionPill — Frosted glass pill with text, typically overlaid on video.
 * Supports dark/light variants, configurable position and entrance animation.
 */
export const CaptionPill: React.FC<CaptionPillProps> = ({
  text,
  delay = 15,
  position = "bottom",
  offset = 50,
  variant = "dark",
  textColor,
  bgOpacity = 0.45,
  blurAmount = 20,
  fontSize,
  entrance = "slide-up",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const entranceY =
    entrance === "slide-up"
      ? interpolate(progress, [0, 1], [40, 0])
      : entrance === "slide-down"
        ? interpolate(progress, [0, 1], [-40, 0])
        : 0;

  const isDark = variant === "dark";
  const resolvedTextColor = textColor ?? (isDark ? "#fff" : "#1a1a1a");
  const pillBg = isDark
    ? `rgba(0, 0, 0, ${bgOpacity})`
    : `rgba(255, 255, 255, ${bgOpacity})`;
  const borderColor = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.08)";

  const positionMap: Record<string, React.CSSProperties> = {
    bottom: { bottom: offset, left: 0, right: 0 },
    top: { top: offset, left: 0, right: 0 },
    center: { top: 0, bottom: 0, left: 0, right: 0 },
    "top-left": { top: offset, left: offset },
    "top-right": { top: offset, right: offset },
    "bottom-left": { bottom: offset, left: offset },
    "bottom-right": { bottom: offset, right: offset },
  };
  const positionStyle = positionMap[position];

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyle,
        display: "flex",
        justifyContent: position.includes("left") ? "flex-start" : position.includes("right") ? "flex-end" : "center",
        alignItems: position === "center" ? "center" : undefined,
        opacity,
        transform: `translateY(${entranceY}px)`,
        zIndex: 1,
      }}
    >
      <div
        style={{
          background: pillBg,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          borderRadius: 100,
          padding: "14px 36px",
          border: `1px solid ${borderColor}`,
        }}
      >
        <span
          style={{
            color: resolvedTextColor,
            fontFamily: fontFamily.text,
            ...(fontSize ? { ...body.xxl, fontSize } : body.xxl),
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
