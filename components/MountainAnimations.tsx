import React, { useContext, useMemo } from "react";
import { animated, Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import { mountainDistanceFromSidesCalculator } from "../functions/mountainFunctions";
import LeftMountain from "../public/LeftMountain";
import RightMountain from "../public/RightMountain";
import Cloud from "../public/Cloud";
import Star from "../public/Star";
import { round } from "../functions/utilityFunctions";
import { cloudStarPropsCalculator } from "../functions/cloudFunctions";
import { isDayContext } from "./Header";

interface StyledCloudStarProps {
  width?: number;
  top: number;
  left?: number;
}

const StyledCloud = styled(animated.div)<StyledCloudStarProps>`
  position: absolute;
  width: ${(props) => `${props.width}%`};
  top: ${(props) => `${props.top}%`};
  z-index: 2;
`;

const StyledStar = styled(animated.div)<StyledCloudStarProps>`
  position: absolute;
  top: ${(props) => `${props.top}%`};
  left: ${(props) => `${props.left}%`};
  z-index: 0;
`;

interface StyledMountainProps {
  width: number;
  top: number;
  left?: number;
  right?: number;
}

const StyledMountain = styled(animated.div)<StyledMountainProps>`
  width: ${(props: StyledMountainProps) => `${props.width}%`};
  position: absolute;
  z-index: 1;
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
  windowHeight: number;
  windowWidth: number;
  windowHeightIsGreater: boolean;
  leftMountain: { width: number; height: number };
  rightMountain: { width: number; height: number };
  setMountainAnimationFinished: React.Dispatch<React.SetStateAction<boolean>>;
  mountainAnimationFinished: boolean;
}

const MountainAnimations: React.FunctionComponent<MountainAnimationsProps> = ({
  windowHeight,
  windowWidth,
  windowHeightIsGreater,
  leftMountain,
  rightMountain,
  setMountainAnimationFinished,
  mountainAnimationFinished,
}) => {
  const mountainDistanceFromSides = useMemo<number>(
    () =>
      mountainDistanceFromSidesCalculator({
        leftMountainWidth: leftMountain.width,
        rightMountainWidth: rightMountain.width,
      }),
    [leftMountain, rightMountain]
  );
  const cloudStarProps = useMemo(
    () =>
      cloudStarPropsCalculator(
        windowHeight,
        windowWidth,
        leftMountain.height,
        windowHeightIsGreater
      ),
    [windowHeight, windowWidth, leftMountain.height, windowHeightIsGreater]
  );
  const isDay = useContext(isDayContext);

  return (
    <div style={{ height: "100%" }}>
      <Spring
        from={{ left: `-${leftMountain.width}%` }}
        to={{ left: `${mountainDistanceFromSides}%` }}
        onRest={() => setMountainAnimationFinished(true)}
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
      {mountainAnimationFinished &&
        cloudStarProps.cloudCoordinates.map((cloud) => {
          const { left, top, width, id } = cloud;

          return (
            <Spring key={id} from={{ left: "-10%" }} to={{ left: `${left}%` }}>
              {(props) => (
                <StyledCloud style={props} top={top} width={width}>
                  <Cloud />
                </StyledCloud>
              )}
            </Spring>
          );
        })}
      {mountainAnimationFinished &&
        cloudStarProps.starCoordinates.map((star) => {
          const { left, top, width, id } = star;

          return (
            <Spring
              key={id}
              from={{ width: "0%" }}
              to={{ width: isDay ? "0%" : `${width}%` }}
            >
              {(props) => (
                <StyledStar style={props} left={left} top={top}>
                  <Star />
                </StyledStar>
              )}
            </Spring>
          );
        })}
    </div>
  );
};

export default MountainAnimations;
