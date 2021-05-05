import React, { useContext } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import { animated, Spring, interpolate } from "react-spring/renderprops.cjs";
import { lottieAnimationsShouldBeStoppedContext } from "./Header";
import River from "../public/River.json";
import useWindowSize from "../hooks/useWindowSize";

interface StyledRiverProps {
  top: number;
}

const StyledRiver = styled(animated.div)<StyledRiverProps>`
  position: absolute;
  width: 39.2%;
  top: ${(props) => `${props.top}%`};
  right: 0;
  z-index: 1;
`;

interface RiverComponentProps {
  groundTopPartDistanceFromTop: number;
  blurred: boolean;
}

const RiverComponent: React.FunctionComponent<RiverComponentProps> = ({
  groundTopPartDistanceFromTop,
  blurred,
}) => {
  const { mobileDevice } = useWindowSize();
  const riverDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: River,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { lottieAnimationsShouldBeStopped } = useContext(
    lottieAnimationsShouldBeStoppedContext
  );

  return (
    <Spring
      native
      from={{ filterProp: 0 }}
      to={{
        filterProp: blurred ? 1 : 0,
      }}
    >
      {({ filterProp }) => (
        <StyledRiver
          style={{
            filter: interpolate(
              [filterProp],
              (s) => `blur(${s * 4}px) grayscale(${s * 90}%)`
            ),
          }}
          top={groundTopPartDistanceFromTop + 0.5}
        >
          <Lottie
            isStopped={lottieAnimationsShouldBeStopped}
            options={riverDefaultOptions}
            isClickToPauseDisabled
          />
        </StyledRiver>
      )}
    </Spring>
  );
};

export default RiverComponent;
