import { Composition } from "remotion";
import { RPMIntro } from "./compositions/RPMIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RPMIntro"
        component={RPMIntro}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
