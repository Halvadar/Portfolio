import React, { useMemo } from "react";
import { Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";

import Man from "../public/Man.svg";

interface StyledMainCharacterProps {
  width: number;
}

const StyledMainCharacter = styled.div<StyledMainCharacterProps>`
  position: absolute;
  width: ${(props) => `${props.width}%`};
  left: 50%;
  z-index: 3;
  > svg {
    position: relative;
    width: 100%;
    left: -50%;
  }
`;

interface MainCharacterProps {
  windowWidth: number;
  windowHeight: number;
  leftMountain: { width: number; height: number };
  mainCharacterDistanceFromBottom: number;
  mainCharacterSize: { width: number; height: number };
}

const MainCharacter: React.FunctionComponent<MainCharacterProps> = ({
  windowWidth,
  windowHeight,
  leftMountain,
  mainCharacterDistanceFromBottom,
  mainCharacterSize,
}) => {
  return (
    <Spring
      from={{
        bottom: `${
          mainCharacterDistanceFromBottom - mainCharacterSize.height
        }%`,
      }}
      to={{ bottom: `${mainCharacterDistanceFromBottom}%` }}
    >
      {(props) => (
        <StyledMainCharacter style={props} width={mainCharacterSize.width}>
          <Man />
        </StyledMainCharacter>
      )}
    </Spring>
  );
};

export default MainCharacter;
