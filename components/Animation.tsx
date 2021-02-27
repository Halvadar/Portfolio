import React, { useMemo } from "react";
import { mountainWidthsCalculator } from "../functions/mountainFunctions";
import useWindowSize from "../hooks/useWindowSize";
import GroundAnimations from "./GroundAnimations";
import MountainAnimations from "./MountainAnimations";

interface AnimationProps {}

const Animation: React.FunctionComponent<AnimationProps> = ({}) => {
  const [windowWidth, windowHeight, windowHeightIsGreater] = useWindowSize();
  const mountainProps = useMemo<{
    leftMountain: { width: number; height: number };
    rightMountain: { width: number; height: number };
  }>(
    () =>
      mountainWidthsCalculator({
        windowWidth,
        windowHeight,
        windowHeightIsGreater,
      }),
    [windowWidth, windowHeight, windowHeightIsGreater]
  );

  return (
    <>
      <MountainAnimations {...mountainProps} />

      <GroundAnimations
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        leftMountain={mountainProps.leftMountain}
      />
    </>
  );
};

export default Animation;
