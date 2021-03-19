import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { mountainWidthsCalculator } from "../functions/mountainFunctions";
import useWindowSize from "../hooks/useWindowSize";
import GroundAnimations from "./GroundAnimations";
import MoonAnimation from "./MoonAnimation";
import MountainAnimations from "./MountainAnimations";
import SunAnimation from "./SunAnimation";

const StyledAnimation = styled.div`
  width: 100%;
`;

interface AnimationProps {}

const Animation: React.FunctionComponent<AnimationProps> = ({}) => {
  // customHooks
  const [windowWidth, windowHeight, windowHeightIsGreater] = useWindowSize();
  // memo
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
  // state
  const [
    mountainAnimationFinished,
    setMountainAnimationFinished,
  ] = useState<boolean>(false);
  const [
    groundAnimationFinished,
    setGroundAnimationFinished,
  ] = useState<boolean>(false);

  const [plantAnimationFinished, setPlantAnimationFinished] = useState<boolean>(
    false
  );

  return (
    <StyledAnimation>
      <MountainAnimations
        windowWidth={windowWidth}
        windowHeightIsGreater={windowHeightIsGreater}
        windowHeight={windowHeight}
        setMountainAnimationFinished={setMountainAnimationFinished}
        {...mountainProps}
        mountainAnimationFinished={mountainAnimationFinished}
      />

      <GroundAnimations
        setGroundAnimationFinished={setGroundAnimationFinished}
        groundAnimationFinished={groundAnimationFinished}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        leftMountain={mountainProps.leftMountain}
      />
      <SunAnimation
        leftMountainHeight={mountainProps.leftMountain.height}
        groundAnimationFinished={groundAnimationFinished}
      />
      <MoonAnimation
        leftMountainHeight={mountainProps.leftMountain.height}
        groundAnimationFinished={groundAnimationFinished}
      />
    </StyledAnimation>
  );
};

export default Animation;
