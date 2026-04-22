import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Img } from "remotion";
import { StaggerText } from "../../../components/common/StaggerText";
import { GridBackground } from "../../../components/common/bgs/GridBackground";
import { colors } from "../../../config/colors";
import { fontFamily, eyebrow as eyebrowToken, heading } from "../../../config/typography";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoP = spring({ frame, fps, config: { damping: 160 } });
  const eyebrowP = spring({ frame: frame - 8, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <GridBackground dotColor={colors.blue[500]} opacity={0.2} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {/* Webflow mark */}
        <div
          style={{
            opacity: interpolate(logoP, [0, 1], [0, 1]),
            transform: `scale(${interpolate(logoP, [0, 1], [0.7, 1])})`,
          }}
        >
          <Img
            src={staticFile("logos/Mark_Logo_Blue.png")}
            style={{ width: 96, height: 96, objectFit: "contain" }}
          />
        </div>

        {/* Eyebrow */}
        <div
          style={{
            opacity: eyebrowP,
            transform: `translateY(${14 * (1 - eyebrowP)}px)`,
          }}
        >
          <span style={{ ...eyebrowToken.lg, fontFamily: fontFamily.text, color: colors.blue[400], fontSize: 18, letterSpacing: "0.14em" }}>
            DEVELOPER PLATFORM
          </span>
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center", maxWidth: 900 }}>
          <StaggerText
            text="Faster builds, fewer tickets"
            fontSize={heading.h1.fontSize}
            fontWeight={heading.h1.fontWeight}
            color={colors.white}
            stagger="words"
            staggerDelay={5}
            delay={14}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
