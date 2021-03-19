import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import plantCoordinates from "../public/plantCoordinateList";
import GroundBottomPartBackground from "../public/GroundBottomPartBackground";
import PlantComponent from "./PlantComponent";
import HouseAnimation from "./HouseAnimation";
import useWindowSize from "../hooks/useWindowSize";
import {
  filteredPlantsUpdate,
  plantFilter,
  plantHouseCharacterFilter,
  plantStateIncrementValueCalculator,
} from "../functions/plantFilter";
import { numberToBoolean } from "../functions/utilityFunctions";
import MainCharacter from "./MainCharacter";
import {
  houseLogDistanceFromTopCalculator,
  houseLogSizeCalculator,
  logDistanceFromLeftCalculator,
} from "../functions/houseFunctions";
import {
  mainCharacterDistanceFromTopCalculator,
  mainCharacterSizeCalculator,
} from "../functions/mainCharacterFunctions";

// styled
// We give top -4px because top and bottom part have space left between them

const StyledBottomPart = styled.div`
  position: relative;
  top: -4px;
  width: 100%;
  > svg {
    display: block;
  }
`;

// component
interface GroundBottomPartProps {
  windowHeight: number;
  windowWidth: number;
  leftMountain: { width: number; height: number };
  groundAnimationFinished: boolean;
}

const GroundBottomPart: React.FunctionComponent<GroundBottomPartProps> = ({
  windowHeight,
  windowWidth,
  leftMountain,
  groundAnimationFinished,
}) => {
  // previousValues
  const initialWindowRatio = useRef(windowHeight / windowWidth);
  const previousWindowRatio = useRef(initialWindowRatio.current);

  // memo
  const currentWindowRatio = useMemo(() => windowHeight / windowWidth, [
    windowWidth,
    windowHeight,
  ]);
  const filteredPlants = useMemo(
    () => plantFilter(windowWidth, windowHeight, leftMountain.height),
    [windowWidth, windowHeight, leftMountain.height]
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
        leftMountain.height,
        houseLogSize.house.height,
        houseLogSize.log.height
      ),
    [
      windowHeight,
      windowWidth,
      leftMountain.height,
      houseLogSize.house.height,
      houseLogSize.log.height,
    ]
  );
  const halfHouseDistanceFromTop =
    houseLogDistanceFromTop.houseDistanceFromTop +
    houseLogSize.house.height / 2;
  const halfLogDistanceFromTop =
    houseLogDistanceFromTop.logDistanceFromTop + houseLogSize.log.height / 2;
  const houseWholeDistanceFromTop =
    houseLogDistanceFromTop.houseDistanceFromTop + houseLogSize.house.height;
  const logWholeDistanceFromTop =
    houseLogDistanceFromTop.houseDistanceFromTop + houseLogSize.house.height;
  const logDistanceFromLeft = useMemo(
    () => logDistanceFromLeftCalculator(currentWindowRatio),
    [currentWindowRatio]
  );
  const logWholeDistanceFromLeft = logDistanceFromLeft + houseLogSize.log.width;
  const houseWholeDistanceFromLeft = 10 + houseLogSize.house.width;
  const mainCharacterSize = useMemo(
    () => mainCharacterSizeCalculator(windowHeight, windowWidth),
    [windowWidth, windowHeight]
  );

  const mainCharacterDistanceFromTop = useMemo(
    () =>
      mainCharacterDistanceFromTopCalculator(
        windowWidth,
        windowHeight,
        leftMountain.height,
        mainCharacterSize.height
      ),
    [windowWidth, windowHeight, leftMountain.height, mainCharacterSize.height]
  );
  const halfCharacterDistanceFromTop =
    mainCharacterDistanceFromTop + mainCharacterSize.height / 2;
  const characterWholeDistanceFromTop =
    mainCharacterDistanceFromTop + mainCharacterSize.height;
  const characterDistanceFromLeft = 50 - mainCharacterSize.width / 4;
  const characterWholeDistanceFromLeft = 50 + mainCharacterSize.width / 4;
  // states
  const [plantAnimationStates, setPlantAnimationStates] = useState(() => {
    return filteredPlants.map(() => false);
  });
  // we set this to true so the window resize plant function doesnt trigger before the animation starts
  const [plantAnimationInProgress, setPlantAnimationInProgress] = useState(
    true
  );
  const [houseAnimationFinished, setHouseAnimationFinished] = useState(false);
  // refs
  const plantAnimationInterval = useRef(null);
  const plantAnimationIndex = useRef(0);

  useEffect(() => {
    if (groundAnimationFinished) {
      const plantStateIncrementValue = plantStateIncrementValueCalculator(
        plantAnimationStates.length
      );
      const plantAnimationIntervalId = setInterval(() => {
        if (plantAnimationIndex.current > plantAnimationStates.length - 1) {
          setPlantAnimationStates((previousState) => {
            return filteredPlantsUpdate(
              windowHeight,
              windowWidth,
              leftMountain.height,
              numberToBoolean(
                windowHeight / windowWidth - initialWindowRatio.current
              ),
              previousState
            );
          });
          setPlantAnimationInProgress(false);

          return clearInterval(plantAnimationInterval.current);
        }

        return setPlantAnimationStates((prevState) => {
          const newPlantState = [...prevState];

          for (
            let i = plantAnimationIndex.current;
            i < plantAnimationIndex.current + plantStateIncrementValue;
            i += 1
          ) {
            newPlantState[i] = true;
          }

          plantAnimationIndex.current += plantStateIncrementValue;

          return newPlantState;
        });
      }, 10);

      plantAnimationInterval.current = plantAnimationIntervalId;
    }

    return () => {
      clearInterval(plantAnimationInterval.current);
    };
  }, [groundAnimationFinished]);
  useEffect(() => {
    if (!plantAnimationInProgress) {
      setPlantAnimationStates((previousState) => {
        return filteredPlantsUpdate(
          windowHeight,
          windowWidth,
          leftMountain.height,
          numberToBoolean(
            windowHeight / windowWidth - previousWindowRatio.current
          ),
          previousState
        );
      });
    }

    previousWindowRatio.current = windowHeight / windowWidth;
  }, [windowWidth, windowHeight]);

  return (
    <StyledBottomPart>
      {plantAnimationStates.map((animationCanBeStarted, plantIndex) => {
        const plant = plantCoordinates[plantIndex];

        if (
          plantHouseCharacterFilter(
            10,
            houseWholeDistanceFromLeft,
            halfHouseDistanceFromTop,
            houseWholeDistanceFromTop,
            halfLogDistanceFromTop,
            logWholeDistanceFromTop,
            logDistanceFromLeft,
            logWholeDistanceFromLeft,
            halfCharacterDistanceFromTop,
            characterWholeDistanceFromTop,
            characterDistanceFromLeft,
            characterWholeDistanceFromLeft,
            plant.width,
            plant.type,
            plant.left,
            plant.top,
            windowWidth,
            windowHeight
          )
        ) {
          return null;
        }

        return (
          <PlantComponent
            key={plant.id}
            animationCanBeStarted={animationCanBeStarted}
            plantDistanceFromLeft={plant.left}
            plantDistanceFromTop={plant.top}
            plantType={plant.type}
            plantWidth={plant.width}
          />
        );
      })}
      {!plantAnimationInProgress && (
        <HouseAnimation
          setHouseAnimationFinished={setHouseAnimationFinished}
          logDistanceFromLeft={logDistanceFromLeft}
          houseLogSize={houseLogSize}
          houseLogDistanceFromTop={houseLogDistanceFromTop}
          leftMountain={leftMountain}
        />
      )}
      {!plantAnimationInProgress && (
        <MainCharacter
          leftMountain={leftMountain}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          mainCharacterSize={mainCharacterSize}
          mainCharacterDistanceFromTop={mainCharacterDistanceFromTop}
        />
      )}

      <GroundBottomPartBackground />
    </StyledBottomPart>
  );
};

export default GroundBottomPart;
