import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { fontFamily, caption } from "../../../config/typography";
import { colors } from "../../../config/colors";

type Logo = {
  src: string;
  name?: string;
};

type LogoGridProps = {
  logos: Logo[];
  bgColor?: string;
  background?: React.ReactNode;
  columns?: 3 | 4 | 5 | 6;
  gap?: number;
  logoSize?: number;
  staggerDelay?: number;
  showNames?: boolean;
  padding?: number;
};

/**
 * LogoGrid — Grid of logos/icons with staggered entrance.
 * For partner logos, integration icons, tool ecosystem.
 */
export const LogoGrid: React.FC<LogoGridProps> = ({
  logos,
  bgColor = colors.black,
  background,
  columns = 4,
  gap = 48,
  logoSize = 80,
  staggerDelay = 4,
  showNames = false,
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
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          {logos.map((logo, i) => {
            const progress = spring({
              frame: frame - 10 - i * staggerDelay,
              fps,
              config: { damping: 200 },
            });
            const opacity = interpolate(progress, [0, 1], [0, 1]);
            const scale = interpolate(progress, [0, 1], [0.7, 1]);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  opacity,
                  transform: `scale(${scale})`,
                }}
              >
                <Img
                  src={staticFile(logo.src)}
                  style={{
                    width: logoSize,
                    height: logoSize,
                    objectFit: "contain",
                  }}
                />
                {showNames && logo.name && (
                  <span
                    style={{
                      color: colors.gray[400],
                      fontFamily: fontFamily.text,
                      ...caption.md,
                    }}
                  >
                    {logo.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
