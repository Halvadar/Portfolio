import React, { useState } from "react";
import styled from "styled-components";
import Flower from "../public/Flower.svg";
import Mushroom from "../public/Mushroom.svg";
import Grass from "../public/Grass.svg";
import {
  mushroomCoordinates,
  flowerCoordinates,
  grassCoordinates,
} from "../public/plantCoordinateList";
import GroundBottomPartBackground from "../public/GroundBottomPartBackground.svg";

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
}

const GroundBottomPart: React.FunctionComponent<GroundBottomPartProps> = ({
  windowHeight,
  leftMountain,
}) => {
  const [grassStates, setGrassStates] = useState(() => {
    return grassCoordinates.map(() => {
      return { animationCanBeStarted: false };
    });
  });
  const [mushroomStates, setMushroomStates] = useState(() => {
    return mushroomCoordinates.map(() => {
      return { animationCanBeStarted: false };
    });
  });
  const [flowerStates, setFlowerStates] = useState(() => {
    return flowerCoordinates.map(() => {
      return { animationCanBeStarted: false };
    });
  });

  return (
    <StyledBottomPart>
      <GroundBottomPartBackground />
    </StyledBottomPart>
  );
};

export default GroundBottomPart;
