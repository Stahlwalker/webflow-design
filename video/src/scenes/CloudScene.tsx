import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const Tag: React.FC<{ label: string; delay: number; frame: number; fps: number }> = ({
  label, delay, frame, fps,
}) => {
  const p = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 200 } });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [10, 0])}px)`,
        display: "inline-flex",
        alignItems: "center",
        padding: "10px 22px",
        borderRadius: 100,
        border: "1px solid #222222",
        background: "#111111",
        fontFamily: "'WF Visual Sans Text', sans-serif",
        fontSize: 16,
        color: "#D8D8D8",
        fontWeight: 400,
      }}
    >
      {label}
    </div>
  );
};

const Step: React.FC<{
  label: string;
  sublabel: string;
  progress: number;
  highlight?: boolean;
}> = ({ label, sublabel, progress, highlight }) => (
  <div
    style={{
      opacity: progress,
      transform: `scale(${interpolate(progress, [0, 1], [0.88, 1])})`,
      background: "#111111",
      border: `1px solid ${highlight ? "#146EF5" : "#222222"}`,
      borderRadius: 16,
      padding: "24px 52px",
      textAlign: "center",
      minWidth: 290,
      boxShadow: highlight ? "0 0 48px rgba(20,110,245,0.1)" : "none",
    }}
  >
    <div
      style={{
        fontFamily: "'WF Visual Sans', sans-serif",
        fontWeight: 600,
        fontSize: 26,
        color: highlight ? "#146EF5" : "#FFFFFF",
        marginBottom: 6,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: "'WF Visual Sans Text', sans-serif",
        fontWeight: 400,
        fontSize: 14,
        color: "#5A5A5A",
      }}
    >
      {sublabel}
    </div>
  </div>
);

export const CloudScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelP = spring({ frame, fps, config: { damping: 200 } });
  const headlineP = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 180 } });
  const subP = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 180 } });

  const step1P = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 200 } });
  const step2P = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 200 } });
  const step3P = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 200 } });
  const line1P = interpolate(frame, [65, 92], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2P = interpolate(frame, [95, 122], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
      {/* Left */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px 0 120px",
        }}
      >
        <div
          style={{
            opacity: labelP,
            transform: `translateX(${interpolate(labelP, [0, 1], [-16, 0])}px)`,
            fontFamily: "'WF Visual Sans Text', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "#146EF5",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          01 — Webflow Cloud
        </div>

        <div
          style={{
            opacity: headlineP,
            transform: `translateY(${interpolate(headlineP, [0, 1], [28, 0])}px)`,
            fontFamily: "'WF Visual Sans', sans-serif",
            fontWeight: 600,
            fontSize: 60,
            color: "#FFFFFF",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          Deploy full-stack apps<br />alongside your<br />Webflow sites.
        </div>

        <div
          style={{
            opacity: subP,
            fontFamily: "'WF Visual Sans Text', sans-serif",
            fontSize: 19,
            color: "#5A5A5A",
            marginBottom: 52,
            lineHeight: 1.6,
          }}
        >
          Hosting, frameworks, and storage —<br />all in one platform.
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Tag label="Hosting" delay={65} frame={frame} fps={fps} />
          <Tag label="Frameworks" delay={80} frame={frame} fps={fps} />
          <Tag label="Storage" delay={95} frame={frame} fps={fps} />
        </div>
      </div>

      {/* Right — Deployment flow (black + white + one blue, no gradients) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 120px 0 40px",
        }}
      >
        <Step label="Code" sublabel="React / Next.js" progress={step1P} />

        <div style={{ width: 1, height: 52, background: "#222222", opacity: line1P }} />

        <Step label="Build" sublabel="CI/CD Pipeline" progress={step2P} />

        <div style={{ width: 1, height: 52, background: "#222222", opacity: line2P }} />

        <Step label="Deploy" sublabel="Webflow Cloud" progress={step3P} highlight />
      </div>
    </AbsoluteFill>
  );
};
