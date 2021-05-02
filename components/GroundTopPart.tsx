import React, { useEffect, useRef, useState } from "react";
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
import { groundTopPartHeightCalculator } from "../functions/groundFunctions";

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

interface GroundTopPartProps {
  windowHeight: number;
  windowWidth: number;
  windowRatio: number;
  setGroundTopPartBackgroundHeight: React.Dispatch<
    React.SetStateAction<number>
  >;
  navbarItemSelected: boolean;
  projectsSelected: boolean;
}

const GroundTopPart: React.FunctionComponent<GroundTopPartProps> = ({
  windowHeight,
  windowWidth,
  windowRatio,
  setGroundTopPartBackgroundHeight,
}) => {
  // refs

  const groundTopPartBackgroundRef = useRef(null);

  useEffect(() => {
    setGroundTopPartBackgroundHeight(
      groundTopPartHeightCalculator(windowHeight, windowWidth, windowRatio)
    );
  }, [
    windowWidth,
    windowHeight,
    windowRatio,
    setGroundTopPartBackgroundHeight,
  ]);

  return (
    <StyledTopPart>
      <StyledTopPartBackground ref={groundTopPartBackgroundRef}>
        <GroundTopPartBackground />
      </StyledTopPartBackground>
    </StyledTopPart>
  );
};

export default GroundTopPart;
