import React, { useContext } from "react";
import { animated, Spring } from "react-spring/renderprops.cjs";
import styled, { keyframes } from "styled-components";
import Sun from "../public/Sun";
import { isDayContext } from "./Header";

const StyledSun = styled(animated.div)`
  width: 6%;
  position: absolute;
  left: 5%;
  z-index: 0;
`;
const shadowAnimation = keyframes`
from{box-shadow: 0 0 70px 30px #ffffff};
to{box-shadow: 0 0 70px 40px #ffffff}
`;
const GlowingEffect = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  animation: ${shadowAnimation} 2s linear 0s infinite alternate;
`;

interface SunAnimationProps {
  leftMountainHeight: number;
  groundAnimationFinished: boolean;
}

const SunAnimation: React.FunctionComponent<SunAnimationProps> = ({
  leftMountainHeight,
  groundAnimationFinished,
}) => {
  const isDay = useContext(isDayContext);

  return (
    <>
      {groundAnimationFinished ? (
        <Spring
          native
          from={{ top: `${leftMountainHeight + 10}%` }}
          to={{
            top: isDay ? "5%" : `${leftMountainHeight + 10}%`,
          }}
        >
          {(props) => (
            <StyledSun style={props}>
              <Sun />
              {isDay && <GlowingEffect />}
            </StyledSun>
          )}
        </Spring>
      ) : null}
    </>
  );
};

export default SunAnimation;
