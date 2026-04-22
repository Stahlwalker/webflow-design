import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({ frame, fps, config: { damping: 200 } });
  const logoY = interpolate(logoProgress, [0, 1], [24, 0]);

  const buildWithProgress = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 180 } });
  const webflowProgress = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 160 } });
  const webflowX = interpolate(webflowProgress, [0, 1], [50, 0]);

  const taglineOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const terminalOpacity = interpolate(frame, [85, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const terminalY = interpolate(frame, [85, 115], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const command = "npm install -g @webflow/webflow-cli";
  const charCount = Math.floor(
    interpolate(frame, [105, 148], [0, command.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const showVersion = frame >= 148;
  const cursorBlink = Math.floor(frame / 8) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Webflow full logo */}
      <div
        style={{
          opacity: logoProgress,
          transform: `translateY(${logoY}px)`,
          marginBottom: 56,
        }}
      >
        <Img
          src={staticFile("/logos/Full_Logo_Blue_White.png")}
          style={{ height: 36, width: "auto" }}
        />
      </div>

      {/* Headline */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            opacity: buildWithProgress,
            transform: `translateY(${interpolate(buildWithProgress, [0, 1], [20, 0])}px)`,
            fontFamily: "'WF Visual Sans', sans-serif",
            fontWeight: 600,
            fontSize: 100,
            color: "#FFFFFF",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
          }}
        >
          Build with
        </div>
        <div
          style={{
            opacity: webflowProgress,
            transform: `translateX(${webflowX}px)`,
            fontFamily: "'WF Visual Sans', sans-serif",
            fontWeight: 600,
            fontSize: 100,
            color: "#146EF5",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
          }}
        >
          Webflow
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          fontFamily: "'WF Visual Sans Text', sans-serif",
          fontWeight: 400,
          fontSize: 22,
          color: "#757575",
          textAlign: "center",
          marginBottom: 64,
          letterSpacing: "0.01em",
        }}
      >
        Control and extensibility to build, deploy, and extend your sites.
      </div>

      {/* Terminal */}
      <div
        style={{
          opacity: terminalOpacity,
          transform: `translateY(${terminalY}px)`,
          background: "#111111",
          borderRadius: 14,
          padding: "20px 32px",
          border: "1px solid #1E1E1E",
          minWidth: 540,
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {["#363636", "#363636", "#363636"].map((color, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: color }} />
          ))}
        </div>

        <div
          style={{
            fontFamily: "'WF Visual Sans Text', sans-serif",
            fontSize: 18,
            color: "#FFFFFF",
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ color: "#146EF5" }}>$ </span>
          {command.slice(0, charCount)}
          {charCount < command.length && cursorBlink && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 18,
                background: "#FFFFFF",
                marginLeft: 2,
                verticalAlign: "middle",
              }}
            />
          )}
        </div>

        {showVersion && (
          <div
            style={{
              fontFamily: "'WF Visual Sans Text', sans-serif",
              fontSize: 18,
              color: "#363636",
              marginTop: 10,
            }}
          >
            → v1.12.2
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
