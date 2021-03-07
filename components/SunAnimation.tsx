import React from "react";
import { Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import Sun from "../public/Sun.svg";

const StyledSun = styled.div`
  width: 6%;
  position: absolute;
  left: 5%;
  z-index: 0;
`;

interface SunAnimationProps {
  leftMountainHeight: number;
  groundAnimationFinished: boolean;
}

const SunAnimation: React.FunctionComponent<SunAnimationProps> = ({
  leftMountainHeight,
  groundAnimationFinished,
}) => {
  return (
    <>
      {groundAnimationFinished ? (
        <Spring
          from={{ top: `${leftMountainHeight + 10}%` }}
          to={{ top: "5%" }}
        >
          {(props) => (
            <StyledSun style={props}>
              <Sun />
            </StyledSun>
          )}
        </Spring>
      ) : null}
    </>
  );
};

export default SunAnimation;
