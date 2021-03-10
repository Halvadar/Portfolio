import React, { useMemo } from "react";
import { Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import Lottie from "react-lottie";
import Man from "../public/Man.svg";
import Dog from "../public/Dog.json";

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
const StyledDog = styled.div`
  position: absolute;
  width: 30%;
  bottom: 10%;
  left: -40%;
  z-index: 3;
`;

interface MainCharacterProps {
  windowWidth: number;
  windowHeight: number;
  leftMountain: { width: number; height: number };
  mainCharacterDistanceFromTop: number;
  mainCharacterSize: { width: number; height: number };
}

const MainCharacter: React.FunctionComponent<MainCharacterProps> = ({
  windowWidth,
  windowHeight,
  leftMountain,
  mainCharacterDistanceFromTop,
  mainCharacterSize,
}) => {
  const dogDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Dog,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Spring
      from={{
        top: `${mainCharacterDistanceFromTop + mainCharacterSize.height}%`,
      }}
      to={{ top: `${mainCharacterDistanceFromTop}%` }}
    >
      {(props) => (
        <StyledMainCharacter style={props} width={mainCharacterSize.width}>
          <StyledDog>
            <Lottie options={dogDefaultOptions} />
          </StyledDog>
          <Man />
        </StyledMainCharacter>
      )}
    </Spring>
  );
};

export default MainCharacter;
