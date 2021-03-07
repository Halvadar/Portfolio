import React, { useMemo } from "react";
import { Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import Lottie from "react-lottie";
import House from "../public/House.svg";
import Log from "../public/Log.svg";
import Smoke from "../public/Smoke.json";
import useWindowSize from "../hooks/useWindowSize";

interface StyledHouseLog {
  width: number;
  top: number;
}

const StyledHouse = styled.div<StyledHouseLog>`
  position: absolute;
  width: ${(props) => `${props.width}%`};
  top: ${(props) => `${props.top}%`};
  z-index: 2;
`;
const StyledLog = styled.div<StyledHouseLog>`
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
  setHouseAnimationFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const HouseAnimation: React.FunctionComponent<HouseAnimationProps> = ({
  leftMountain,
  houseLogSize,
  houseLogDistanceFromTop,
  logDistanceFromLeft,
  setHouseAnimationFinished,
}) => {
  const [windowWidth, windowHeight, windowHeightIsGreater] = useWindowSize();

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
        onRest={() => setHouseAnimationFinished(true)}
        from={{ left: `-${houseLogSize.house.width}%` }}
        to={{ left: "10%" }}
      >
        {(props) => (
          <StyledHouse
            top={houseLogDistanceFromTop.houseDistanceFromTop}
            width={houseLogSize.house.width}
            style={props}
          >
            <StyledSmoke>
              <Lottie options={smokeDefaultOptions} />
            </StyledSmoke>
            <House />
          </StyledHouse>
        )}
      </Spring>
      <Spring
        from={{ left: `-${houseLogSize.log.width}%` }}
        to={{ left: `${logDistanceFromLeft}%` }}
      >
        {(props) => (
          <StyledLog
            top={houseLogDistanceFromTop.logDistanceFromTop}
            width={houseLogSize.log.width}
            style={props}
          >
            <Log />
          </StyledLog>
        )}
      </Spring>
    </>
  );
};

export default HouseAnimation;
