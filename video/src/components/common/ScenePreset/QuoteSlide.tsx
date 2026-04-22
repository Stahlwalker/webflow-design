import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { fontFamily, heading, body } from "../../../config/typography";
import { colors } from "../../../config/colors";

type QuoteSlideProps = {
  quote: string;
  attribution?: string;
  bgColor?: string;
  background?: React.ReactNode;
  quoteColor?: string;
  attributionColor?: string;
  delay?: number;
  padding?: number;
};

/**
 * QuoteSlide — Large centered quote with attribution.
 * For testimonials, pull quotes, key messaging.
 */
export const QuoteSlide: React.FC<QuoteSlideProps> = ({
  quote,
  attribution,
  bgColor = colors.black,
  background,
  quoteColor = colors.white,
  attributionColor = colors.gray[400],
  delay = 10,
  padding = 200,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const quoteProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });
  const quoteOpacity = interpolate(quoteProgress, [0, 1], [0, 1]);
  const quoteY = interpolate(quoteProgress, [0, 1], [30, 0]);
  const quoteBlur = interpolate(quoteProgress, [0, 1], [10, 0]);

  const attrProgress = spring({
    frame: frame - delay - 15,
    fps,
    config: { damping: 200 },
  });
  const attrOpacity = interpolate(attrProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      {background}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `0 ${padding}px`,
          gap: 32,
        }}
      >
        <div
          style={{
            color: quoteColor,
            fontFamily: fontFamily.display,
            ...heading.h2,
            textAlign: "center",
            opacity: quoteOpacity,
            transform: `translateY(${quoteY}px)`,
            filter: `blur(${quoteBlur}px)`,
          }}
        >
          &ldquo;{quote}&rdquo;
        </div>

        {attribution && (
          <div
            style={{
              color: attributionColor,
              fontFamily: fontFamily.text,
              ...body.xl,
              opacity: attrOpacity,
            }}
          >
            {attribution}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
