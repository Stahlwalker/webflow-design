import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { fontFamily, heading, body } from "../../../config/typography";
import { colors } from "../../../config/colors";

type Feature = {
  icon?: string;
  title: string;
  description: string;
};

type FeatureShowcaseProps = {
  features: Feature[];
  bgColor?: string;
  background?: React.ReactNode;
  columns?: 1 | 2 | 3;
  gap?: number;
  staggerDelay?: number;
  color?: string;
  padding?: number;
};

/**
 * FeatureShowcase — Feature cards in a grid with staggered entrance.
 * For feature overviews, capability highlights.
 */
export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  features,
  bgColor = colors.black,
  background,
  columns = 3,
  gap = 40,
  staggerDelay = 6,
  color = colors.white,
  padding = 100,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isDark = color === colors.white;

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      {background}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap,
            width: "100%",
          }}
        >
          {features.map((feature, i) => {
            const progress = spring({
              frame: frame - 10 - i * staggerDelay,
              fps,
              config: { damping: 200 },
            });
            const opacity = interpolate(progress, [0, 1], [0, 1]);
            const translateY = interpolate(progress, [0, 1], [25, 0]);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  padding: 32,
                  borderRadius: 16,
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                  opacity,
                  transform: `translateY(${translateY}px)`,
                }}
              >
                {feature.icon && (
                  <span style={{ fontSize: 36, color }}>{feature.icon}</span>
                )}
                <span
                  style={{
                    color,
                    fontFamily: fontFamily.display,
                    ...heading.h4,
                  }}
                >
                  {feature.title}
                </span>
                <span
                  style={{
                    color: isDark ? colors.gray[400] : colors.gray[600],
                    fontFamily: fontFamily.text,
                    ...body.md,
                  }}
                >
                  {feature.description}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
