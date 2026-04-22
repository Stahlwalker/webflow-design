import { AbsoluteFill } from "remotion";
import { colors } from "../../../config/colors";

type SplitLayoutProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  background?: React.ReactNode;
  bgColor?: string;
  gap?: number;
  padding?: number;
  reverse?: boolean;
  alignItems?: "center" | "flex-start" | "flex-end" | "stretch";
  split?: "50-50" | "40-60" | "60-40";
  edgeToEdge?: boolean;
  direction?: "horizontal" | "vertical";
};

/**
 * SplitLayout — Two-slot layout with horizontal or vertical stacking.
 *
 * `direction` — "horizontal" (side-by-side, default) or "vertical" (top/bottom stack).
 * `edgeToEdge` — second slot fills full width/height and touches the edge.
 * `split` — slot ratio: "50-50" (default), "40-60", or "60-40".
 * `reverse` — swaps the order of the two slots.
 */
export const SplitLayout: React.FC<SplitLayoutProps> = ({
  left,
  right,
  background,
  bgColor = colors.black,
  gap = 60,
  padding = 120,
  reverse = false,
  alignItems = "center",
  split = "50-50",
  edgeToEdge = false,
  direction = "horizontal",
}) => {
  const [firstFlex, secondFlex] = split === "40-60"
    ? [4, 6]
    : split === "60-40"
      ? [6, 4]
      : [5, 5];

  const isVertical = direction === "vertical";

  const flexDir = isVertical
    ? (reverse ? "column-reverse" : "column")
    : (reverse ? "row-reverse" : "row");

  if (edgeToEdge) {
    const textSide = (
      <div
        style={{
          flex: firstFlex,
          display: "flex",
          alignItems: isVertical ? "flex-start" : "center",
          justifyContent: isVertical ? "center" : undefined,
          ...(isVertical
            ? {
                paddingLeft: padding,
                paddingRight: padding,
                paddingTop: reverse ? 0 : padding,
                paddingBottom: reverse ? padding : 0,
              }
            : {
                paddingLeft: reverse ? 0 : padding,
                paddingRight: reverse ? padding : 0,
              }),
        }}
      >
        {left}
      </div>
    );

    const mediaSide = (
      <div
        style={{
          flex: secondFlex,
          ...(isVertical ? { width: "100%" } : { height: "100%" }),
          overflow: "hidden",
        }}
      >
        {right}
      </div>
    );

    return (
      <AbsoluteFill style={{ background: bgColor }}>
        {background}
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: flexDir,
            gap,
          }}
        >
          {textSide}
          {mediaSide}
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      {background}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: flexDir,
          alignItems: isVertical ? "center" : alignItems,
          justifyContent: "center",
          padding: isVertical ? `${padding}px ${padding}px` : `0 ${padding}px`,
          gap,
        }}
      >
        <div style={{ flex: firstFlex, ...(isVertical ? { width: "100%" } : {}) }}>{left}</div>
        <div
          style={{
            flex: secondFlex,
            display: "flex",
            justifyContent: isVertical
              ? "center"
              : reverse ? "flex-start" : "flex-end",
            ...(isVertical ? { width: "100%" } : {}),
          }}
        >
          {right}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
