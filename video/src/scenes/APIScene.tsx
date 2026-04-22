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

const CODE_LINES = [
  "fetch('https://api.webflow.com/v2/sites', {",
  "  method: 'GET',",
  "  headers: {",
  "    'Authorization': 'Bearer YOUR_API_KEY',",
  "    'Accept': 'application/json'",
  "  }",
  "})",
  "  .then(res => res.json())",
  "  .then(data => console.log(data))",
];

const RESPONSE_LINES = [
  "{",
  '  "sites": [',
  '    { "id": "42e63e98c9a982ac9b8b741",',
  '      "displayName": "Heart of Gold Spaceship",',
  '      "lastPublished": "2023-04-02T12:42:00.000Z"',
  "    }",
  "  ]",
  "}",
];

export const APIScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelP = spring({ frame, fps, config: { damping: 200 } });
  const headlineP = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 180 } });
  const subP = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 180 } });
  const codeBlockP = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 200 } });

  const linesVisible = Math.floor(
    interpolate(frame, [55, 160], [0, CODE_LINES.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const responseP = spring({ frame: Math.max(0, frame - 165), fps, config: { damping: 200 } });
  const responseLinesVisible = Math.floor(
    interpolate(frame, [175, 250], [0, RESPONSE_LINES.length], {
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
          02 — REST APIs
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
          Programmatic access<br />to sites, pages,<br />CMS & more.
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
          Official SDKs for JavaScript,<br />Python, and more.
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Tag label="REST" delay={60} frame={frame} fps={fps} />
          <Tag label="Webhooks" delay={75} frame={frame} fps={fps} />
          <Tag label="Authentication" delay={90} frame={frame} fps={fps} />
          <Tag label="SDKs" delay={105} frame={frame} fps={fps} />
        </div>
      </div>

      {/* Right — Code blocks */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 80px 0 40px",
          gap: 16,
        }}
      >
        <div
          style={{
            opacity: codeBlockP,
            transform: `translateY(${interpolate(codeBlockP, [0, 1], [20, 0])}px)`,
            background: "#0D0D0D",
            border: "1px solid #1E1E1E",
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
              marginBottom: 14,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            GET /v2/sites
          </div>
          {CODE_LINES.slice(0, linesVisible).map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'WF Visual Sans Text', sans-serif",
                fontSize: 14,
                color: i >= 7 ? "#363636" : i >= 3 ? "#ABABAB" : "#FFFFFF",
                lineHeight: 1.7,
                whiteSpace: "pre",
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            opacity: responseP,
            transform: `translateY(${interpolate(responseP, [0, 1], [20, 0])}px)`,
            background: "#0D0D0D",
            border: "1px solid #1E1E1E",
            borderRadius: 14,
            padding: "20px 28px",
            width: "100%",
          }}
        >
          <div
            style={{
              fontFamily: "'WF Visual Sans Text', sans-serif",
              fontSize: 12,
              color: "#FFFFFF",
              marginBottom: 14,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            200 OK
          </div>
          {RESPONSE_LINES.slice(0, responseLinesVisible).map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'WF Visual Sans Text', sans-serif",
                fontSize: 14,
                color: i >= 2 && i <= 4 ? "#ABABAB" : "#FFFFFF",
                lineHeight: 1.7,
                whiteSpace: "pre",
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
