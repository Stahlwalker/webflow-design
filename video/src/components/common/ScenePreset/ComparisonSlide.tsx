import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { fontFamily, eyebrow } from "../../../config/typography";
import { colors } from "../../../config/colors";

type ComparisonSlideProps = {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  bgColor?: string;
  background?: React.ReactNode;
  dividerColor?: string;
  padding?: number;
};

/**
 * ComparisonSlide — Before/after side-by-side with animated divider.
 * For showing improvements, old vs new, speed comparisons.
 */
export const ComparisonSlide: React.FC<ComparisonSlideProps> = ({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  bgColor = colors.black,
  background,
  dividerColor = colors.blue[500],
  padding = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beforeProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 200 },
  });
  const afterProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
  });
  const dividerProgress = spring({
    frame: frame - 12,
    fps,
    config: { damping: 200 },
  });

  const beforeOpacity = interpolate(beforeProgress, [0, 1], [0, 1]);
  const afterOpacity = interpolate(afterProgress, [0, 1], [0, 1]);
  const dividerScale = interpolate(dividerProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      {background}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: `80px ${padding}px`,
          gap: 0,
        }}
      >
        {/* Before side */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            opacity: beforeOpacity,
          }}
        >
          <span
            style={{
              color: colors.gray[400],
              fontFamily: fontFamily.text,
              ...eyebrow.md,
            }}
          >
            {beforeLabel}
          </span>
          {before}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 2,
            height: `${dividerScale * 80}%`,
            background: dividerColor,
            opacity: 0.5,
            borderRadius: 1,
            margin: "0 40px",
          }}
        />

        {/* After side */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            opacity: afterOpacity,
          }}
        >
          <span
            style={{
              color: colors.gray[400],
              fontFamily: fontFamily.text,
              ...eyebrow.md,
            }}
          >
            {afterLabel}
          </span>
          {after}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
