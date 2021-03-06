import * as React from "react";
import { useContext } from "react";
import { animated, useSpring } from "react-spring";
import { isDayContext } from "../components/Header";

function SvgComponent(props) {
  const isDay = useContext(isDayContext);
  const rightMountainStyle = useSpring({
    from: { fill: "#55ff8e" },
    fill: isDay ? "#55ff8e" : "#1f5e37",
  });

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 360" {...props}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            d="m341.36 95.14-31.18 49.73-31.7-34.62-36.7 34.62L186 112 270 0z"
            style={{
              fill: "#a7fffd",
            }}
          />
          <animated.path
            d="M540 360H0l186-248 55.78 32.88 36.7-34.62 31.7 34.62 31.18-49.73z"
            style={rightMountainStyle}
          />
          <path
            d="M540 360 270 0q-78.09 179.49-156.17 359z"
            style={{
              opacity: 0.12,
            }}
          />
          <path
            d="M294.15 129.61c2.63 23.55 10.33 34.88 17.1 40.88a96.44 96.44 0 0 1 12.8 13.77c5.31 7 8.45 11.21 7.92 16.52-.25 2.6-1.43 5.89-10.36 14.32-9.46 8.94-13.68 10.48-17.95 14.49-14.72 13.83-1.79 30.49-16 60-3 6.22-5.11 10.62-9.86 15.59-12.79 13.39-26.39 11.72-37.87 23.33-3.93 4-9 10.9-11 23h13.41a34.16 34.16 0 0 1 6.71-14.72c2.19-2.78 5.32-5.85 14.63-11.57 11.26-6.91 14.66-7.33 19.51-10.46 18.89-12.21 21.34-41 22.26-51.71.86-10.2-.45-14.42 3.34-21.53 4.67-8.78 10.32-9.23 18.9-18.73 5.57-6.18 15.77-17.47 14-29.74-1.19-8.34-7.61-15.1-18.9-27-3.42-3.6-6.66-6.57-10.36-12.12a63.16 63.16 0 0 1-7.32-14.87z"
            style={{
              fill: "#35abe2",
            }}
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgComponent;
