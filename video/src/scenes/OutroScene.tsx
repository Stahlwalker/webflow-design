import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

export const OutroScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile("/WebflowEndcard.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};
