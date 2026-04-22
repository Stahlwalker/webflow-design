import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

type ScaleZoomProps = {
  from?: number;
  to?: number;
  panX?: number;
  panY?: number;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
};

/**
 * ScaleZoom — Camera zoom + pan effect.
 * Brand "Enhance" principle: zoom in to details, zoom out for context.
 */
export const ScaleZoom: React.FC<ScaleZoomProps> = ({
  from = 1,
  to = 1.4,
  panX = 0,
  panY = 0,
  delay = 0,
  duration = 30,
  children,
}) => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const progress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );

  const scale = interpolate(progress, [0, 1], [from, to]);
  const x = interpolate(progress, [0, 1], [0, panX]);
  const y = interpolate(progress, [0, 1], [0, panY]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transform: `scale(${scale}) translate(${x}px, ${y}px)`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};
