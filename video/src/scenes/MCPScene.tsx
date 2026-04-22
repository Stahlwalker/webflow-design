import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";

const CLIENTS = [
  { name: "Claude", angle: -90 },
  { name: "Cursor", angle: -10 },
  { name: "Postman", angle: 90 },
  { name: "Windsurf", angle: 170 },
];

const ORBIT_RADIUS = 200;

export const MCPScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelP = spring({ frame, fps, config: { damping: 200 } });
  const headlineP = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 180 } });
  const subP = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 180 } });
  const centerP = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
      {/* Left */}
      <div
        style={{
          flex: "0 0 680px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 60px 0 120px",
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
          04 — AI Agents & MCP
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
          Build with agents<br />that understand<br />Webflow.
        </div>

        <div
          style={{
            opacity: subP,
            fontFamily: "'WF Visual Sans Text', sans-serif",
            fontSize: 19,
            color: "#5A5A5A",
            marginBottom: 40,
            lineHeight: 1.7,
          }}
        >
          Connect your AI agent to Webflow's MCP.<br />
          Manage CMS content, update site settings,<br />
          and trigger deployments from your<br />
          preferred AI client.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CLIENTS.map((client, i) => {
            const p = spring({ frame: Math.max(0, frame - (80 + i * 20)), fps, config: { damping: 200 } });
            return (
              <div
                key={client.name}
                style={{
                  opacity: p,
                  transform: `translateX(${interpolate(p, [0, 1], [-20, 0])}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ width: 1, height: 16, background: "#146EF5" }} />
                <span
                  style={{
                    fontFamily: "'WF Visual Sans Text', sans-serif",
                    fontSize: 17,
                    color: "#ABABAB",
                  }}
                >
                  {client.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right — Orbital diagram */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Orbit ring */}
        <div
          style={{
            position: "absolute",
            width: ORBIT_RADIUS * 2 + 120,
            height: ORBIT_RADIUS * 2 + 120,
            borderRadius: "50%",
            border: "1px solid #1A1A1A",
            opacity: centerP,
          }}
        />

        {/* Connection lines */}
        <svg style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible" }}>
          {CLIENTS.map((client, i) => {
            const rad = (client.angle * Math.PI) / 180;
            const cx = 300 + ORBIT_RADIUS * Math.cos(rad);
            const cy = 300 + ORBIT_RADIUS * Math.sin(rad);
            const lineP = interpolate(frame, [50 + i * 20, 90 + i * 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <line
                key={client.name}
                x1="300" y1="300" x2={cx} y2={cy}
                stroke="#146EF5"
                strokeWidth={1}
                strokeOpacity={0.25 * lineP}
                strokeDasharray="4 6"
              />
            );
          })}
        </svg>

        {/* Center — Webflow mark */}
        <div
          style={{
            position: "relative",
            opacity: centerP,
            transform: `scale(${interpolate(centerP, [0, 1], [0.6, 1])})`,
            zIndex: 10,
            background: "#146EF5",
            borderRadius: 24,
            width: 100,
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 60px rgba(20,110,245,0.2)",
          }}
        >
          <Img
            src={staticFile("/logos/Mark_Logo_White.png")}
            style={{ width: 52, height: "auto" }}
          />
        </div>

        {/* Client nodes */}
        {CLIENTS.map((client, i) => {
          const rad = (client.angle * Math.PI) / 180;
          const nodeP = spring({ frame: Math.max(0, frame - (50 + i * 20)), fps, config: { damping: 200 } });
          return (
            <div
              key={client.name}
              style={{
                position: "absolute",
                opacity: nodeP,
                transform: `translate(${ORBIT_RADIUS * Math.cos(rad)}px, ${ORBIT_RADIUS * Math.sin(rad)}px) scale(${interpolate(nodeP, [0, 1], [0.5, 1])})`,
                background: "#0D0D0D",
                border: "1px solid #222222",
                borderRadius: 14,
                padding: "14px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                minWidth: 100,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFFFFF" }} />
              <span
                style={{
                  fontFamily: "'WF Visual Sans Text', sans-serif",
                  fontSize: 14,
                  color: "#ABABAB",
                  fontWeight: 400,
                }}
              >
                {client.name}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
