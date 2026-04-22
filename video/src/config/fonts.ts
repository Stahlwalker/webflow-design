import { staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

/**
 * Load all Webflow brand fonts. Call once at the top of each video composition.
 *
 * Display variant (WFVisualSans): headlines, logo lock-ups — weights 200–700
 * Text variant (WFVisualSansText): body copy, UI, captions — weights 400–500
 */
export const loadBrandFonts = () =>
  Promise.all([
    // Display variant — for headlines, logo lock-ups
    loadFont({ family: "WFVisualSans", url: staticFile("fonts/WFVisualSans-ExtraLight.otf"), weight: "200" }),
    loadFont({ family: "WFVisualSans", url: staticFile("fonts/WFVisualSans-Light.otf"), weight: "300" }),
    loadFont({ family: "WFVisualSans", url: staticFile("fonts/WFVisualSans-Regular.ttf"), weight: "400" }),
    loadFont({ family: "WFVisualSans", url: staticFile("fonts/WFVisualSans-Medium.ttf"), weight: "500" }),
    loadFont({ family: "WFVisualSans", url: staticFile("fonts/WFVisualSans-SemiBold.ttf"), weight: "600" }),
    loadFont({ family: "WFVisualSans", url: staticFile("fonts/WFVisualSans-Bold.otf"), weight: "700" }),
    // Text variant — for smaller copy, UI, captions
    loadFont({ family: "WFVisualSansText", url: staticFile("fonts/WFVisualSans-RegularText.otf"), weight: "400" }),
    loadFont({ family: "WFVisualSansText", url: staticFile("fonts/WFVisualSans-MediumText.otf"), weight: "500" }),
  ]);
