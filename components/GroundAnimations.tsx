import React, { useState } from "react";
import styled from "styled-components";
import GroundBottomPart from "./GroundBottomPart";
import GroundTopPart from "./GroundTopPart";
import SpringWrapper from "./SpringWrapper";

const StyledGround = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
`;

interface GroundAnimationsProps {
  windowWidth: number;
  windowHeight: number;
  leftMountain: { height: number; width: number };
  groundAnimationFinished: boolean;
  setGroundAnimationFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroundAnimations: React.FunctionComponent<GroundAnimationsProps> = ({
  windowWidth,
  windowHeight,
  leftMountain,
  groundAnimationFinished,
  setGroundAnimationFinished,
}) => {
  const [
    groundTopPartBackgroundHeight,
    setGroundTopPartBackgroundHeight,
  ] = useState<number>(undefined);

  return (
    <>
      <SpringWrapper
        onRestCallback={setGroundAnimationFinished}
        animationCanBeStarted={!!groundTopPartBackgroundHeight}
        springProps={
          groundTopPartBackgroundHeight
            ? {
                from: { top: "100%" },
                to: {
                  top: `${
                    5 + leftMountain.height - groundTopPartBackgroundHeight
                  }%`,
                },
              }
            : null
        }
        render={(props) => {
          return (
            <StyledGround style={props}>
              <GroundTopPart
                windowWidth={windowWidth}
                windowHeight={windowHeight}
                leftMountain={leftMountain}
                setGroundTopPartBackgroundHeight={
                  setGroundTopPartBackgroundHeight
                }
              />
              <GroundBottomPart
                groundAnimationFinished={groundAnimationFinished}
                windowWidth={windowWidth}
                windowHeight={windowHeight}
                leftMountain={leftMountain}
              />
            </StyledGround>
          );
        }}
      />
    </>
  );
};

export default GroundAnimations;
