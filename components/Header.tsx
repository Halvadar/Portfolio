import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import Animation from "./Animation";
import DayNightButton from "./DayNightButton";

export const isDayContext = createContext(false);
export const AllAnimationFinished = createContext(null);
export const lottieAnimationsShouldBeStoppedContext = createContext(null);
const StyledHeader = styled(animated.div)`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const [clientHydrated, setClientHydrated] = useState(false);
  const [isDay, setIsDay] = useState(true);
  const [
    lottieAnimationsShouldBeStopped,
    setLottieAnimationsShouldBeStopped,
  ] = useState(true);
  const [allAnimationFinished, setAllAnimationFinished] = useState(false);

  useEffect(() => {
    setClientHydrated(true);

    const localIsDay = window.localStorage.getItem("isDay");

    if (localIsDay) {
      setIsDay(JSON.parse(window.localStorage.getItem("isDay")));
    }
  }, []);

  const skyColor = useSpring({
    backgroundColor: isDay ? "#6ae7ff" : "#000057",
    from: { backgroundColor: "#6ae7ff" },
  });

  return (
    <StyledHeader style={skyColor}>
      {clientHydrated && (
        <isDayContext.Provider value={isDay}>
          <AllAnimationFinished.Provider
            value={{ allAnimationFinished, setAllAnimationFinished }}
          >
            <lottieAnimationsShouldBeStoppedContext.Provider
              value={{
                lottieAnimationsShouldBeStopped,
                setLottieAnimationsShouldBeStopped,
              }}
            >
              <Animation />
            </lottieAnimationsShouldBeStoppedContext.Provider>
          </AllAnimationFinished.Provider>
          <DayNightButton setIsDay={setIsDay} />
        </isDayContext.Provider>
      )}
    </StyledHeader>
  );
};

export default Header;
