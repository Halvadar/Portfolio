import React, { useContext, useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import coordinateList from "../public/coordinateList";
import animationData from "../public/Tree.json";
import GroundTopPartBackground from "../public/GroundTopPartBackground";
import River from "../public/River.json";
import { percentifier, pixelRemover } from "../functions/utilityFunctions";
import {
  AllAnimationFinished,
  lottieAnimationsShouldBeStoppedContext,
} from "./Header";

const StyledTopPart = styled.div`
  position: relative;
  width: 100%;
  > svg {
    display: block;
  }
`;
const StyledTopPartBackground = styled.div`
  width: 100%;
  > svg {
    display: block;
  }
`;
const StyledRiver = styled.div`
  position: absolute;
  width: 39.2%;
  top: 2%;
  right: 0;
  z-index: 1;
`;

interface GroundTopPartProps {
  windowHeight: number;
  windowWidth: number;
  setGroundTopPartBackgroundHeight: React.Dispatch<
    React.SetStateAction<number>
  >;
  navbarItemSelected: boolean;
}

const GroundTopPart: React.FunctionComponent<GroundTopPartProps> = ({
  windowHeight,
  windowWidth,
  setGroundTopPartBackgroundHeight,
  navbarItemSelected,
}) => {
  const riverDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: River,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // refs

  const groundTopPartBackgroundRef = useRef(null);

  const { lottieAnimationsShouldBeStopped } = useContext(
    lottieAnimationsShouldBeStoppedContext
  );

  useEffect(() => {
    setGroundTopPartBackgroundHeight(
      percentifier(
        pixelRemover(
          window.getComputedStyle(groundTopPartBackgroundRef.current).height
        ),
        windowHeight
      )
    );
  }, [windowWidth, windowHeight, setGroundTopPartBackgroundHeight]);

  return (
    <StyledTopPart>
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
      <StyledTopPartBackground ref={groundTopPartBackgroundRef}>
        <GroundTopPartBackground />
      </StyledTopPartBackground>
      <StyledRiver>
        <Lottie
          isStopped={lottieAnimationsShouldBeStopped}
          options={riverDefaultOptions}
          isClickToPauseDisabled
        />
      </StyledRiver>
    </StyledTopPart>
  );
};

export default GroundTopPart;
