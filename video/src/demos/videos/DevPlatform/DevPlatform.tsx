import { AbsoluteFill, Sequence, staticFile, interpolate } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import { loadBrandFonts } from "../../../config/fonts";
import { brandFade, brandSlide, brandWipe, transitionFrames } from "../../../components/common/transitions/presets";

import { Scene1Intro } from "./Scene1Intro";
import { SceneCLI } from "./SceneCLI";
import { Scene3API } from "./Scene3API";
import { Scene4CodeComponents } from "./Scene4CodeComponents";
import { Scene2Cloud } from "./Scene2Cloud";
import { Scene2bCloudStorage } from "./Scene2bCloudStorage";
import { Scene6Apps } from "./Scene6Apps";
import { Scene5MCP } from "./Scene5MCP";
import { Scene7Outro } from "./Scene7Outro";

loadBrandFonts();

const FPS = 30;

const S1   = 5  * FPS;  // Intro title
const SCLI = 10 * FPS;  // CLI — install + capability ticker
const S3   = 9  * FPS;  // APIs
const S4   = 16 * FPS;  // Code Components
const S2   = 12 * FPS;  // Cloud cinematic
const S2b  = 7  * FPS;  // Cloud Storage
const S6   = 15 * FPS;  // Apps & Integrations (after Cloud)
const S5   = 13 * FPS;  // MCP (4s hero intro + 9s orbit)
const S7   = 5  * FPS;  // Outro

// Cumulative transition start frames (order: Intro→CLI→API→Code→MCP→Cloud→Storage→Apps→Outro)
const t1 = S1;
const t2 = t1 + SCLI - transitionFrames.fade;
const t3 = t2 + S3   - transitionFrames.slide;
const t4 = t3 + S4   - transitionFrames.wipe;
const t5 = t4 + S5   - transitionFrames.fade;   // Code → MCP
const t6 = t5 + S2   - transitionFrames.fade;   // MCP → Cloud
const t7 = t6 + S2b  - transitionFrames.fade;   // Cloud → Storage
const t8 = t7 + S6   - transitionFrames.slide;  // Storage → Apps → Outro

const fade  = brandFade();
const slide = brandSlide();
const wipe  = brandWipe();

const transitions = [t1, t2, t3, t4, t5, t6, t7, t8];

export const DevPlatform: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={S1}>
        <Scene1Intro />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade.presentation} timing={fade.timing} />

      <TransitionSeries.Sequence durationInFrames={SCLI}>
        <SceneCLI />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={slide.presentation} timing={slide.timing} />

      <TransitionSeries.Sequence durationInFrames={S3}>
        <Scene3API />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={wipe.presentation} timing={wipe.timing} />

      <TransitionSeries.Sequence durationInFrames={S4}>
        <Scene4CodeComponents />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade.presentation} timing={fade.timing} />

      <TransitionSeries.Sequence durationInFrames={S5}>
        <Scene5MCP />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade.presentation} timing={fade.timing} />

      <TransitionSeries.Sequence durationInFrames={S2}>
        <Scene2Cloud />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade.presentation} timing={fade.timing} />

      <TransitionSeries.Sequence durationInFrames={S2b}>
        <Scene2bCloudStorage />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={slide.presentation} timing={slide.timing} />

      <TransitionSeries.Sequence durationInFrames={S6}>
        <Scene6Apps />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade.presentation} timing={fade.timing} />

      <TransitionSeries.Sequence durationInFrames={S7}>
        <Scene7Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>

    {/* Background music — crossfade loop at ~60s (1800 frames) */}
    {(() => {
      const MUSIC_FRAMES = Math.round(60 * FPS); // ~1800
      const XFADE        = 60;                       // 2s crossfade window
      const CLAMP_OPT    = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

      const masterVol = (f: number) =>
        f < t8
          ? 0.3
          : interpolate(f, [t8, t8 + S7], [0.3, 0], CLAMP_OPT);

      return (
        <>
          {/* Instance 1 — fades out in the xfade window */}
          <Audio
            src={staticFile("audio/bg-music-v2.m4a")}
            volume={(f) => {
              const fade = f >= MUSIC_FRAMES - XFADE
                ? interpolate(f, [MUSIC_FRAMES - XFADE, MUSIC_FRAMES], [1, 0], CLAMP_OPT)
                : 1;
              return masterVol(f) * fade;
            }}
          />
          {/* Instance 2 — starts XFADE frames before loop point, fades in */}
          <Sequence from={MUSIC_FRAMES - XFADE} layout="none">
            <Audio
              src={staticFile("audio/bg-music-v2.m4a")}
              volume={(localF) => {
                const globalF = localF + (MUSIC_FRAMES - XFADE);
                const fadeIn  = interpolate(localF, [0, XFADE], [0, 1], CLAMP_OPT);
                return masterVol(globalF) * fadeIn;
              }}
            />
          </Sequence>
        </>
      );
    })()}

    {/* Outro music — crossfades in 6 frames before the last scene */}
    <Sequence from={Math.max(0, t8 - 6)} layout="none">
      <Audio src={staticFile("audio/outro.mp3")} volume={0.5} />
    </Sequence>

    {/* Woosh SFX — 3 frames before each scene cut */}
    {transitions.map((t, i) => (
      <Sequence key={`woosh-${i}`} from={Math.max(0, t - 3)} layout="none">
        <Audio src={staticFile("audio/Woosh.wav")} volume={0.5} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
