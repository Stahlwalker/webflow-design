import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors } from "../../../config/colors";

type StackedCardsProps = {
  cards: React.ReactNode[];
  bgColor?: string;
  background?: React.ReactNode;
  gap?: number;
  staggerDelay?: number;
  columns?: 1 | 2 | 3;
  padding?: number;
};

/**
 * StackedCards — Content cards with staggered entrance animation.
 * For feature lists, comparison slides, stats/metrics displays.
 */
export const StackedCards: React.FC<StackedCardsProps> = ({
  cards,
  bgColor = colors.black,
  background,
  gap = 24,
  staggerDelay = 8,
  columns = 1,
  padding = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
            alignItems: "stretch",
          }}
        >
          {cards.map((card, i) => {
            const progress = spring({
              frame: frame - 10 - i * staggerDelay,
              fps,
              config: { damping: 200 },
            });
            const opacity = interpolate(progress, [0, 1], [0, 1]);
            const translateY = interpolate(progress, [0, 1], [30, 0]);

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateY(${translateY}px)`,
                }}
              >
                {card}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
