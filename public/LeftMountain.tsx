import * as React from "react";
import { useContext } from "react";
import { animated, useSpring } from "react-spring";

import { isDayContext } from "../components/Header";

function SvgComponent(props) {
  const isDay = useContext(isDayContext);
  const leftMountainStyle = useSpring({
    fill: isDay ? "#83e855" : "#003b22",
    from: { fill: "#83e855" },
  });

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 360" {...props}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            d="m341.36 95.14-30.25 46.39L273.46 106 233 137.26l-34.36-42.12L270 0z"
            style={{
              fill: "#a7fffd",
            }}
          />
          <animated.path
            d="m341.36 95.14-30.25 46.39L273.46 106 233 137.26l-15.9-19.51-18.46-22.61L0 360h540z"
            style={leftMountainStyle}
          />
          <path
            style={{
              opacity: 0.08,
            }}
            d="M540 360 270 0 91.78 360H540z"
          />
          <path
            d="M175.6 241.13c16.65-24.7 6.53-43.25 15.08-73.14 3.5-12.22 11-29.35 29-48.24l-4.46-5.46c-27.33 28.83-34.65 53.05-36.12 70.13-1.39 16.27 1.75 22.6-3.86 38.06-8.88 24.47-24.14 25.7-32.71 49.18-.21.6-.42 1.18-.61 1.75a71.06 71.06 0 0 1 7.86 4.81 50.93 50.93 0 0 1 5.55-14.34c7.17-12.76 11.44-9.65 20.27-22.75z"
            style={{
              fill: "#00b3ed",
            }}
          />
          <path
            d="M138.4 314.27c-.21.7-.44 1.41-.71 2.15-4.38 12.22-15.35 28.5-45.5 43.58h18.35c22.42-13.73 30.86-27.7 34.51-37.57 6.17-16.66 1.44-29.12 4.72-44.21a71.06 71.06 0 0 0-7.86-4.81c-6.11 18.39 1.43 24.81-3.51 40.86z"
            style={{
              fill: "#00b3ed",
            }}
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgComponent;
