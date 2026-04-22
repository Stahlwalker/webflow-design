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
import { Scene5MCP } from "./Scene5MCP";
import { Scene6Apps } from "./Scene6Apps";
import { Scene7Outro } from "./Scene7Outro";

loadBrandFonts();

const FPS = 30;

const S1   = 5  * FPS;  // Intro title
const SCLI = 10 * FPS;  // CLI — install + capability ticker
const S3   = 9  * FPS;  // APIs
const S4   = 16 * FPS;  // Code Components
const S2   = 9  * FPS;  // Cloud cinematic
const S2b  = 7  * FPS;  // Cloud Storage
const S5   = 9  * FPS;  // MCP
const S6   = 9  * FPS;  // Apps & Integrations
const S7   = 5  * FPS;  // Outro

// Cumulative transition start frames
const t1 = S1;
const t2 = t1 + SCLI - transitionFrames.fade;
const t3 = t2 + S3   - transitionFrames.slide;
const t4 = t3 + S4   - transitionFrames.wipe;
const t5 = t4 + S2   - transitionFrames.fade;
const t6 = t5 + S2b  - transitionFrames.fade;
const t7 = t6 + S5   - transitionFrames.slide;
const t8 = t7 + S6   - transitionFrames.fade;  // outro starts here

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

      <TransitionSeries.Sequence durationInFrames={S2}>
        <Scene2Cloud />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade.presentation} timing={fade.timing} />

      <TransitionSeries.Sequence durationInFrames={S2b}>
        <Scene2bCloudStorage />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={slide.presentation} timing={slide.timing} />

      <TransitionSeries.Sequence durationInFrames={S5}>
        <Scene5MCP />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade.presentation} timing={fade.timing} />

      <TransitionSeries.Sequence durationInFrames={S6}>
        <Scene6Apps />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition presentation={fade.presentation} timing={fade.timing} />

      <TransitionSeries.Sequence durationInFrames={S7}>
        <Scene7Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>

    {/* Background music — fades out during outro */}
    <Audio
      src={staticFile("audio/bg-music-4.m4a")}
      volume={(f) =>
        f < t8
          ? 0.3
          : interpolate(f, [t8, t8 + S7], [0.3, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
      }
    />

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
