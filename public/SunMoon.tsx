// @ts-nocheck
import * as React from "react";

import { animated, useSpring } from "react-spring";

function SvgComponent({ isDay }) {
  const innerStyles = useSpring({
    opacity: isDay ? 0 : 1,
    backgroundFill: isDay ? "#ffff9d" : "#e6e6e6",
    from: { opacity: 0, backgroundFill: "#ffff9d" },
  });

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.34 27.34">
      <animated.circle
        cx={13.67}
        cy={13.67}
        r={13.67}
        fill={innerStyles.backgroundFill}
      />
      <animated.g style={{ opacity: innerStyles.opacity }}>
        <path
          d="M14.85 11.87a2.82 2.82 0 0 1-.11.83 3.64 3.64 0 1 1-4-4.44h.45a3.65 3.65 0 0 1 3.66 3.61z"
          style={{
            fill: "#999999",
          }}
        />
        <path
          d="M14.85 11.87a3.52 3.52 0 0 1 0 .42 3.87 3.87 0 0 1-.85 1.92 4.41 4.41 0 0 0 0-2.61 4 4 0 0 0-4.93-2.69 3.81 3.81 0 0 1 2.13-.68 3.41 3.41 0 0 1 1.27.23 3.65 3.65 0 0 1 1.58 1.14 3.81 3.81 0 0 1 .8 2.27z"
          style={{
            fill: "#808080",
          }}
        />
        <path
          d="M24.54 8.23a2.07 2.07 0 0 1-.06.5 2.19 2.19 0 1 1-2.41-2.68h.27a2.21 2.21 0 0 1 2.2 2.18z"
          style={{
            fill: "#999999",
          }}
        />
        <path
          d="M24.54 8.23v.25A2.28 2.28 0 0 1 24 9.64a2.65 2.65 0 0 0 0-1.58 2.44 2.44 0 0 0-2.94-1.62A2.28 2.28 0 0 1 22.34 6a2.1 2.1 0 0 1 .77.14 2.2 2.2 0 0 1 .95.69 2.26 2.26 0 0 1 .48 1.4z"
          style={{
            fill: "#808080",
          }}
        />
        <path
          d="M17.36 22.77a1.61 1.61 0 0 1-.06.44 2 2 0 1 1-2.15-2.38h.25a2 2 0 0 1 1.96 1.94z"
          style={{
            fill: "#999999",
          }}
        />
        <path
          d="M17.36 22.77a1.18 1.18 0 0 1 0 .22 2 2 0 0 1-.45 1 2.31 2.31 0 0 0 0-1.4 2.21 2.21 0 0 0-1-1.22 2.24 2.24 0 0 0-1.64-.22 2.07 2.07 0 0 1 1.15-.37 1.92 1.92 0 0 1 .68.12 2.06 2.06 0 0 1 .85.62 2.08 2.08 0 0 1 .41 1.25z"
          style={{
            fill: "#808080",
          }}
        />
      </animated.g>
    </svg>
  );
}

export default SvgComponent;
