import React, { useContext, useMemo } from "react";
import { Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import Lottie from "react-lottie";
import { animated, useSpring } from "react-spring";
import Man from "../public/Man";
import Dog from "../public/Dog.json";
import Fire from "../public/Fire.json";
import { isDayContext } from "./Header";

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

const StyledFire = styled(animated.div)`
  position: absolute;
  bottom: 4%;
  z-index: 3;
  transform: translate(-55%, 0);
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
  const fireDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Fire,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const isDay = useContext(isDayContext);

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

          <Spring from={{ width: "0%" }} to={{ width: isDay ? "0%" : "25%" }}>
            {(style) => (
              <StyledFire style={style}>
                <Lottie options={fireDefaultOptions} />
              </StyledFire>
            )}
          </Spring>
        </StyledMainCharacter>
      )}
    </Spring>
  );
};

export default MainCharacter;
