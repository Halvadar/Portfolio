import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import coordinateList from "../public/coordinateList";
import animationData from "../public/Tree.json";
import GroundTopPartBackground from "../public/GroundTopPartBackground.svg";
import { groundTopPartDistanceFromBottomCalculator } from "../functions/groundFunctions";
import River from "../public/River.json";
import { percentifier, pixelRemover } from "../functions/utilityFunctions";

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
  leftMountain: { width: number; height: number };
  setGroundTopPartBackgroundHeight: React.Dispatch<
    React.SetStateAction<number>
  >;
}

const GroundTopPart: React.FunctionComponent<GroundTopPartProps> = ({
  windowHeight,
  windowWidth,
  leftMountain,
  setGroundTopPartBackgroundHeight,
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
  const treeSetStateInterval = useRef(null);
  const treeStateIndex = useRef(0);
  const groundTopPartBackgroundRef = useRef(null);
  const [treeStates, setTreeStates] = useState(() => {
    return coordinateList.map(() => {
      return { isStopped: false };
    });
  });

  useEffect(() => {
    setTreeStates(() => {
      const newTreeState = coordinateList.map(() => {
        return { isStopped: true };
      });

      return newTreeState;
    });

    const treeSetStateIntervalId = setInterval(() => {
      if (treeStateIndex.current > coordinateList.length - 1) {
        return clearInterval(treeSetStateInterval.current);
      }

      return setTreeStates((prevState) => {
        const newTreeState = [...prevState];

        newTreeState[treeStateIndex.current].isStopped = false;
        treeStateIndex.current += 1;

        return newTreeState;
      });
    }, 50);

    treeSetStateInterval.current = treeSetStateIntervalId;

    return () => {
      clearInterval(treeSetStateInterval.current);
    };
  }, []);
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
      {coordinateList.map(({ width, left, bottom, id, zIndex }, treeIndex) => {
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
              speed={0.7}
              isClickToPauseDisabled
              isStopped={treeStates[treeIndex].isStopped}
              options={defaultOptions}
            />
          </div>
        );
      })}
      <StyledTopPartBackground ref={groundTopPartBackgroundRef}>
        <GroundTopPartBackground />
      </StyledTopPartBackground>
      <StyledRiver>
        <Lottie options={riverDefaultOptions} isClickToPauseDisabled />
      </StyledRiver>
    </StyledTopPart>
  );
};

export default GroundTopPart;
