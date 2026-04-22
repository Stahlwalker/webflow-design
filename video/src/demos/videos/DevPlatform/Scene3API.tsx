import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Img } from "remotion";
import { StaggerText } from "../../../components/common/StaggerText";
import { CodeBlock } from "../../../components/common/ui/CodeBlock";
import { BrowserFrame } from "../../../components/common/ui/BrowserFrame";
import { colors } from "../../../config/colors";
import { fontFamily, eyebrow as eyebrowToken, heading } from "../../../config/typography";

// Phase timing (270 frames / 9s total)
const CODE2_IN = 105;
const CODE3_IN = 195;

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const codeGet = `const response = await fetch(
  'https://api.webflow.com/v2/sites',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Accept': 'application/json',
    },
  }
);

const data = await response.json();
console.log(data.sites);`;

const codePost = `const response = await fetch(
  'https://api.webflow.com/v2/collections/COLLECTION_ID/items',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isDraft: false,
      fieldData: {
        name: 'New Collection Item',
        slug: 'new-collection-item',
      },
    }),
  }
);`;

const codePublish = `const response = await fetch(
  'https://api.webflow.com/v2/sites/SITE_ID/publish',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      domains: ['heartofgold.galaxy'],
    }),
  }
);

const data = await response.json();
console.log('Published:', data);`;

const apis = ["Data API", "Designer API", "Browser API", "SDKs"];

const MethodBadge: React.FC<{ method: "GET" | "POST"; path: string }> = ({ method, path }) => (
  <div style={{
    fontFamily: fontFamily.text,
    fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
    color: colors.gray[600], marginBottom: 16, textTransform: "uppercase",
    display: "flex", alignItems: "center", gap: 10,
  }}>
    <span style={{
      background: method === "GET" ? "rgba(20,110,245,0.2)" : "rgba(245,158,11,0.2)",
      color: method === "GET" ? colors.blue[400] : "#f59e0b",
      padding: "3px 10px", borderRadius: 4,
      fontFamily: "'SF Mono', 'Fira Code', monospace",
      fontSize: 12,
    }}>{method}</span>
    <span style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 13, color: colors.gray[500] }}>
      {path}
    </span>
  </div>
);

export const Scene3API: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const splitP     = spring({ frame,          fps, config: { damping: 180 } });
  const headlineP  = spring({ frame: frame - 4, fps, config: { damping: 180 } });
  const codeFrameP = spring({ frame: frame - 8, fps, config: { damping: 160 } });

  // Code panel opacity — cycles through 3 examples
  const code1Opacity = interpolate(frame, [0, 10, CODE2_IN - 8, CODE2_IN + 6], [0, 1, 1, 0], CLAMP);
  const code2Opacity = interpolate(frame, [CODE2_IN, CODE2_IN + 12, CODE3_IN - 8, CODE3_IN + 6], [0, 1, 1, 0], CLAMP);
  const code3Opacity = interpolate(frame, [CODE3_IN, CODE3_IN + 12], [0, 1], CLAMP);

  return (
    <AbsoluteFill>
      {/* Dot grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(${colors.gray[800]} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        opacity: 0.4,
      }} />

      {/* Eyebrow */}
      <div style={{ position: "absolute", top: 72, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10 }}>
        <span style={{
          ...eyebrowToken.lg, fontFamily: fontFamily.text, color: colors.blue[400],
          opacity: interpolate(splitP, [0, 1], [0, 1]),
        }}>APIs &amp; SDKs</span>
      </div>

      {/* Left: headline + API list */}
      <div style={{
        position: "absolute",
        left: 100, top: 0, bottom: 0, width: 520,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32,
      }}>
        <div style={{
          width: "100%",
          opacity: interpolate(headlineP, [0, 1], [0, 1]),
          transform: `translateX(${-20 * (1 - headlineP)}px)`,
        }}>
          <StaggerText
            text="Build and Manage"
            fontSize={heading.h2.fontSize}
            fontWeight={heading.h2.fontWeight}
            color={colors.white}
            stagger="words"
            staggerDelay={6}
            delay={0}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          {apis.map((api, i) => {
            const p = spring({ frame: frame - 8 - i * 10, fps, config: { damping: 160 } });
            const isSDK = api === "SDKs";
            return (
              <div key={api} style={{
                opacity: interpolate(p, [0, 1], [0, 1]),
                transform: `translateY(${18 * (1 - p)}px)`,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ fontFamily: "'SF Mono', monospace", fontSize: 16, color: colors.blue[500] }}>
                    //
                  </span>
                  <span style={{ fontFamily: fontFamily.text, fontSize: 26, fontWeight: 500, color: colors.gray[300], letterSpacing: "0.01em" }}>
                    {api}
                  </span>
                </div>
                {isSDK && (() => {
                  const logoP = spring({ frame: frame - 8 - i * 10 - 8, fps, config: { damping: 100, stiffness: 220 } });
                  const logoScale = interpolate(logoP, [0, 1], [2.4, 1]);
                  const logoOpacity = interpolate(logoP, [0, 0.25], [0, 1], CLAMP);
                  return (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 10,
                      opacity: logoOpacity,
                      transform: `scale(${logoScale})`,
                    }}>
                      {[
                        { src: "logos/javascript.png", glow: "rgba(247,223,30,0.25)", border: "rgba(247,223,30,0.3)" },
                        { src: "logos/python.png",     glow: "rgba(55,118,171,0.25)", border: "rgba(55,118,171,0.3)" },
                      ].map(({ src, glow, border }) => (
                        <div key={src} style={{
                          width: 48, height: 48,
                          borderRadius: 12,
                          background: glow,
                          border: `1px solid ${border}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: `0 0 16px ${glow}`,
                        }}>
                          <Img src={staticFile(src)} style={{ width: 28, height: 28, objectFit: "contain" }} />
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: code panel */}
      <div style={{
        position: "absolute",
        left: 700, right: 60,
        top: 0, bottom: 0,
        display: "flex",
        alignItems: "center",
        opacity: interpolate(codeFrameP, [0, 1], [0, 1]),
        transform: `translateY(${20 * (1 - codeFrameP)}px)`,
      }}>
        <div style={{ width: "100%", height: 640 }}>
          <BrowserFrame url="api.webflow.com/v2" variant="dark" height="100%">
            <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>

              {/* GET /v2/sites */}
              <div style={{ position: "absolute", inset: 0, padding: "24px 28px", opacity: code1Opacity }}>
                <MethodBadge method="GET" path="/v2/sites" />
                <CodeBlock code={codeGet} language="javascript" typingSpeed={2} delay={0} showLineNumbers fontSize={15} />
              </div>

              {/* POST /v2/collections */}
              <div style={{ position: "absolute", inset: 0, padding: "24px 28px", opacity: code2Opacity }}>
                <MethodBadge method="POST" path="/v2/collections/{id}/items" />
                <CodeBlock code={codePost} language="javascript" typingSpeed={2} delay={0} showLineNumbers fontSize={15} />
              </div>

              {/* POST /v2/sites/publish */}
              <div style={{ position: "absolute", inset: 0, padding: "24px 28px", opacity: code3Opacity }}>
                <MethodBadge method="POST" path="/v2/sites/{id}/publish" />
                <CodeBlock code={codePublish} language="javascript" typingSpeed={2} delay={0} showLineNumbers fontSize={15} />
              </div>

            </div>
          </BrowserFrame>
        </div>
      </div>

    </AbsoluteFill>
  );
};
