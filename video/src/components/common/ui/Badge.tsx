import { fontFamily, caption } from "../../../config/typography";
import { colors } from "../../../config/colors";

type BadgeProps = {
  text: string;
  color?: string;
  variant?: "filled" | "outline";
  size?: "sm" | "md" | "lg";
};

/**
 * Badge — Small pill label for inline use next to headlines.
 * For "NEW", "v1.2", "BETA", etc.
 */
export const Badge: React.FC<BadgeProps> = ({
  text,
  color = colors.blue[500],
  variant = "filled",
  size = "sm",
}) => {
  const isFilled = variant === "filled";

  const sizeMap = {
    sm: { padding: "6px 16px", fontSize: 18, border: 1.5 },
    md: { padding: "8px 22px", fontSize: 24, border: 2 },
    lg: { padding: "12px 30px", fontSize: 32, border: 2 },
  };
  const s = sizeMap[size];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: s.padding,
        borderRadius: 100,
        background: isFilled ? color : "transparent",
        border: isFilled ? "none" : `${s.border}px solid ${color}`,
        color: isFilled ? colors.white : color,
        fontFamily: fontFamily.text,
        fontSize: s.fontSize,
        fontWeight: caption.md.fontWeight,
        letterSpacing: caption.md.letterSpacing,
        lineHeight: 1,
        textTransform: "uppercase",
      }}
    >
      {text}
    </span>
  );
};
