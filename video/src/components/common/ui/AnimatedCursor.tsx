import {
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
  interpolate,
  Easing,
} from "remotion";

type AnimatedCursorProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startFrame?: number;
  arrivalFrame?: number;
  clickFrame?: number;
  cursorSrc?: string;
  cursorSize?: number;
  clickScale?: number;
  clickDuration?: number;
};

/**
 * AnimatedCursor — Mouse cursor that moves between points with optional click.
 * Position is absolute — place inside a relative/absolute container.
 */
export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  startX,
  startY,
  endX,
  endY,
  startFrame = 0,
  arrivalFrame = 20,
  clickFrame,
  cursorSrc = "img/cursor.svg",
  cursorSize = 48,
  clickScale = 0.85,
  clickDuration = 4,
}) => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const moveProgress = interpolate(
    frame,
    [startFrame, arrivalFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );

  const x = interpolate(moveProgress, [0, 1], [startX, endX]);
  const y = interpolate(moveProgress, [0, 1], [startY, endY]);

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const isClicking =
    clickFrame !== undefined &&
    frame >= clickFrame &&
    frame < clickFrame + clickDuration;
  const scale = isClicking ? clickScale : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${scale})`,
        opacity,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <Img src={staticFile(cursorSrc)} style={{ width: cursorSize }} />
    </div>
  );
};
