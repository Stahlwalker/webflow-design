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

const APPS = [
  { name: "Zapier", category: "Automation" },
  { name: "HubSpot", category: "Marketing" },
  { name: "Figma", category: "Design" },
  { name: "Relume", category: "Design" },
  { name: "Finsweet", category: "Development" },
  { name: "Google Ads", category: "Advertising" },
];

export const AppsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelP = spring({ frame, fps, config: { damping: 200 } });
  const headlineP = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 180 } });
  const subP = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 180 } });

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
          05 — Apps & Integrations
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
          Build for the<br />Marketplace or<br />your workspace.
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
          Publish to the Marketplace and reach<br />millions of Webflow users.
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Tag label="Marketplace" delay={60} frame={frame} fps={fps} />
          <Tag label="OAuth" delay={75} frame={frame} fps={fps} />
          <Tag label="Integrations" delay={90} frame={frame} fps={fps} />
          <Tag label="Designer Extensions" delay={105} frame={frame} fps={fps} />
        </div>
      </div>

      {/* Right — App grid */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 100px 0 40px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: "100%" }}>
          {APPS.map((app, i) => {
            const p = spring({ frame: Math.max(0, frame - (45 + i * 18)), fps, config: { damping: 200 } });
            return (
              <div
                key={app.name}
                style={{
                  opacity: p,
                  transform: `translateY(${interpolate(p, [0, 1], [20, 0])}px)`,
                  background: "#0D0D0D",
                  border: "1px solid #1E1E1E",
                  borderRadius: 16,
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {/* Monochrome icon placeholder */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "#1A1A1A",
                    border: "1px solid #222222",
                    marginBottom: 4,
                  }}
                />
                <div
                  style={{
                    fontFamily: "'WF Visual Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#FFFFFF",
                  }}
                >
                  {app.name}
                </div>
                <div
                  style={{
                    fontFamily: "'WF Visual Sans Text', sans-serif",
                    fontSize: 13,
                    color: "#5A5A5A",
                  }}
                >
                  {app.category}
                </div>
              </div>
            );
          })}
        </div>

        {(() => {
          const statsP = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 200 } });
          return (
            <div
              style={{
                opacity: statsP,
                transform: `translateY(${interpolate(statsP, [0, 1], [16, 0])}px)`,
                marginTop: 24,
                padding: "16px 24px",
                border: "1px solid #1E1E1E",
                borderRadius: 12,
                width: "100%",
                textAlign: "center",
              }}
            >
              <span style={{ fontFamily: "'WF Visual Sans Text', sans-serif", fontSize: 15, color: "#5A5A5A" }}>
                Reach{" "}
                <span style={{ color: "#FFFFFF", fontWeight: 600 }}>300,000+</span>
                {" "}organizations on the Webflow Marketplace
              </span>
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};
