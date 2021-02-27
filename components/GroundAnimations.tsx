import React, { useState } from "react";
import { Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import GroundBottomPart from "./GroundBottomPart";
import GroundTopPart from "./GroundTopPart";
import SpringWrapper from "./SpringWrapper";

interface GroundAnimationsProps {
  windowWidth: number;
  windowHeight: number;
  leftMountain: { height: number; width: number };
  rightMountain: { height: number; width: number };
}

const StyledGround = styled.div`
  width: 100%;
  position: absolute;
`;
const GroundAnimations: React.FunctionComponent<GroundAnimationsProps> = ({
  windowWidth,
  windowHeight,
  leftMountain,
  rightMountain,
}) => {
  const [
    groundTopPartBackgroundHeight,
    setGroundTopPartBackgroundHeight,
  ] = useState<number>(undefined);

  return (
    <>
      <SpringWrapper
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
