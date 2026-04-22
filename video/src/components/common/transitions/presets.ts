import { linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

/**
 * Brand-aligned transition presets.
 * Pre-configured with Webflow timing (6-8 frames).
 * Use with <TransitionSeries.Transition presentation={} timing={} />
 */

// Fade — soft cross-dissolve (8 frames / ~267ms)
export const brandFade = () => ({
  presentation: fade(),
  timing: linearTiming({ durationInFrames: 8 }),
});

// Slide from right — forward motion (6 frames / ~200ms)
export const brandSlide = (direction: "from-left" | "from-right" | "from-top" | "from-bottom" = "from-right") => ({
  presentation: slide({ direction }),
  timing: linearTiming({ durationInFrames: 6 }),
});

// Wipe — directional reveal (8 frames / ~267ms)
export const brandWipe = (direction: "from-left" | "from-right" | "from-top" | "from-bottom" = "from-left") => ({
  presentation: wipe({ direction }),
  timing: linearTiming({ durationInFrames: 8 }),
});

// Transition durations for frame math
export const transitionFrames = {
  fade: 8,
  slide: 6,
  wipe: 8,
} as const;
