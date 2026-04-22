import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

export const Scene7Outro: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo
      src={staticFile("video/WebflowEndcard.mp4")}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </AbsoluteFill>
);
