import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

type RevealMaskProps = {
  direction?: "left" | "right" | "top" | "bottom" | "circle";
  delay?: number;
  duration?: number;
  children: React.ReactNode;
};

/**
 * RevealMask — Content reveals from a direction using clip-path.
 * For screenshot reveals, before/after, progressive disclosure.
 */
export const RevealMask: React.FC<RevealMaskProps> = ({
  direction = "left",
  delay = 0,
  duration = 20,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: duration,
  });

  const p = interpolate(progress, [0, 1], [0, 100]);

  const clipPath = (() => {
    switch (direction) {
      case "left":
        return `inset(0 ${100 - p}% 0 0)`;
      case "right":
        return `inset(0 0 0 ${100 - p}%)`;
      case "top":
        return `inset(0 0 ${100 - p}% 0)`;
      case "bottom":
        return `inset(${100 - p}% 0 0 0)`;
      case "circle":
        return `circle(${p * 0.75}% at 50% 50%)`;
    }
  })();

  return (
    <div style={{ clipPath, WebkitClipPath: clipPath }}>
      {children}
    </div>
  );
};
