import React, { useContext, useMemo } from "react";
import { animated, interpolate, Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import Lottie from "react-lottie";
import House from "../public/House";
import Log from "../public/Log";
import Smoke from "../public/Smoke.json";
import WindowComponent from "./WindowComponent";

interface StyledHouseLog {
  width: number;
  top: number;
  zIndex?: number;
}

const StyledHouse = styled(animated.div)<StyledHouseLog>`
  position: absolute;
  width: ${(props) => `${props.width}%`};
  top: ${(props) => `${props.top}%`};
  z-index: ${(props) => props.zIndex};
  > svg {
    display: block;
  }
`;
const StyledLog = styled(animated.div)<StyledHouseLog>`
  width: ${(props) => `${props.width}%`};
  top: ${(props) => `${props.top}%`};
  position: absolute;
`;
const StyledSmoke = styled.div`
  position: absolute;
  width: 100%;
  left: -5%;
  top: -40%;
`;

interface HouseAnimationProps {
  leftMountain: { width: number; height: number };
  houseLogSize: {
    house: { width: number; height: number };
    log: { width: number; height: number };
  };
  houseLogDistanceFromTop: {
    houseDistanceFromTop: number;
    logDistanceFromTop: number;
  };
  logDistanceFromLeft: number;
  blurred: boolean;
  projectsSelected: boolean;
}

const HouseAnimation: React.FunctionComponent<HouseAnimationProps> = ({
  houseLogSize,
  houseLogDistanceFromTop,
  logDistanceFromLeft,
  blurred,
  projectsSelected,
}) => {
  const smokeDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Smoke,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Spring
        native
        from={{
          left: `-${houseLogSize.house.width}%`,
          filterProp: 0,
          logLeft: `-${houseLogSize.log.width}%`,
        }}
        to={{
          left: "10%",
          filterProp: blurred ? 1 : 0,
          logLeft: `${logDistanceFromLeft}%`,
        }}
      >
        {({ left, filterProp, logLeft }) => (
          <>
            <StyledHouse
              zIndex={projectsSelected ? 10 : 3}
              top={houseLogDistanceFromTop.houseDistanceFromTop}
              width={houseLogSize.house.width}
              style={{
                left: left,
                filter: interpolate([filterProp], (s) => `blur(${s * 4}px)`),
              }}
            >
              <StyledSmoke>
                <Lottie options={smokeDefaultOptions} />
              </StyledSmoke>
              <House />
              <WindowComponent projectsSelected={projectsSelected} />
            </StyledHouse>
            <StyledLog
              top={houseLogDistanceFromTop.logDistanceFromTop}
              width={houseLogSize.log.width}
              style={{
                left: logLeft,
                filter: interpolate([filterProp], (s) => `blur(${s * 4}px)`),
              }}
            >
              <Log />
            </StyledLog>
          </>
        )}
      </Spring>
    </>
  );
};

export default HouseAnimation;
