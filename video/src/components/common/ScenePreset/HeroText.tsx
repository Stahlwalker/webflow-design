import { AbsoluteFill } from "remotion";
import { colors } from "../../../config/colors";

type HeroTextProps = {
  children: React.ReactNode;
  background?: React.ReactNode;
  bgColor?: string;
  align?: "center" | "top" | "bottom";
  gap?: number;
  padding?: number;
};

/**
 * HeroText — Centered text layout with optional animated background.
 * Use for title cards, headline scenes, text-only slides.
 */
export const HeroText: React.FC<HeroTextProps> = ({
  children,
  background,
  bgColor = colors.black,
  align = "center",
  gap = 12,
  padding = 80,
}) => {
  const alignItems =
    align === "top"
      ? "flex-start"
      : align === "bottom"
        ? "flex-end"
        : "center";

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      {background}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: alignItems,
          padding: `${align !== "center" ? padding : 0}px ${padding}px`,
          gap,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
