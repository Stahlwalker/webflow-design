# Webflow Design — Brand Video Builder

A [Remotion](https://remotion.dev)-based motion graphics studio for producing Webflow product and brand videos. All animations are written in React + TypeScript and rendered to high-quality MP4 at 1920×1080 / 30fps.

---

## Project structure

```
webflow-design/
├── video/                   # Remotion project (main codebase)
│   ├── src/
│   │   ├── Root.tsx         # Registers all Remotion compositions
│   │   ├── config/          # Brand tokens (colors, typography, fonts, effects, layout)
│   │   ├── components/
│   │   │   └── common/
│   │   │       ├── ScenePreset/   # Reusable scene layouts (HeroText, SplitLayout, etc.)
│   │   │       ├── bgs/           # Background effects (dots, particles, grid, waves…)
│   │   │       ├── effects/       # Visual FX (bloom, light leak, reveal masks)
│   │   │       └── ui/            # UI components (BrowserFrame, CodeBlock, ChatUI…)
│   │   ├── demos/
│   │   │   └── videos/
│   │   │       └── DevPlatform/   # Full DevPlatform product video (main composition)
│   │   └── scenes/          # Legacy / standalone scene prototypes
│   ├── public/
│   │   ├── audio/           # Background music, SFX, outro sting
│   │   ├── fonts/           # WFVisualSans OTF/TTF files (required — not in git)
│   │   ├── icons/           # SVG icons for scene feature cards
│   │   ├── logos/           # PNG logos (brand partners, IDE logos, tech logos)
│   │   └── product/         # Product screenshot assets
│   ├── remotion.config.ts   # Remotion/webpack config (JPEG output, Tailwind v4)
│   └── package.json
├── icons/                   # Source SVG icon files (copied into video/public/icons/)
├── logos/                   # Source logo PNGs (copied into video/public/logos/ as needed)
├── messaging/               # Brand messaging docs / copy
├── product-assets/          # Raw product screenshots and exports
└── webflow-brand/           # Brand guidelines reference assets
```

---

## Tech stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Remotion](https://remotion.dev) | 4.0.451 | React-based video rendering |
| React | 19 | Component model |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS v4 | 4.0 | Utility styles (via `@remotion/tailwind-v4`) |
| `@remotion/transitions` | 4.0 | Scene transition presets |
| `@remotion/media` | 4.0 | Audio components |
| `@remotion/google-fonts` | 4.0 | Font loading |
| Prism.js | 1.30 | Syntax highlighting in CodeBlock |

---

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Install

```bash
cd video
npm install
```

### Required assets (not in git)

These files must be present before running or rendering:

**Fonts** — place in `video/public/fonts/`:
- `WFVisualSans-Regular.otf` / `.ttf`
- `WFVisualSans-Medium.otf` / `.ttf`
- `WFVisualSans-Bold.otf`
- `WFVisualSans-Light.otf`
- `WFVisualSans-ExtraLight.otf`
- `WFVisualSans-RegularText.otf` / `.ttf`
- `WFVisualSans-MediumText.otf`

**Audio** — place in `video/public/audio/`:
- `bg-music-4.m4a` — background music for DevPlatform
- `outro.mp3` — outro sting
- `Woosh.wav` — scene transition SFX

**Logos** — place in `video/public/logos/`:
- Brand logos: `cursor.png`, `windsurf.png`, `vscode.png`, `zed-blue.png`, `claude.png`, `codex.png`
- Tech logos: `react.png`, `javascript.png`, `python.png`
- Partner logos: `figma.png`, `hubspot.png`, `zapier.png`, `relume.png`, `finsweet.png`, `googleads.png`, `postman.png`, `rovo.png`
- Webflow marks: `Mark_Logo_Blue.png`, `Full_Logo_Blue_White.png`, etc.

**Icons** — place in `video/public/icons/` (copies from root `icons/` folder):
- `Build_your_way.svg`, `Empower.svg`, `Import.svg`
- `Build_visually.svg`, `Dynamic_content.svg`, `Optimize.svg`

To copy icons and logos from their source folders:
```bash
cp ../icons/*.svg video/public/icons/
cp ../logos/*.png video/public/logos/
```

---

## Running the studio

```bash
cd video
npm run dev
```

Opens Remotion Studio at `http://localhost:3000`. Use the left panel to select a composition, scrub the timeline, and preview in real time. Every save hot-reloads instantly.

If you see a `ReferenceError` after a series of edits, do a hard reload (`Cmd+Shift+R`) — stale HMR bundles accumulate in the browser and a full reload clears them.

---

## Rendering to MP4

```bash
cd video
npx remotion render DevPlatform out/DevPlatform.mp4
```

Or with explicit options:
```bash
npx remotion render DevPlatform out/DevPlatform.mp4 \
  --codec=h264 \
  --jpeg-quality=95 \
  --concurrency=4
```

Renders output to `video/out/`. The `DevPlatform` composition is ~77 seconds at 30fps (≈2310 frames).

---

## Compositions

### `DevPlatform` (main)

A full product video for the Webflow Developer Platform. Registered in `src/Root.tsx` at 1920×1080 / 30fps.

**Scene order and durations:**

| Scene | File | Duration | Content |
|-------|------|----------|---------|
| Scene 1 — Intro | `Scene1Intro.tsx` | 5s | Logo + title card |
| Scene CLI | `SceneCLI.tsx` | 10s | Terminal install animation + capability ticker |
| Scene 3 — APIs | `Scene3API.tsx` | 9s | Split layout with cycling API code examples |
| Scene 4 — Code Components | `Scene4CodeComponents.tsx` | 16s | 3-phase: Developers → Import React → Configure in Webflow |
| Scene 2 — Cloud | `Scene2Cloud.tsx` | 9s | Cinematic cloud infrastructure hero |
| Scene 2b — Cloud Storage | `Scene2bCloudStorage.tsx` | 7s | SQLite / KV / Object Store cards |
| Scene 5 — MCP | `Scene5MCP.tsx` | 9s | MCP integration showcase |
| Scene 6 — Apps | `Scene6Apps.tsx` | 9s | Apps & integrations logo grid |
| Scene 7 — Outro | `Scene7Outro.tsx` | 5s | Webflow mark + CTA |

Transitions between scenes use `@remotion/transitions` (`TransitionSeries`) with fade, slide, and wipe presets defined in `src/components/common/transitions/presets.ts`.

**Scene 4 — Code Components phase timing:**
```
Phase 1 (frames 0–185):   Developers — feature cards + IDE logo shimmer strip
Phase 2 (frames 185–315): Import React Components — React logo + Badge.tsx code
Phase 3 (frames 315+):    …configure in Webflow — designer feature cards
```

---

## Brand tokens

All visual constants live in `video/src/config/`:

- **`colors.ts`** — Full Webflow color palette (blue 100–900, gray 100–900, black, white)
- **`typography.ts`** — Heading scale (h1–h5), eyebrow styles, font sizes, weights, letter-spacing
- **`fonts.ts`** — `loadBrandFonts()` helper that loads WFVisualSans from `public/fonts/`
- **`effects.ts`** — Shadow and glow presets
- **`layout.ts`** — Spacing, grid, and padding constants

Import brand tokens like:
```ts
import { colors } from "../config/colors";
import { fontFamily, heading } from "../config/typography";
```

---

## Reusable components

### Scene presets (`src/components/common/ScenePreset/`)
Drop-in scene layouts for common patterns:
- `HeroText` — large centered headline with eyebrow
- `SplitLayout` — left text / right visual
- `FeatureShowcase` — animated feature card grid
- `LogoGrid` — animated partner logo reveal
- `ComparisonSlide` — before/after split
- `TitleCard`, `OutroCard`, `QuoteSlide`, `VideoCaption`, `CounterReveal`, `FullScreenMedia`, `StackedCards`

### UI components (`src/components/common/ui/`)
- `BrowserFrame` — dark/light browser chrome wrapper
- `CodeBlock` — syntax-highlighted code with optional typing animation (`typingSpeed` = frames per char; use `0.01` for instant display)
- `ChatUI` — AI chat message bubbles
- `AnimatedCursor` — clickable cursor animation
- `Badge`, `CaptionPill`, `IconCircle`, `ProgressBar`, `ThinkingDots`, `VideoPreviewBox`

### Animation helpers
- `StaggerText` — animates headline text word-by-word or character-by-character
- `spring()` / `interpolate()` from Remotion — all motion uses these; no CSS transitions

---

## Adding a new video

1. Create a folder: `video/src/demos/videos/MyVideo/`
2. Add scene files (`Scene1.tsx`, etc.) and a root composition file (`MyVideo.tsx`)
3. Register in `video/src/Root.tsx`:
```tsx
<Composition
  id="MyVideo"
  component={MyVideo}
  durationInFrames={90 * 30}
  fps={30}
  width={1920}
  height={1080}
/>
```
4. Use `TransitionSeries` + scene presets to assemble the timeline.

---

## Claude Code integration

This project is set up for use with Claude Code (the Anthropic CLI). The `.claude/` directory contains:
- `launch.json` — dev server config (runs `npm run dev` in `video/`, port 3000)
- `memory/` — persistent session memory for project context

To start the preview server Claude uses:
```bash
# Claude Code does this automatically via launch.json
cd video && npm run dev
```
