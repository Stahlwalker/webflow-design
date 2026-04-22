import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { fontFamily, body } from "../../../config/typography";
import { ThinkingDots } from "./ThinkingDots";

type ChatMessage = {
  role: "user" | "agent";
  text: string;
};

type ChatUIProps = {
  messages: ChatMessage[];
  /** Frame when typing starts (default: 10) */
  typingStartFrame?: number;
  /** Typing speed — frames per character (default: 1) */
  typingSpeed?: number;
  /** Pause after typing before submit (default: 8 frames) */
  submitPause?: number;
  /** Thinking duration before agent responds (default: 36 frames) */
  thinkingDuration?: number;

  // Styling
  bgColor?: string;
  inputBgColor?: string;
  bubbleColor?: string;
  textColor?: string;
  accentColor?: string;
  containerWidth?: number;

  // Agent avatar
  agentAvatarLetter?: string;
  agentAvatarColor?: string;

  // Input box
  placeholder?: string;
  modelName?: string;
  showPlusButton?: boolean;
  showModelSelector?: boolean;

  // Camera
  initialScale?: number;
  finalScale?: number;

  // Children — rendered below the chat
  children?: React.ReactNode;
};

/**
 * ChatUI — Full AI chat interface with typing, bubbles, thinking, and response.
 * Flexible enough for Claude, Webflow AI, or any agent-style demo.
 */
export const ChatUI: React.FC<ChatUIProps> = ({
  messages,
  typingStartFrame = 10,
  typingSpeed = 1,
  submitPause = 8,
  thinkingDuration = 36,

  bgColor = "#2a2a2a",
  inputBgColor = "#3a3a3a",
  bubbleColor,
  textColor = "#fff",
  accentColor = "#D97757",
  containerWidth = 900,

  agentAvatarLetter = "C",
  agentAvatarColor = "#D97757",

  placeholder = "Reply to Claude...",
  modelName = "Sonnet 4.6",
  showPlusButton = true,
  showModelSelector = true,

  initialScale = 0.7,
  finalScale = 1.4,

  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split messages into user and agent
  const userMessages = messages.filter((m) => m.role === "user");
  const agentMessages = messages.filter((m) => m.role === "agent");

  const firstUserMsg = userMessages[0]?.text ?? "";
  const firstAgentMsg = agentMessages[0]?.text ?? "";

  // Timeline
  const typeEnd = typingStartFrame + Math.round(firstUserMsg.length * typingSpeed);
  const submitFrame = typeEnd + submitPause;
  const bubbleFrame = submitFrame + 6;
  const thinkingFrame = bubbleFrame + 15;
  const responseFrame = thinkingFrame + thinkingDuration;

  // Typing
  const typedChars = Math.floor(
    interpolate(frame, [typingStartFrame, typeEnd], [0, firstUserMsg.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const typedText = firstUserMsg.slice(0, typedChars);
  const showCursor =
    frame >= typingStartFrame && frame < submitFrame && frame % Math.round(fps / 2) < fps / 4;

  // Submit
  const canSubmit = typedChars >= firstUserMsg.length;
  const submitPulse = frame >= submitFrame && frame < submitFrame + 4 ? 0.9 : 1;

  // Input fade
  const inputOpacity = interpolate(
    frame, [submitFrame, submitFrame + 4], [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Bubble entrance
  const bubbleProgress = spring({ frame: frame - bubbleFrame, fps, config: { damping: 20, stiffness: 200 } });
  const bubbleOpacity = frame >= bubbleFrame ? interpolate(bubbleProgress, [0, 1], [0, 1]) : 0;
  const bubbleY = frame >= bubbleFrame ? interpolate(bubbleProgress, [0, 1], [20, 0]) : 20;

  // Thinking
  const showThinking = frame >= thinkingFrame && frame < responseFrame;

  // Response
  const responseProgress = spring({ frame: frame - responseFrame, fps, config: { damping: 200 } });
  const responseOpacity = frame >= responseFrame ? interpolate(responseProgress, [0, 1], [0, 1]) : 0;
  const responseY = frame >= responseFrame ? interpolate(responseProgress, [0, 1], [15, 0]) : 15;
  const responseBlur = frame >= responseFrame ? interpolate(responseProgress, [0, 1], [8, 0]) : 8;

  // Camera zoom
  const cameraZoom = interpolate(
    frame, [0, typingStartFrame], [initialScale, finalScale],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );

  const resolvedBubbleColor = bubbleColor ?? accentColor;

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${cameraZoom})`,
        }}
      >
        <div style={{ width: containerWidth, display: "flex", flexDirection: "column", gap: 20 }}>

          {/* User bubble */}
          <div style={{ alignSelf: "flex-end", opacity: bubbleOpacity, transform: `translateY(${bubbleY}px)` }}>
            <div style={{ background: resolvedBubbleColor, borderRadius: 20, padding: "16px 24px", maxWidth: 600 }}>
              <span style={{ color: textColor, fontFamily: fontFamily.text, ...body.lg, lineHeight: 1.4 }}>
                {firstUserMsg}
              </span>
            </div>
          </div>

          {/* Agent section */}
          <div style={{ alignSelf: "flex-start", display: "flex", gap: 12, alignItems: "flex-start" }}>
            {(showThinking || frame >= responseFrame) && (
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${agentAvatarColor}, ${agentAvatarColor}88)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#fff", fontSize: 16, fontWeight: "600", fontFamily: fontFamily.text }}>
                  {agentAvatarLetter}
                </span>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {showThinking && (
                <ThinkingDots dotColor={accentColor} dotColorInactive="rgba(255,255,255,0.15)" />
              )}

              {frame >= responseFrame && (
                <div style={{ opacity: responseOpacity, transform: `translateY(${responseY}px)`, filter: `blur(${responseBlur}px)` }}>
                  <span style={{ color: textColor, fontFamily: fontFamily.text, ...body.xl, lineHeight: 1.4 }}>
                    {firstAgentMsg}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Input box */}
          <div
            style={{
              background: inputBgColor,
              borderRadius: 24,
              border: "1px solid rgba(255, 255, 255, 0.12)",
              padding: "20px 24px 16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ minHeight: 36, display: "flex", alignItems: "center" }}>
              {frame < bubbleFrame && (
                <span
                  style={{
                    color: typedChars > 0 ? textColor : "rgba(255,255,255,0.35)",
                    fontFamily: fontFamily.text,
                    ...body.lg,
                    opacity: inputOpacity,
                  }}
                >
                  {typedChars > 0 ? typedText : placeholder}
                  {showCursor && <span style={{ color: accentColor }}>|</span>}
                </span>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {showPlusButton && (
                <div
                  style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 20, fontWeight: "300", lineHeight: 1 }}>+</span>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {showModelSelector && (
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, fontFamily: fontFamily.text, fontWeight: "400" }}>
                    {modelName} ↓
                  </span>
                )}
                <div
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: canSubmit ? accentColor : "rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transform: `scale(${submitPulse})`,
                  }}
                >
                  <span style={{ color: canSubmit ? "#fff" : "rgba(255,255,255,0.3)", fontSize: 18, fontWeight: "600" }}>↑</span>
                </div>
              </div>
            </div>
          </div>

          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
