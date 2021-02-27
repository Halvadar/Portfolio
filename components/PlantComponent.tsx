import React from "react";
import { Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import Flower from "../public/Flower.svg";
import Mushroom from "../public/Mushroom.svg";
import Grass from "../public/Grass.svg";

interface StyledPlantProps {
  left: number;
  top: number;
}

const StyledPlant = styled.div<StyledPlantProps>`
  position: absolute;
  left: ${(props: StyledPlantProps) => `${props.left}%`};
  top: ${(props: StyledPlantProps) => `${props.top}%`};
`;

interface PlantComponentProps {
  animationCanBeStarted: boolean;
  plantType: number;
  plantWidth: number;
  plantDistanceFromLeft: number;
  plantDistanceFromTop: number;
}

const PlantComponent: React.FunctionComponent<PlantComponentProps> = ({
  animationCanBeStarted,
  plantType,
  plantWidth,
  plantDistanceFromLeft,
  plantDistanceFromTop,
}) =>
  animationCanBeStarted ? (
    <Spring from={{ width: "0%" }} to={{ width: `${plantWidth}%` }}>
      {(props) => {
        if (plantType === 0) {
          return (
            <StyledPlant
              top={plantDistanceFromTop}
              left={plantDistanceFromLeft}
              style={props}
            >
              <Mushroom />
            </StyledPlant>
          );
        }

        if (plantType === 1) {
          return (
            <StyledPlant
              top={plantDistanceFromTop}
              left={plantDistanceFromLeft}
              style={props}
            >
              <Flower />
            </StyledPlant>
          );
        }

        return (
          <StyledPlant
            top={plantDistanceFromTop}
            left={plantDistanceFromLeft}
            style={props}
          >
            <Grass />
          </StyledPlant>
        );
      }}
    </Spring>
  ) : null;

export default PlantComponent;
