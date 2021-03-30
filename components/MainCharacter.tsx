import React, { useContext } from "react";

import { interpolate, Spring, animated } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import Lottie from "react-lottie";
import Man from "../public/Man";
import Dog from "../public/Dog.json";
import Fire from "../public/Fire.json";
import { isDayContext } from "./Header";

interface StyledMainCharacterProps {
  width: number;
}

const StyledMainCharacter = styled(animated.div)<StyledMainCharacterProps>`
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
  mainCharacterDistanceFromTop: number;
  mainCharacterSize: { width: number; height: number };
  focused?: boolean;
}

const MainCharacter: React.FunctionComponent<MainCharacterProps> = ({
  mainCharacterDistanceFromTop,
  mainCharacterSize,
  focused,
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
      native
      from={{
        top: `${mainCharacterDistanceFromTop + mainCharacterSize.height}%`,
        filterProp: 0,
      }}
      to={{
        top: `${mainCharacterDistanceFromTop}%`,
        filterProp: focused ? 0 : 1,
      }}
    >
      {({ top, filterProp }) => (
        <StyledMainCharacter
          style={{
            top: top,
            filter: interpolate(
              [filterProp],
              (filterP) => `blur(${filterP * 4}px)`
            ),
          }}
          width={mainCharacterSize.width}
        >
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
