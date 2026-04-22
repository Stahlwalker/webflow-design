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

const COMPONENT_CODE = [
  'import { motion } from "framer-motion"',
  "",
  "export const HeroSection = () => {",
  "  return (",
  "    <motion.div",
  '      className="hero"',
  "      initial={{ opacity: 0, y: 20 }}",
  "      animate={{ opacity: 1, y: 0 }}",
  "    >",
  "      <h1>Ship faster.</h1>",
  "    </motion.div>",
  "  )",
  "}",
];

export const CodeComponentsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelP = spring({ frame, fps, config: { damping: 200 } });
  const headlineP = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 180 } });
  const subP = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 180 } });
  const codeP = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 200 } });

  const linesVisible = Math.floor(
    interpolate(frame, [55, 200], [0, COMPONENT_CODE.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const arrowP = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 200 } });
  const canvasP = spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 200 } });
  const canvasItemsVisible = Math.floor(
    interpolate(frame, [210, 260], [0, 3], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

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
          03 — Code Components
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
          Import React<br />components into<br />Webflow's canvas.
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
          Bring your component library directly<br />into the visual designer.
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Tag label="React" delay={60} frame={frame} fps={fps} />
          <Tag label="Visual Canvas" delay={75} frame={frame} fps={fps} />
          <Tag label="Libraries" delay={90} frame={frame} fps={fps} />
        </div>
      </div>

      {/* Right */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px 0 40px",
          gap: 20,
        }}
      >
        {/* Code file */}
        <div
          style={{
            opacity: codeP,
            transform: `translateY(${interpolate(codeP, [0, 1], [20, 0])}px)`,
            background: "#0D0D0D",
            border: "1px solid #1E1E1E",
            borderRadius: 14,
            padding: "20px 28px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ABABAB" }} />
            <span
              style={{
                fontFamily: "'WF Visual Sans Text', sans-serif",
                fontSize: 13,
                color: "#5A5A5A",
              }}
            >
              HeroSection.tsx
            </span>
          </div>
          {COMPONENT_CODE.slice(0, linesVisible).map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'WF Visual Sans Text', sans-serif",
                fontSize: 13,
                color: line.startsWith("import") || line.startsWith("export")
                  ? "#146EF5"
                  : line.includes('"') || line.includes("'")
                  ? "#ABABAB"
                  : "#FFFFFF",
                lineHeight: 1.7,
                whiteSpace: "pre",
                minHeight: "1.7em",
              }}
            >
              {line || " "}
            </div>
          ))}
        </div>

        {/* Bridge label */}
        <div
          style={{
            opacity: arrowP,
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
          }}
        >
          <div style={{ flex: 1, height: 1, background: "#1E1E1E" }} />
          <span
            style={{
              fontFamily: "'WF Visual Sans Text', sans-serif",
              fontSize: 12,
              color: "#363636",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Visual Canvas
          </span>
          <div style={{ flex: 1, height: 1, background: "#1E1E1E" }} />
        </div>

        {/* Canvas */}
        <div
          style={{
            opacity: canvasP,
            transform: `translateY(${interpolate(canvasP, [0, 1], [16, 0])}px)`,
            background: "#111111",
            border: "1px solid #146EF5",
            borderRadius: 14,
            padding: "20px 28px",
            width: "100%",
          }}
        >
          <div
            style={{
              fontFamily: "'WF Visual Sans Text', sans-serif",
              fontSize: 12,
              color: "#146EF5",
              marginBottom: 16,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Webflow Designer
          </div>
          {["HeroSection", "Navigation", "Footer"].slice(0, canvasItemsVisible).map((el, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                marginBottom: 8,
                background: i === 0 ? "rgba(20,110,245,0.06)" : "#0D0D0D",
                borderRadius: 8,
                border: i === 0 ? "1px solid rgba(20,110,245,0.25)" : "1px solid #1A1A1A",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 2,
                  background: i === 0 ? "#146EF5" : "#222222",
                }}
              />
              <span
                style={{
                  fontFamily: "'WF Visual Sans Text', sans-serif",
                  fontSize: 13,
                  color: i === 0 ? "#FFFFFF" : "#363636",
                }}
              >
                {el}
              </span>
              {i === 0 && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontFamily: "'WF Visual Sans Text', sans-serif",
                    fontSize: 11,
                    color: "#146EF5",
                    background: "rgba(20,110,245,0.1)",
                    padding: "2px 8px",
                    borderRadius: 100,
                  }}
                >
                  React
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
