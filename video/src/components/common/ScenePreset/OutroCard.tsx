import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { fontFamily, heading, body } from "../../../config/typography";
import { colors } from "../../../config/colors";

type OutroCardProps = {
  logoSrc?: string;
  logoWidth?: number;
  title?: string;
  subtitle?: string;
  link?: string;
  bgColor?: string;
  children?: React.ReactNode;
  delay?: number;
};

/**
 * OutroCard — Logo + title + optional link with staggered fade-in.
 * Use for video endings, CTA screens, branding cards.
 */
export const OutroCard: React.FC<OutroCardProps> = ({
  logoSrc,
  logoWidth = 80,
  title,
  subtitle,
  link,
  bgColor = colors.black,
  children,
  delay = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoScale = interpolate(logoProgress, [0, 1], [0.85, 1]);
  const logoBlur = interpolate(logoProgress, [0, 1], [10, 0]);

  const titleOpacity = interpolate(
    frame,
    [delay + 10, delay + Math.round(0.8 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );

  const subtitleOpacity = interpolate(
    frame,
    [delay + Math.round(0.8 * fps), delay + Math.round(1.5 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );

  const linkOpacity = interpolate(
    frame,
    [delay + Math.round(1.2 * fps), delay + Math.round(1.8 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );

  return (
    <AbsoluteFill
      style={{
        background: bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
      }}
    >
      {logoSrc && (
        <Img
          src={staticFile(logoSrc)}
          style={{
            width: logoWidth,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            filter: `blur(${logoBlur}px)`,
          }}
        />
      )}

      {title && (
        <div
          style={{
            opacity: titleOpacity,
            color: colors.white,
            fontFamily: fontFamily.display,
            ...heading.h4,
          }}
        >
          {title}
        </div>
      )}

      {subtitle && (
        <div
          style={{
            opacity: subtitleOpacity,
            color: colors.gray[400],
            fontFamily: fontFamily.text,
            ...body.xl,
          }}
        >
          {subtitle}
        </div>
      )}

      {link && (
        <div
          style={{
            opacity: linkOpacity,
            color: colors.blue[400],
            fontFamily: fontFamily.text,
            ...body.xl,
          }}
        >
          {link}
        </div>
      )}

      {children}
    </AbsoluteFill>
  );
};
