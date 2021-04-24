import React, { useContext, useEffect, useMemo, useState } from "react";
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
  houseZoomCoefficientCalculator,
  logDistanceFromLeftCalculator,
} from "../functions/houseFunctions";
import HouseAnimation from "./HouseAnimation";
import windowCoordinates from "../public/windowCoordinates";
import {
  AllAnimationFinished,
  lottieAnimationsShouldBeStoppedContext,
} from "./Header";
import TreesComponent from "./TreesComponent";
import RiverComponent from "./RiverComponent";

const StyledAnimation = styled(animated.div)`
  height: 100%;
  width: 100%;
`;
const StyledZoomableContainer = styled(animated.div)`
  position: absolute;
`;

interface AnimationProps {}

const Animation: React.FunctionComponent<AnimationProps> = () => {
  // customHooks
  const [
    windowWidth,
    windowHeight,
    windowHeightIsGreater,
    windowRatio,
  ] = useWindowSize();
  // state
  const [
    groundTopPartBackgroundHeight,
    setGroundTopPartBackgroundHeight,
  ] = useState<number>(undefined);
  const [currentNavItem, setCurrentNavItem] = useState<number>(null);
  const [
    houseZoomAnimationInProgress,
    setHouseZoomAnimationInProgress,
  ] = useState<boolean>(false);
  const [
    mainCharacterZoomAnimationInProgress,
    setMainCharacterZoomAnimationInProgress,
  ] = useState<boolean>(false);
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
  const mainCharacterSize = useMemo(
    () =>
      mainCharacterSizeCalculator(
        windowHeight,
        windowWidth,
        currentNavItem === 0 && !houseZoomAnimationInProgress
      ),
    [windowWidth, windowHeight, currentNavItem, houseZoomAnimationInProgress]
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
  const windowSvgSize = useMemo(
    () => ({
      width: (houseLogSize.house.width * windowCoordinates.width) / 100,
      height: (houseLogSize.house.height * windowCoordinates.height) / 100,
      left: (houseLogSize.house.width * windowCoordinates.left) / 100 + 10,
      top:
        (houseLogSize.house.height * windowCoordinates.top) / 100 +
        houseLogDistanceFromTop.houseDistanceFromTop,
    }),
    [windowHeight, windowWidth]
  );

  const logDistanceFromLeft = useMemo(
    () => logDistanceFromLeftCalculator(windowRatio),
    [windowRatio]
  );
  const windowZoomCoefficient = useMemo(
    () => houseZoomCoefficientCalculator(windowRatio, windowSvgSize.width),
    [windowHeight, windowWidth]
  );
  const groundTopPartDistanceFromTop = useMemo<number>(() => {
    return (
      5 + mountainProps.leftMountain.height - groundTopPartBackgroundHeight
    );
  }, [mountainProps.leftMountain.height, groundTopPartBackgroundHeight]);
  const [
    mountainAnimationFinished,
    setMountainAnimationFinished,
  ] = useState<boolean>(false);
  const [
    groundAnimationFinished,
    setGroundAnimationFinished,
  ] = useState<boolean>(false);
  const [
    mainCharacterAnimationFinished,
    setMainCharacterAnimationFinished,
  ] = useState<boolean>(false);
  const [plantAnimationFinished, setPlantAnimationFinished] = useState<boolean>(
    false
  );
  const { setLottieAnimationsShouldBeStopped } = useContext(
    lottieAnimationsShouldBeStoppedContext
  );
  const { allAnimationFinished } = useContext(AllAnimationFinished);

  useEffect(() => {
    if (
      !allAnimationFinished ||
      currentNavItem === 0 ||
      currentNavItem === 1 ||
      houseZoomAnimationInProgress ||
      mainCharacterZoomAnimationInProgress
    ) {
      setLottieAnimationsShouldBeStopped(true);
    } else {
      setLottieAnimationsShouldBeStopped(false);
    }
  }, [
    allAnimationFinished,
    currentNavItem,
    houseZoomAnimationInProgress,
    mainCharacterZoomAnimationInProgress,
    setLottieAnimationsShouldBeStopped,
  ]);

  return (
    <StyledAnimation>
      <Spring
        onStart={() => setHouseZoomAnimationInProgress(true)}
        onRest={() =>
          currentNavItem !== 1 && setHouseZoomAnimationInProgress(false)
        }
        native
        from={{ width: "100%", height: "100%", left: "0%", top: "0%" }}
        to={{
          height:
            currentNavItem === 1 ? `${100 * windowZoomCoefficient}%` : "100%",
          width:
            currentNavItem === 1 ? `${100 * windowZoomCoefficient}%` : "100%",
          left:
            currentNavItem === 1
              ? `${
                  -windowSvgSize.left * windowZoomCoefficient -
                  (windowSvgSize.width * windowZoomCoefficient - 100) / 2
                }%`
              : "0%",
          top:
            currentNavItem === 1
              ? `${
                  -windowSvgSize.top * windowZoomCoefficient -
                  (windowSvgSize.height * windowZoomCoefficient - 100) / 2
                }%`
              : "0%",
        }}
      >
        {(zoomableProps) => (
          <StyledZoomableContainer style={zoomableProps}>
            <Spring
              native
              from={{ filterProp: 0 }}
              to={{
                filterProp:
                  currentNavItem === 0 && !houseZoomAnimationInProgress ? 1 : 0,
              }}
            >
              {({ filterProp }) => (
                <animated.div
                  style={{
                    filter: interpolate(
                      [filterProp],
                      (s) => `blur(${s * 4}px) grayscale(${s * 90}%)`
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
                    mainCharacterAnimationFinished={
                      mainCharacterAnimationFinished
                    }
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
                    mainCharacterHeightForPlants={
                      mainCharacterSize.heightForPlants
                    }
                    setGroundAnimationFinished={setGroundAnimationFinished}
                    groundAnimationFinished={groundAnimationFinished}
                    windowWidth={windowWidth}
                    windowHeight={windowHeight}
                    windowRatio={windowRatio}
                    leftMountain={mountainProps.leftMountain}
                    navbarItemSelected={
                      currentNavItem === 0 || currentNavItem === 1
                    }
                    groundTopPartBackgroundHeight={
                      groundTopPartBackgroundHeight
                    }
                    setGroundTopPartBackgroundHeight={
                      setGroundTopPartBackgroundHeight
                    }
                    projectsSelected={currentNavItem === 1}
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
            {groundAnimationFinished && (
              <>
                <MainCharacter
                  setMainCharacterAnimationFinished={
                    setMainCharacterAnimationFinished
                  }
                  mainCharacterSize={mainCharacterSize}
                  mainCharacterDistanceFromTop={
                    mainCharacterDistanceFromTop.mainCharacterDistanceFromTop
                  }
                  houseZoomAnimationInProgress={houseZoomAnimationInProgress}
                  technologiesSelected={currentNavItem === 0}
                  setMainCharacterZoomAnimationInProgress={
                    setMainCharacterZoomAnimationInProgress
                  }
                  mainCharacterZoomAnimationInProgress={
                    mainCharacterZoomAnimationInProgress
                  }
                />
                <HouseAnimation
                  blurred={
                    currentNavItem === 0 && !houseZoomAnimationInProgress
                  }
                  logDistanceFromLeft={logDistanceFromLeft}
                  houseLogSize={houseLogSize}
                  houseLogDistanceFromTop={houseLogDistanceFromTop}
                  leftMountain={mountainProps.leftMountain}
                  projectsSelected={currentNavItem === 1}
                />

                <TreesComponent
                  blurred={
                    currentNavItem === 0 && !houseZoomAnimationInProgress
                  }
                  groundTopPartDistanceFromTop={groundTopPartDistanceFromTop}
                  groundTopPartBackgroundHeight={groundTopPartBackgroundHeight}
                />
                <RiverComponent
                  blurred={
                    currentNavItem === 0 && !houseZoomAnimationInProgress
                  }
                  groundTopPartDistanceFromTop={groundTopPartDistanceFromTop}
                />
              </>
            )}
          </StyledZoomableContainer>
        )}
      </Spring>
      <Navbar
        groundAnimationFinished={groundAnimationFinished}
        currentNavItem={currentNavItem}
        setCurrentNavItem={setCurrentNavItem}
      />
    </StyledAnimation>
  );
};

export default Animation;
