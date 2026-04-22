import { useCurrentFrame, useVideoConfig } from "remotion";

type ThinkingDotsProps = {
  dotColor?: string;
  dotColorInactive?: string;
  dotSize?: number;
  gap?: number;
  speed?: number;
  dotCount?: number;
};

/**
 * ThinkingDots — Cycling dot animation for loading/thinking states.
 */
export const ThinkingDots: React.FC<ThinkingDotsProps> = ({
  dotColor = "rgba(255,255,255,0.7)",
  dotColorInactive = "rgba(255,255,255,0.2)",
  dotSize = 8,
  gap = 6,
  speed = 6,
  dotCount = 3,
}) => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const activeDots = (Math.floor(frame / speed) % (dotCount + 1));

  return (
    <div style={{ display: "flex", gap, padding: "12px 0" }}>
      {Array.from({ length: dotCount }, (_, i) => (
        <div
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: i < activeDots ? dotColor : dotColorInactive,
          }}
        />
      ))}
    </div>
  );
};
