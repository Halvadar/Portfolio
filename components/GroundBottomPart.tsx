import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import plantCoordinates from "../public/plantCoordinateList";
import GroundBottomPartBackground from "../public/GroundBottomPartBackground";
import PlantComponent from "./PlantComponent";
import {
  filteredPlantsUpdate,
  plantFilter,
  plantHouseCharacterFilter,
  plantStateIncrementValueCalculator,
} from "../functions/plantFilter";
import { numberToBoolean } from "../functions/utilityFunctions";
import { AllAnimationFinished } from "./Header";

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
  mobileDevice: boolean;
  leftMountain: { width: number; height: number };
  groundAnimationFinished: boolean;
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
  setPlantAnimationFinished: React.Dispatch<React.SetStateAction<boolean>>;
  mainCharacterAnimationFinished: boolean;
}

const GroundBottomPart: React.FunctionComponent<GroundBottomPartProps> = ({
  windowHeight,
  windowWidth,
  mobileDevice,
  leftMountain,
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
  setPlantAnimationFinished,
  mainCharacterAnimationFinished,
}) => {
  // previousValues
  const initialWindowRatio = useRef(windowHeight / windowWidth);
  const previousWindowRatio = useRef(initialWindowRatio.current);

  // memo

  const filteredPlants = useMemo(
    () => plantFilter(windowWidth, windowHeight, leftMountain.height),
    [windowWidth, windowHeight, leftMountain.height]
  );

  const halfHouseDistanceFromTop = houseDistanceFromTop + houseHeight / 2;
  const halfLogDistanceFromTop = logDistanceFromTop + logHeight / 2;
  const houseWholeDistanceFromTop = houseDistanceFromTop + houseHeight;
  const logWholeDistanceFromTop = houseDistanceFromTop + houseHeight;

  const logWholeDistanceFromLeft = logDistanceFromLeft + logWidth;
  const houseWholeDistanceFromLeft = 10 + houseWidth;

  const halfCharacterDistanceFromTop =
    mainCharacterDistanceFromTopForPlants + mainCharacterHeightForPlants / 2;
  const characterWholeDistanceFromTop =
    mainCharacterDistanceFromTopForPlants + mainCharacterHeightForPlants;
  const characterDistanceFromLeft = 50 - mainCharacterWidth / 4;
  const characterWholeDistanceFromLeft = 50 + mainCharacterWidth / 4;

  // states
  const [plantAnimationStates, setPlantAnimationStates] = useState(() => {
    return filteredPlants.map(() => !!mobileDevice);
  });
  // we set this to true so the window resize plant function doesnt trigger before the animation starts
  const [plantAnimationInProgress, setPlantAnimationInProgress] = useState(
    true
  );
  const { setAllAnimationFinished } = useContext(AllAnimationFinished);
  // refs
  const plantAnimationInterval = useRef(null);
  const plantAnimationIndex = useRef(0);

  useEffect(() => {
    if (mobileDevice) {
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
      setPlantAnimationFinished(true);
      setAllAnimationFinished(true);
    }

    if (mainCharacterAnimationFinished) {
      if (!mobileDevice) {
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
            setPlantAnimationFinished(true);
            setAllAnimationFinished(true);

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
    }

    return () => {
      clearInterval(plantAnimationInterval.current);
    };
  }, [mainCharacterAnimationFinished, mobileDevice]);
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
      {mainCharacterAnimationFinished &&
        plantAnimationStates.map((animationCanBeStarted, plantIndex) => {
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
              mobileDevice={mobileDevice}
              key={plant.id}
              animationCanBeStarted={animationCanBeStarted}
              plantDistanceFromLeft={plant.left}
              plantDistanceFromTop={plant.top}
              plantType={plant.type}
              plantWidth={plant.width}
            />
          );
        })}

      <GroundBottomPartBackground />
    </StyledBottomPart>
  );
};

export default GroundBottomPart;
