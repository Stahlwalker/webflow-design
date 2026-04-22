import { colors } from "../../../config/colors";
import { fontFamily } from "../../../config/typography";

type BrowserFrameProps = {
  title?: string;
  url?: string;
  variant?: "dark" | "light";
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
};

/**
 * BrowserFrame — macOS-style window chrome with traffic lights.
 * For wrapping screenshots, UI demos, code, or video content.
 */
export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  title = "",
  url,
  variant = "dark",
  children,
  width = "100%",
  height = "100%",
  borderRadius = 12,
}) => {
  const isDark = variant === "dark";
  const bg = isDark ? colors.gray[900] : colors.white;
  const barBg = isDark ? colors.gray[800] : colors.gray[100];
  const textColor = isDark ? colors.gray[400] : colors.gray[500];
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        overflow: "hidden",
        border: `1px solid ${borderColor}`,
        display: "flex",
        flexDirection: "column",
        background: bg,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          background: barBg,
          borderBottom: `1px solid ${borderColor}`,
          flexShrink: 0,
        }}
      >
        {/* Traffic lights */}
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c940" }} />

        {/* Title or URL */}
        {(title || url) && (
          <div
            style={{
              flex: 1,
              textAlign: "center",
              color: textColor,
              fontSize: 13,
              fontFamily: fontFamily.text,
            }}
          >
            {url ? (
              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  borderRadius: 6,
                  padding: "4px 16px",
                  display: "inline-block",
                }}
              >
                {url}
              </div>
            ) : (
              title
            )}
          </div>
        )}

        {/* Spacer for alignment */}
        <div style={{ width: 52 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
  );
};
