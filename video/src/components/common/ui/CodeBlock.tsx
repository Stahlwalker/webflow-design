import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import { fontFamily } from "../../../config/typography";
import { colors } from "../../../config/colors";

// Brand-aligned syntax colors (monochromatic blue palette + grays)
const syntaxColors = {
  dark: {
    keyword: colors.blue[400],
    string: colors.blue[200],
    number: colors.blue[300],
    function: colors.white,
    comment: colors.gray[500],
    punctuation: colors.gray[200],
    operator: colors.white,
    property: colors.blue[200],
    tag: colors.blue[400],
    attrName: colors.blue[200],
    attrValue: colors.blue[100],
    plain: colors.white,
  },
  light: {
    keyword: colors.blue[600],
    string: colors.blue[700],
    number: colors.blue[500],
    function: colors.gray[900],
    comment: colors.gray[400],
    punctuation: colors.gray[500],
    operator: colors.gray[700],
    property: colors.blue[600],
    tag: colors.blue[700],
    attrName: colors.blue[600],
    attrValue: colors.blue[800],
    plain: colors.gray[800],
  },
};

const tokenToColor = (type: string, isDark: boolean) => {
  const c = isDark ? syntaxColors.dark : syntaxColors.light;
  const map: Record<string, string> = {
    keyword: c.keyword,
    builtin: c.keyword,
    "class-name": c.keyword,
    string: c.string,
    "template-string": c.string,
    number: c.number,
    boolean: c.number,
    function: c.function,
    comment: c.comment,
    "block-comment": c.comment,
    punctuation: c.punctuation,
    operator: c.operator,
    property: c.property,
    tag: c.tag,
    "attr-name": c.attrName,
    "attr-value": c.attrValue,
    selector: c.property,
    constant: c.number,
    symbol: c.number,
  };
  return map[type] ?? c.plain;
};

type PrismToken = string | Prism.Token;

const renderTokens = (tokens: PrismToken[], isDark: boolean): React.ReactNode[] => {
  const plainColor = isDark ? syntaxColors.dark.plain : syntaxColors.light.plain;
  return tokens.map((token, i) => {
    if (typeof token === "string") {
      return <span key={i} style={{ color: plainColor }}>{token}</span>;
    }
    const color = tokenToColor(token.type, isDark);
    const content = Array.isArray(token.content)
      ? renderTokens(token.content as PrismToken[], isDark)
      : String(token.content);
    return (
      <span key={i} style={{ color }}>
        {content}
      </span>
    );
  });
};

type CodeBlockProps = {
  code: string;
  language?: string;
  typingSpeed?: number;
  delay?: number;
  variant?: "dark" | "light";
  showLineNumbers?: boolean;
  fontSize?: number;
  padding?: number;
  width?: number | string;
};

/**
 * CodeBlock — Syntax-highlighted code with typing animation.
 * Uses Prism.js with brand-aligned monochromatic color theme.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
  typingSpeed = 0.5,
  delay = 0,
  variant = "dark",
  showLineNumbers = true,
  fontSize = 18,
  padding = 24,
  width = "100%",
}) => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const isDark = variant === "dark";

  // Typing animation — slice the raw code
  const charCount = Math.floor(
    interpolate(
      frame,
      [delay, delay + code.length * typingSpeed],
      [0, code.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );
  const visibleCode = code.slice(0, charCount);
  const showCursor = frame >= delay && charCount < code.length && frame % 15 < 8;

  const lines = visibleCode.split("\n");
  const grammar = Prism.languages[language] ?? Prism.languages.plain;
  const lineTokens = lines.map((line) => Prism.tokenize(line, grammar));

  return (
    <div
      style={{
        width,
        background: isDark ? colors.gray[900] : colors.gray[100],
        borderRadius: 12,
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        padding,
        overflow: "hidden",
      }}
    >
      {/* Language label */}
      {language && (
        <div
          style={{
            color: isDark ? colors.gray[500] : colors.gray[400],
            fontSize: 12,
            fontFamily: fontFamily.mono,
            marginBottom: 16,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {language}
        </div>
      )}

      {/* Code lines */}
      <div style={{ fontFamily: fontFamily.mono, fontSize, lineHeight: 1.6 }}>
        {lineTokens.map((tokens, i) => (
          <div key={i} style={{ display: "flex", gap: 16 }}>
            {showLineNumbers && (
              <span
                style={{
                  color: isDark ? colors.gray[700] : colors.gray[300],
                  minWidth: 28,
                  textAlign: "right",
                  userSelect: "none",
                }}
              >
                {i + 1}
              </span>
            )}
            <span>
              {renderTokens(tokens, isDark)}
              {i === lineTokens.length - 1 && showCursor && (
                <span style={{ color: colors.blue[500] }}>|</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
