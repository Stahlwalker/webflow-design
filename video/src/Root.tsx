import "./index.css";
import { Composition, Folder } from "remotion";
import { DevPlatformVideo } from "./DevPlatformVideo";
import { DevPlatform } from "./demos/videos/DevPlatform/DevPlatform";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Videos">
        <Composition
          id="DevPlatform"
          component={DevPlatform}
          durationInFrames={91 * 30}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="DevPlatformVideo"
          component={DevPlatformVideo}
          durationInFrames={1650}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
