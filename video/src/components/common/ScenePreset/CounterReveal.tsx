import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { fontFamily, heading, body } from "../../../config/typography";
import { colors } from "../../../config/colors";

type CounterRevealProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  bgColor?: string;
  background?: React.ReactNode;
  duration?: number;
  delay?: number;
  color?: string;
  labelColor?: string;
};

/**
 * CounterReveal — Animated number counting from 0 to target.
 * For stats, metrics, performance numbers.
 */
export const CounterReveal: React.FC<CounterRevealProps> = ({
  value,
  prefix = "",
  suffix = "",
  label,
  bgColor = colors.black,
  background,
  duration = 30,
  delay = 10,
  color = colors.white,
  labelColor = colors.gray[400],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: duration,
  });

  const currentValue = Math.round(interpolate(progress, [0, 1], [0, value]));
  const opacity = interpolate(progress, [0, 0.1, 1], [0, 1, 1]);
  const scale = interpolate(progress, [0, 1], [0.9, 1]);

  const labelProgress = spring({
    frame: frame - delay - 10,
    fps,
    config: { damping: 200 },
  });
  const labelOpacity = interpolate(labelProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      {background}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            color,
            fontFamily: fontFamily.display,
            fontSize: heading.h0.fontSize,
            fontWeight: heading.h0.fontWeight,
            letterSpacing: heading.h0.letterSpacing,
            opacity,
            transform: `scale(${scale})`,
          }}
        >
          {prefix}{currentValue}{suffix}
        </div>

        {label && (
          <div
            style={{
              color: labelColor,
              fontFamily: fontFamily.text,
              ...body.xl,
              opacity: labelOpacity,
            }}
          >
            {label}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
