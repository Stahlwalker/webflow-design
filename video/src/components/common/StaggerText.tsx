import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { fontFamily, heading } from "../../config/typography";

type StaggerTextProps = {
  text: string;
  fontSize?: number;
  fontWeight?: string;
  delay?: number;
  color?: string;
  stagger?: "words" | "chars" | "none";
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  offset?: number;
  blur?: boolean;
  blurAmount?: number;
};

const getTransform = (
  direction: "up" | "down" | "left" | "right",
  offset: number,
  progress: number
) => {
  const value = interpolate(progress, [0, 1], [offset, 0]);
  switch (direction) {
    case "up":
      return `translateY(${value}px)`;
    case "down":
      return `translateY(${-value}px)`;
    case "left":
      return `translateX(${value}px)`;
    case "right":
      return `translateX(${-value}px)`;
  }
};

export const StaggerText: React.FC<StaggerTextProps> = ({
  text,
  fontSize = heading.h3.fontSize,
  fontWeight = heading.h3.fontWeight,
  delay = 0,
  color = "#ffffff",
  stagger = "words",
  staggerDelay = 4,
  direction = "up",
  offset = 30,
  blur = true,
  blurAmount = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const baseStyle = {
    fontSize,
    fontWeight,
    color,
    fontFamily: fontFamily.display,
    letterSpacing: heading.h3.letterSpacing,
    lineHeight: heading.h3.lineHeight,
  };

  if (stagger === "none") {
    const progress = spring({
      frame: frame - delay,
      fps,
      config: { damping: 200 },
    });
    const opacity = interpolate(progress, [0, 1], [0, 1]);
    const transform = getTransform(direction, offset, progress);
    const filter = blur
      ? `blur(${interpolate(progress, [0, 1], [blurAmount, 0])}px)`
      : undefined;

    return (
      <div
        style={{
          ...baseStyle,
          opacity,
          transform,
          filter,
        }}
      >
        {text}
      </div>
    );
  }

  const units = stagger === "words" ? text.split(" ") : text.split("");
  const separator = stagger === "words" ? "\u00A0" : "";

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {units.map((unit, i) => {
        const unitDelay = delay + i * staggerDelay;
        const progress = spring({
          frame: frame - unitDelay,
          fps,
          config: { damping: 200 },
        });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const transform = getTransform(direction, offset, progress);
        const filter = blur
          ? `blur(${interpolate(progress, [0, 1], [blurAmount, 0])}px)`
          : undefined;

        return (
          <span
            key={`${unit}-${i}`}
            style={{
              ...baseStyle,
              opacity,
              transform,
              filter,
              display: "inline-block",
            }}
          >
            {unit}
            {separator}
            {stagger === "words" && i < units.length - 1 ? " " : ""}
          </span>
        );
      })}
    </div>
  );
};
