import React, { useContext, useEffect } from "react";

import {
  interpolate,
  Spring,
  animated as renderAnimated,
} from "react-spring/renderprops.cjs";
import styled from "styled-components";
import Lottie from "react-lottie";
import { animated } from "react-spring";
import Man from "../public/Man";
import Dog from "../public/Dog.json";
import Fire from "../public/Fire.json";
import { AllAnimationFinished, isDayContext } from "./Header";

const StyledMainCharacter = styled(renderAnimated.div)`
  position: absolute;
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
  setMainCharacterAnimationFinished: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  mainCharacterDistanceFromTop: number;
  mainCharacterSize: { width: number; height: number };
  houseZoomAnimationInProgress: boolean;
  setMainCharacterZoomAnimationInProgress: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  technologiesSelected: boolean;
}

const MainCharacter: React.FunctionComponent<MainCharacterProps> = ({
  setMainCharacterAnimationFinished,
  mainCharacterSize,
  houseZoomAnimationInProgress,
  technologiesSelected,
  setMainCharacterZoomAnimationInProgress,
}) => {
  const isDay = useContext(isDayContext);
  const { allAnimationFinished } = useContext(AllAnimationFinished);

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

  return (
    <Spring
      native
      from={{
        width: `${mainCharacterSize.width}%`,
        bottom: `${-mainCharacterSize.height}%`,
      }}
      to={{
        width: `${mainCharacterSize.width}%`,
        bottom: `${5}%`,
      }}
      onStart={() => {
        setMainCharacterZoomAnimationInProgress(true);
      }}
      onRest={() => {
        setMainCharacterAnimationFinished(true);

        if (!technologiesSelected) {
          setMainCharacterZoomAnimationInProgress(false);
        }
      }}
    >
      {({ width, bottom }) => {
        return (
          <StyledMainCharacter
            style={{
              width: width,
              bottom: bottom,
            }}
          >
            <StyledDog>
              <Lottie
                isStopped={houseZoomAnimationInProgress}
                options={dogDefaultOptions}
              />
            </StyledDog>
            <Man />
            {allAnimationFinished ? (
              <Spring
                from={{ width: "0%" }}
                to={{ width: isDay ? "0%" : "25%" }}
              >
                {(props) => (
                  <StyledFire style={props}>
                    <Lottie
                      isStopped={isDay || houseZoomAnimationInProgress}
                      options={fireDefaultOptions}
                    />
                  </StyledFire>
                )}
              </Spring>
            ) : null}
          </StyledMainCharacter>
        );
      }}
    </Spring>
  );
};

export default MainCharacter;
