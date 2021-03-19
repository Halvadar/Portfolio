// @ts-nocheck

import * as React from "react";
import { useSpring, animated } from "react-spring";

// 79.66
function SvgComponent({ isDay }) {
  const animationProps = useSpring({
    backgroundFill: isDay ? "#7bffff" : "#000045",
    from: {
      backgroundFill: "#7bffff",
      strokeFill: "#00ffff",

      craterOpacity: 0,
    },
    strokeFill: isDay ? "#00ffff" : "#2e3155",
    craterOpacity: isDay ? 0 : 1,
  });

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101.41 38.03">
      <animated.path
        d="M19 36.53a17.52 17.52 0 0 1 0-35h63.39a17.52 17.52 0 1 1 0 35z"
        style={{ fill: animationProps.backgroundFill }}
      />

      <animated.path
        d="M82.39 3a16 16 0 1 1 0 32H19a16 16 0 0 1 0-32h63.39m0-3H19A19 19 0 0 0 0 19a19 19 0 0 0 19 19h63.39a19 19 0 0 0 19-19 19 19 0 0 0-19-19z"
        style={{
          fill: animationProps.strokeFill,
        }}
      />
    </svg>
  );
}

export default SvgComponent;
