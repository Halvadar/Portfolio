import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import plantCoordinates from "../public/plantCoordinateList";
import GroundBottomPartBackground from "../public/GroundBottomPartBackground.svg";
import PlantComponent from "./PlantComponent";

// styled

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
  leftMountain: { width: number; height: number };
  groundAnimationFinished: boolean;
}

const GroundBottomPart: React.FunctionComponent<GroundBottomPartProps> = ({
  windowHeight,
  leftMountain,
  groundAnimationFinished,
}) => {
  // states
  const [plantAnimationStates, setPlantAnimationStates] = useState(() => {
    return plantCoordinates.map(() => false);
  });
  // refs
  const plantAnimationInterval = useRef(null);
  const plantAnimationIndex = useRef(0);

  useEffect(() => {
    if (groundAnimationFinished) {
      const plantAnimationIntervalId = setInterval(() => {
        if (plantAnimationIndex.current > plantCoordinates.length - 1) {
          return clearInterval(plantAnimationInterval.current);
        }

        return setPlantAnimationStates((prevState) => {
          const newPlantState = [...prevState];

          newPlantState[plantAnimationIndex.current] = true;
          plantAnimationIndex.current += 1;

          return newPlantState;
        });
      }, 10);

      plantAnimationInterval.current = plantAnimationIntervalId;
    }

    return () => {
      clearInterval(plantAnimationInterval.current);
    };
  }, [plantAnimationStates.length, groundAnimationFinished]);

  return (
    <StyledBottomPart>
      {plantCoordinates.map((plant, plantIndex) => (
        <PlantComponent
          key={plant.id}
          animationCanBeStarted={plantAnimationStates[plantIndex]}
          plantDistanceFromLeft={plant.left}
          plantDistanceFromTop={plant.top}
          plantType={plant.type}
          plantWidth={plant.width}
        />
      ))}
      <GroundBottomPartBackground />
    </StyledBottomPart>
  );
};

export default GroundBottomPart;
