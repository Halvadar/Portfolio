import React, { useContext } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import Toggle from "../public/Toggle";
import { isDayContext } from "./Header";
import SunMoon from "../public/SunMoon";

const StyledToggle = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  width: 5%;
  cursor: pointer;
  > svg {
    display: block;
  }
`;
const StyledSunMoon = styled(animated.div)`
  position: absolute;
  top: 50%;
  left: 10%;
  width: 30%;
  height: 70%;
  > svg {
    top: -50%;
    height: 100%;
    display: block;
    position: relative;
  }
`;

interface DayNightButtonProps {
  setIsDay: React.Dispatch<React.SetStateAction<boolean>>;
}

const DayNightButton: React.FunctionComponent<DayNightButtonProps> = ({
  setIsDay,
}) => {
  const isDay = useContext(isDayContext);
  const sunMoonPosition = useSpring({
    from: { left: "10%" },
    left: isDay ? "10%" : "65%",
  });

  return (
    <StyledToggle
      onClick={() => {
        setIsDay(!isDay);
        window.localStorage.setItem("isDay", JSON.stringify(!isDay));
      }}
    >
      <Toggle isDay={isDay} />
      <StyledSunMoon style={sunMoonPosition}>
        <SunMoon isDay={isDay} />
      </StyledSunMoon>
    </StyledToggle>
  );
};

export default DayNightButton;
