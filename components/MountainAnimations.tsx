import React, { useMemo } from "react";
import { animated } from "react-spring";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops.cjs";
import {
  mountainDistanceFromSidesCalculator,
  mountainWidthsCalculator,
} from "../functions/mountainFunctions";
import useWindowSize from "../hooks/useWindowSize";
import LeftMountain from "../public/LeftMountain.svg";
import RightMountain from "../public/RightMountain.svg";
import { round } from "../functions/utilityFunctions";

interface StyledMountainProps {
  width: number;
  top: number;
  left?: number;
  right?: number;
}

const StyledMountain = styled(animated.div)<StyledMountainProps>`
  width: ${(props: StyledMountainProps) => `${props.width}%`};
  position: absolute;
  top: ${(props: StyledMountainProps) => `${props.top}%`};
  left: ${(props: StyledMountainProps) =>
    props.left ? `${props.left}%` : null};
  right: ${(props: StyledMountainProps) =>
    props.right ? `${props.right}%` : null};
  > svg {
    display: block;
  }
`;

interface MountainAnimationsProps {
  leftMountain: { width: number; height: number };
  rightMountain: { width: number; height: number };
}

const MountainAnimations: React.FunctionComponent<MountainAnimationsProps> = ({
  leftMountain,
  rightMountain,
}) => {
  const mountainDistanceFromSides = useMemo<number>(
    () =>
      mountainDistanceFromSidesCalculator({
        leftMountainWidth: leftMountain.width,
        rightMountainWidth: rightMountain.width,
      }),
    [leftMountain, rightMountain]
  );

  return (
    <>
      <Spring
        from={{ left: `-${leftMountain.width}%` }}
        to={{ left: `${mountainDistanceFromSides}%` }}
      >
        {(props) => (
          <StyledMountain
            style={props}
            width={leftMountain.width}
            top={5}
            left={20}
          >
            <LeftMountain />
          </StyledMountain>
        )}
      </Spring>
      <Spring
        from={{ right: `-${rightMountain.width}%` }}
        to={{ right: `${mountainDistanceFromSides}%` }}
      >
        {(props) => (
          <StyledMountain
            style={props}
            width={rightMountain.width}
            top={round(5 + leftMountain.height - rightMountain.height)}
          >
            <RightMountain />
          </StyledMountain>
        )}
      </Spring>
    </>
  );
};

export default MountainAnimations;
