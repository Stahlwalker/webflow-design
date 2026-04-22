import { AbsoluteFill } from "remotion";
import { LightLeak } from "@remotion/light-leaks";

type LightLeakEffectProps = {
  seed?: number;
  hue?: number;
  opacity?: number;
};

/**
 * LightLeakEffect — Film-style light leak overlay.
 * Use as an overlay between scenes or layered on top of content.
 */
export const LightLeakEffect: React.FC<LightLeakEffectProps> = ({
  seed = 1,
  hue = 0,
  opacity = 0.6,
}) => {
  return (
    <AbsoluteFill style={{ opacity }}>
      <LightLeak seed={seed} hueShift={hue} />
    </AbsoluteFill>
  );
};
