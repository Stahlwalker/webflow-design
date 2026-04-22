import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
  Img,
} from "remotion";
import { colors } from "../../../config/colors";
import { fontFamily, eyebrow as eyebrowToken } from "../../../config/typography";

// Phase timing (out of 270 frames / 9s)
const P1_IN   = 0;
const P1_OUT  = 95;
const P2_IN   = 82;
const P2_OUT  = 185;
const P3_IN   = 172;

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Scene2Cloud: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase opacities
  const p1Opacity = interpolate(frame, [P1_IN, P1_IN + 8, P1_OUT - 8, P1_OUT], [0, 1, 1, 0], CLAMP);
  const p2Opacity = interpolate(frame, [P2_IN, P2_IN + 12, P2_OUT - 8, P2_OUT], [0, 1, 1, 0], CLAMP);
  const p3Opacity = interpolate(frame, [P3_IN, P3_IN + 12, 270], [0, 1, 1], CLAMP);

  // Phase 1 — code editor: zoomed into code, slow pan right
  const p1Scale = interpolate(frame, [0, 90], [1.9, 2.1], CLAMP);
  const p1X     = interpolate(frame, [0, 90], [-8, -4], CLAMP);
  const p1Y     = interpolate(frame, [0, 90], [-5, -3], CLAMP);

  // Phase 2 — build log: zoomed into the projects table, slow drift up
  const p2Scale = interpolate(frame, [P2_IN, P2_OUT], [2.4, 2.3], CLAMP);
  const p2X     = interpolate(frame, [P2_IN, P2_OUT], [2, 0], CLAMP);
  const p2Y     = interpolate(frame, [P2_IN, P2_OUT], [8, 4], CLAMP);

  // Phase 3 — deploy: spring zoom-out from close-up to full reveal
  const deployReveal = spring({ frame: frame - P3_IN, fps, config: { damping: 130, mass: 1.2 } });
  const p3Scale = interpolate(deployReveal, [0, 1], [2.2, 1.0]);
  const p3Y     = interpolate(deployReveal, [0, 1], [-15, 0]);

  // Step label
  const stepLabel =
    frame < P2_IN ? "CODE" :
    frame < P3_IN ? "BUILD" :
    "DEPLOY";

  const labelKey = stepLabel;
  const labelP = spring({
    frame: frame - (frame < P2_IN ? 0 : frame < P3_IN ? P2_IN : P3_IN),
    fps,
    config: { damping: 200 },
  });

  // Progress dots
  const dotActive = frame < P2_IN ? 0 : frame < P3_IN ? 1 : 2;

  const eyebrowP = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>

      {/* Phase 1 — Code editor */}
      <AbsoluteFill style={{ opacity: p1Opacity }}>
        <Img
          src={staticFile("product/cloud/cloud-editor.png")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${p1Scale}) translate(${p1X}%, ${p1Y}%)`,
            transformOrigin: "center center",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }} />
      </AbsoluteFill>

      {/* Phase 2 — Build log (projects) */}
      <AbsoluteFill style={{ opacity: p2Opacity }}>
        <Img
          src={staticFile("product/cloud/Webflow Cloud Projects.png")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${p2Scale}) translate(${p2X}%, ${p2Y}%)`,
            transformOrigin: "center center",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }} />
      </AbsoluteFill>

      {/* Phase 3 — Deploy (zoom out reveal) */}
      <AbsoluteFill style={{ opacity: p3Opacity }}>
        <Img
          src={staticFile("product/cloud/devlink_export-webflow.png")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${p3Scale}) translateY(${p3Y}%)`,
            transformOrigin: "center center",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }} />
      </AbsoluteFill>

      {/* Eyebrow — top */}
      <div style={{
        position: "absolute",
        top: 60,
        left: 80,
        opacity: eyebrowP,
        transform: `translateY(${10 * (1 - eyebrowP)}px)`,
        zIndex: 10,
      }}>
        <span style={{ ...eyebrowToken.lg, fontFamily: fontFamily.text, color: colors.blue[400] }}>
          WEBFLOW CLOUD
        </span>
      </div>

      {/* Step label — bottom left */}
      <div style={{
        position: "absolute",
        bottom: 60,
        left: 80,
        zIndex: 10,
        opacity: interpolate(labelP, [0, 1], [0, 1]),
        transform: `translateY(${8 * (1 - labelP)}px)`,
      }}>
        <span
          key={labelKey}
          style={{
            fontFamily: fontFamily.text,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: colors.white,
            textTransform: "uppercase",
          }}
        >
          {stepLabel}
        </span>
      </div>

      {/* Progress dots — bottom right */}
      <div style={{
        position: "absolute",
        bottom: 64,
        right: 80,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity: eyebrowP,
      }}>
        {["Code", "Build", "Deploy"].map((label, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: dotActive === i ? 8 : 6,
              height: dotActive === i ? 8 : 6,
              borderRadius: "50%",
              background: dotActive === i ? colors.blue[400] : "rgba(255,255,255,0.25)",
              boxShadow: dotActive === i ? `0 0 8px ${colors.blue[400]}` : "none",
              transition: "all 0.3s",
            }} />
            {i < 2 && (
              <div style={{
                width: 20,
                height: 1,
                background: i < dotActive ? colors.blue[600] : "rgba(255,255,255,0.15)",
              }} />
            )}
          </div>
        ))}
      </div>

    </AbsoluteFill>
  );
};
