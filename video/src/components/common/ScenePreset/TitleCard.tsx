import { AbsoluteFill } from "remotion";
import { StaggerText } from "../StaggerText";
import { fontFamily, heading, eyebrow as eyebrowToken } from "../../../config/typography";
import { colors } from "../../../config/colors";

type TitleCardProps = {
  eyebrow?: string;
  headline: string;
  subtitle?: string;
  bgColor?: string;
  background?: React.ReactNode;
  color?: string;
  align?: "left" | "center" | "right";
  delay?: number;
};

/**
 * TitleCard — Structured eyebrow + headline + subtitle with built-in animations.
 * More opinionated than HeroText — includes typography and stagger defaults.
 */
export const TitleCard: React.FC<TitleCardProps> = ({
  eyebrow,
  headline,
  subtitle,
  bgColor = colors.black,
  background,
  color = colors.white,
  align = "center",
  delay = 5,
}) => {
  const textAlign = align;
  const alignItems =
    align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      {background}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems,
          justifyContent: "center",
          padding: "0 160px",
          gap: 20,
        }}
      >
        {eyebrow && (
          <div
            style={{
              color: color === colors.white ? colors.gray[400] : colors.gray[600],
              fontFamily: fontFamily.text,
              ...eyebrowToken.md,
              textAlign,
            }}
          >
            {eyebrow}
          </div>
        )}

        <div style={{ textAlign, width: "100%" }}>
          <StaggerText
            text={headline}
            fontSize={heading.h1.fontSize}
            fontWeight={heading.h1.fontWeight}
            color={color}
            stagger="words"
            staggerDelay={5}
            delay={delay}
          />
        </div>

        {subtitle && (
          <div style={{ textAlign, width: "100%" }}>
            <StaggerText
              text={subtitle}
              fontSize={heading.h3.fontSize}
              fontWeight={heading.h3.fontWeight}
              color={color === colors.white ? colors.gray[300] : colors.gray[600]}
              stagger="none"
              delay={delay + 15}
            />
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
