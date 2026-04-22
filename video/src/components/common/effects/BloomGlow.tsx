import { colors } from "../../../config/colors";

type BloomGlowProps = {
  color?: string;
  size?: number;
  opacity?: number;
  children: React.ReactNode;
  offsetX?: number;
  offsetY?: number;
};

/**
 * BloomGlow — Soft radial glow behind child content.
 * Elevated tier: guides the eye and adds emphasis.
 */
export const BloomGlow: React.FC<BloomGlowProps> = ({
  color = colors.blue[500],
  size = 400,
  opacity = 0.15,
  children,
  offsetX = 0,
  offsetY = 0,
}) => {
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: size,
          height: size,
          borderRadius: "50%",
          background: color,
          opacity,
          filter: `blur(${size * 0.4}px)`,
          transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};
