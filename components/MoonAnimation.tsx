import React, { useContext } from "react";
import { animated, Spring } from "react-spring/renderprops.cjs";
import styled, { keyframes } from "styled-components";
import Moon from "../public/Moon";
import { isDayContext } from "./Header";

const StyledMoon = styled(animated.div)`
  width: 4%;
  position: absolute;
  right: 5%;
  z-index: 0;
  > svg {
    display: block;
  }
`;
const shadowAnimation = keyframes`
from{box-shadow: 0 0 70px 30px #b3aeff};
to{box-shadow: 0 0 70px 40px #b3aeff}
`;
const GlowingEffect = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  animation: ${shadowAnimation} 2s linear 0s infinite alternate;
`;

interface MoonAnimationProps {
  leftMountainHeight: number;
  groundAnimationFinished: boolean;
}

const MoonAnimation: React.FunctionComponent<MoonAnimationProps> = ({
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
            top: !isDay ? "5%" : `${leftMountainHeight + 10}%`,
          }}
        >
          {(props) => (
            <StyledMoon style={props}>
              <Moon />
              {!isDay && <GlowingEffect />}
            </StyledMoon>
          )}
        </Spring>
      ) : null}
    </>
  );
};

export default MoonAnimation;
