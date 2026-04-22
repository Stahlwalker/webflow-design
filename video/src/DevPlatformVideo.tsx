import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { CloudScene } from "./scenes/CloudScene";
import { APIScene } from "./scenes/APIScene";
import { CodeComponentsScene } from "./scenes/CodeComponentsScene";
import { MCPScene } from "./scenes/MCPScene";
import { AppsScene } from "./scenes/AppsScene";
import { OutroScene } from "./scenes/OutroScene";

const INTRO = 150;
const CLOUD = 270;
const API = 270;
const CODE_COMP = 270;
const MCP = 270;
const APPS = 270;
const OUTRO = 150;
const TOTAL = INTRO + CLOUD + API + CODE_COMP + MCP + APPS + OUTRO;


export const DevPlatformVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#080808", fontFamily: "'WF Visual Sans', sans-serif" }}>
      {/* Global progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 3,
          width: `${(frame / TOTAL) * 100}%`,
          background: "#146EF5",
          zIndex: 100,
        }}
      />

      <Sequence from={0} durationInFrames={INTRO}>
        <IntroScene />
      </Sequence>

      <Sequence from={INTRO} durationInFrames={CLOUD}>
        <CloudScene />
      </Sequence>

      <Sequence from={INTRO + CLOUD} durationInFrames={API}>
        <APIScene />
      </Sequence>

      <Sequence from={INTRO + CLOUD + API} durationInFrames={CODE_COMP}>
        <CodeComponentsScene />
      </Sequence>

      <Sequence from={INTRO + CLOUD + API + CODE_COMP} durationInFrames={MCP}>
        <MCPScene />
      </Sequence>

      <Sequence from={INTRO + CLOUD + API + CODE_COMP + MCP} durationInFrames={APPS}>
        <AppsScene />
      </Sequence>

      <Sequence from={INTRO + CLOUD + API + CODE_COMP + MCP + APPS} durationInFrames={OUTRO}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
