import React, { useState } from "react";
import { animated, Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import GroundBottomPart from "./GroundBottomPart";
import GroundTopPart from "./GroundTopPart";

const StyledGround = styled(animated.div)`
  width: 100%;
  position: absolute;
  z-index: 2;
`;

interface GroundAnimationsProps {
  windowWidth: number;
  windowHeight: number;
  windowRatio: number;
  mobileDevice: boolean;
  leftMountain: { height: number; width: number };
  groundAnimationFinished: boolean;
  setGroundAnimationFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setPlantAnimationFinished: React.Dispatch<React.SetStateAction<boolean>>;
  mainCharacterDistanceFromTopForPlants: number;
  mainCharacterWidth: number;
  mainCharacterHeightForPlants: number;
  houseWidth: number;
  houseHeight: number;
  logWidth: number;
  logHeight: number;
  houseDistanceFromTop: number;
  logDistanceFromTop: number;
  logDistanceFromLeft: number;
  mainCharacterAnimationFinished: boolean;
  navbarItemSelected: boolean;
  groundTopPartBackgroundHeight: number;
  setGroundTopPartBackgroundHeight: React.Dispatch<
    React.SetStateAction<number>
  >;
  projectsSelected: boolean;
}

const GroundAnimations: React.FunctionComponent<GroundAnimationsProps> = ({
  mainCharacterAnimationFinished,
  windowWidth,
  windowHeight,
  windowRatio,
  mobileDevice,
  leftMountain,
  groundAnimationFinished,
  setGroundAnimationFinished,
  setPlantAnimationFinished,
  mainCharacterDistanceFromTopForPlants,
  mainCharacterHeightForPlants,
  mainCharacterWidth,
  houseWidth,
  houseHeight,
  logWidth,
  logHeight,
  houseDistanceFromTop,
  logDistanceFromTop,
  logDistanceFromLeft,
  navbarItemSelected,
  groundTopPartBackgroundHeight,
  setGroundTopPartBackgroundHeight,
  projectsSelected,
}) => {
  return groundTopPartBackgroundHeight ? (
    <Spring
      native
      from={{ top: "100%" }}
      to={{
        top: `${5 + leftMountain.height - groundTopPartBackgroundHeight}%`,
      }}
      onRest={() => setGroundAnimationFinished(true)}
    >
      {(props) => (
        <StyledGround style={props}>
          <GroundTopPart
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            windowRatio={windowRatio}
            setGroundTopPartBackgroundHeight={setGroundTopPartBackgroundHeight}
            navbarItemSelected={navbarItemSelected}
            projectsSelected={projectsSelected}
          />
          <GroundBottomPart
            mobileDevice={mobileDevice}
            mainCharacterAnimationFinished={mainCharacterAnimationFinished}
            houseWidth={houseWidth}
            houseHeight={houseHeight}
            logWidth={logWidth}
            logHeight={logHeight}
            houseDistanceFromTop={houseDistanceFromTop}
            logDistanceFromTop={logDistanceFromTop}
            logDistanceFromLeft={logDistanceFromLeft}
            mainCharacterDistanceFromTopForPlants={
              mainCharacterDistanceFromTopForPlants
            }
            mainCharacterHeightForPlants={mainCharacterHeightForPlants}
            mainCharacterWidth={mainCharacterWidth}
            groundAnimationFinished={groundAnimationFinished}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            leftMountain={leftMountain}
            setPlantAnimationFinished={setPlantAnimationFinished}
          />
        </StyledGround>
      )}
    </Spring>
  ) : (
    <StyledGround>
      <GroundTopPart
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        windowRatio={windowRatio}
        setGroundTopPartBackgroundHeight={setGroundTopPartBackgroundHeight}
        navbarItemSelected={navbarItemSelected}
        projectsSelected={projectsSelected}
      />
      <GroundBottomPart
        mobileDevice={mobileDevice}
        mainCharacterAnimationFinished={mainCharacterAnimationFinished}
        houseWidth={houseWidth}
        houseHeight={houseHeight}
        logWidth={logWidth}
        logHeight={logHeight}
        houseDistanceFromTop={houseDistanceFromTop}
        logDistanceFromTop={logDistanceFromTop}
        logDistanceFromLeft={logDistanceFromLeft}
        mainCharacterDistanceFromTopForPlants={
          mainCharacterDistanceFromTopForPlants
        }
        mainCharacterHeightForPlants={mainCharacterHeightForPlants}
        mainCharacterWidth={mainCharacterWidth}
        groundAnimationFinished={groundAnimationFinished}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        leftMountain={leftMountain}
        setPlantAnimationFinished={setPlantAnimationFinished}
      />
    </StyledGround>
  );
};

export default GroundAnimations;
