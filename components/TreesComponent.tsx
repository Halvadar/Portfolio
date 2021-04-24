import React, { useContext } from "react";
import { Spring, animated, interpolate } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import Lottie from "react-lottie";
import {
  AllAnimationFinished,
  lottieAnimationsShouldBeStoppedContext,
} from "./Header";
import coordinateList from "../public/coordinateList";
import animationData from "../public/Tree.json";

interface StyledTreeContainerProps {
  height: number;
}

const StyledTreeContainer = styled(animated.div)<StyledTreeContainerProps>`
  width: 100%;
  height: ${(props) => `${props.height}%`};
  position: absolute;
  z-index: 2;
`;

interface TreesComponentProps {
  groundTopPartDistanceFromTop: number;
  groundTopPartBackgroundHeight: number;
  blurred: boolean;
}

const TreesComponent: React.FunctionComponent<TreesComponentProps> = ({
  groundTopPartDistanceFromTop,
  groundTopPartBackgroundHeight,
  blurred,
}) => {
  const { setAllAnimationFinished } = useContext(AllAnimationFinished);
  const { lottieAnimationsShouldBeStopped } = useContext(
    lottieAnimationsShouldBeStoppedContext
  );
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Spring
        native
        from={{
          top: `${groundTopPartDistanceFromTop + 10}%`,
          filterProp: 0,
        }}
        to={{
          top: `${groundTopPartDistanceFromTop}%`,
          filterProp: blurred ? 1 : 0,
        }}
        onRest={() => setAllAnimationFinished(true)}
      >
        {({ top, filterProp }) => (
          <StyledTreeContainer
            height={groundTopPartBackgroundHeight}
            style={{
              filter: interpolate(
                [filterProp],
                (s) => `blur(${s * 4}px) grayscale(${s * 90}%)`
              ),
              top: top,
            }}
          >
            {coordinateList.map(({ width, left, bottom, id, zIndex }) => {
              return (
                <div
                  key={id}
                  style={{
                    position: "absolute",
                    width: `${width}%`,
                    bottom: `${bottom}%`,
                    left: `${left}%`,
                    zIndex: zIndex || 0,
                  }}
                >
                  <Lottie
                    isStopped={lottieAnimationsShouldBeStopped}
                    speed={0.5}
                    isClickToPauseDisabled
                    options={defaultOptions}
                  />
                </div>
              );
            })}
          </StyledTreeContainer>
        )}
      </Spring>
      )
    </>
  );
};

export default TreesComponent;
