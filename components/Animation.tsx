import React, { useMemo, useState } from "react";
import { Spring, animated, interpolate } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import { mountainWidthsCalculator } from "../functions/mountainFunctions";
import useWindowSize from "../hooks/useWindowSize";
import GroundAnimations from "./GroundAnimations";
import MoonAnimation from "./MoonAnimation";
import MountainAnimations from "./MountainAnimations";
import Navbar from "./Navbar";
import SunAnimation from "./SunAnimation";
import MainCharacter from "./MainCharacter";
import {
  mainCharacterDistanceFromTopCalculator,
  mainCharacterSizeCalculator,
} from "../functions/mainCharacterFunctions";
import {
  houseLogDistanceFromTopCalculator,
  houseLogSizeCalculator,
  logDistanceFromLeftCalculator,
} from "../functions/houseFunctions";
import HouseAnimation from "./HouseAnimation";

const StyledAnimation = styled(animated.div)`
  width: 100%;
  height: 100%;
`;

interface AnimationProps {}

const Animation: React.FunctionComponent<AnimationProps> = () => {
  // customHooks
  const [windowWidth, windowHeight, windowHeightIsGreater] = useWindowSize();
  // memo
  const currentWindowRatio = useMemo(() => windowHeight / windowWidth, [
    windowWidth,
    windowHeight,
  ]);

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
  const [currentNavItem, setCurrentNavItem] = useState<number>(null);

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
  const mainCharacterSize = useMemo(
    () => mainCharacterSizeCalculator(windowHeight, windowWidth),
    [windowWidth, windowHeight]
  );
  const mainCharacterDistanceFromTop = useMemo(
    () =>
      mainCharacterDistanceFromTopCalculator(
        windowWidth,
        windowHeight,
        mountainProps.leftMountain.height,
        mainCharacterSize.height,
        mainCharacterSize.heightForPlants
      ),
    [
      windowWidth,
      windowHeight,
      mountainProps.leftMountain.height,
      mainCharacterSize.height,
      mainCharacterSize.heightForPlants,
    ]
  );
  const houseLogSize = useMemo(
    () => houseLogSizeCalculator(windowHeight, windowWidth),
    [windowHeight, windowWidth]
  );

  const houseLogDistanceFromTop = useMemo(
    () =>
      houseLogDistanceFromTopCalculator(
        windowHeight,
        windowWidth,
        mountainProps.leftMountain.height,
        houseLogSize.house.height,
        houseLogSize.house.heightForPlants,
        houseLogSize.log.height,
        houseLogSize.log.heightForPlants
      ),
    [windowHeight, windowWidth, mountainProps.leftMountain.height, houseLogSize]
  );
  const logDistanceFromLeft = useMemo(
    () => logDistanceFromLeftCalculator(currentWindowRatio),
    [currentWindowRatio]
  );

  return (
    <StyledAnimation>
      <Spring
        native
        from={{ filterProp: 0 }}
        to={{
          filterProp: currentNavItem === 0 || currentNavItem === 1 ? 1 : 0,
        }}
      >
        {({ filterProp }) => (
          <animated.div
            style={{
              filter: interpolate(
                [filterProp],
                (s) => `blur(${s * 4}px) grayscale(${s * 50}%)`
              ),
              height: "100%",
            }}
          >
            <MountainAnimations
              windowWidth={windowWidth}
              windowHeightIsGreater={windowHeightIsGreater}
              windowHeight={windowHeight}
              setMountainAnimationFinished={setMountainAnimationFinished}
              {...mountainProps}
              mountainAnimationFinished={mountainAnimationFinished}
            />
            <GroundAnimations
              setPlantAnimationFinished={setPlantAnimationFinished}
              houseWidth={houseLogSize.house.width}
              houseHeight={houseLogSize.house.heightForPlants}
              logWidth={houseLogSize.log.width}
              logHeight={houseLogSize.log.heightForPlants}
              houseDistanceFromTop={
                houseLogDistanceFromTop.houseDistanceFromTopForPlants
              }
              logDistanceFromTop={
                houseLogDistanceFromTop.logDistanceFromTopForPlants
              }
              logDistanceFromLeft={logDistanceFromLeft}
              mainCharacterDistanceFromTopForPlants={
                mainCharacterDistanceFromTop.mainCharacterDistanceFromTopForPlants
              }
              mainCharacterWidth={mainCharacterSize.width}
              mainCharacterHeightForPlants={mainCharacterSize.heightForPlants}
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
          </animated.div>
        )}
      </Spring>
      {plantAnimationFinished && (
        <>
          <MainCharacter
            focused={currentNavItem !== 1}
            mainCharacterSize={mainCharacterSize}
            mainCharacterDistanceFromTop={
              mainCharacterDistanceFromTop.mainCharacterDistanceFromTop
            }
          />

          <HouseAnimation
            focused={currentNavItem !== 0}
            logDistanceFromLeft={logDistanceFromLeft}
            houseLogSize={houseLogSize}
            houseLogDistanceFromTop={houseLogDistanceFromTop}
            leftMountain={mountainProps.leftMountain}
          />
        </>
      )}
      <Navbar
        currentNavItem={currentNavItem}
        setCurrentNavItem={setCurrentNavItem}
      />
    </StyledAnimation>
  );
};

export default Animation;
