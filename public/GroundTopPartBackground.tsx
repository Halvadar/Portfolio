import * as React from "react";
import { useContext } from "react";
import { animated, useSpring } from "react-spring";
import { isDayContext } from "../components/Header";

function SvgComponent(props) {
  const isDay = useContext(isDayContext);
  const topGroundStyle = useSpring({
    from: { fill: "#8cbc4b" },
    fill: isDay ? "#8cbc4b" : "#6c943d",
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1919.83 73.65"
      {...props}
    >
      <defs>
        <style />
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <animated.path
          d="M1919.82 28.51a289.94 289.94 0 0 0-46-8.18c-31.65-3-56.79-.33-83.69 2.81-26.33 3.07-45.72 6.94-49.49 7.68-72.22 14.31-148.64 29.46-222.28 27.27-50.78-1.5-98.15-12.29-155.32-25.93l-9.53-2.29c-12.88-3.08-26.28-6.28-40.34-9.54-39.69-9.19-54.84-13.48-82.8-15.37-48.74-3.29-93.37 3.71-122.37 8.39-29.33 4.74-50.46 9.91-55.8 11.19-79.6 19-227.67 25.61-379.76 9.78-88.11-9.17-109.75-18.81-152-25.53-28.53-4.55-50-5.61-69.44-6.63-126.23-6.63-224 4.11-224 4.11a1229.16 1229.16 0 0 0-227 47V76h1919.83q-.01-23.75-.01-47.49z"
          style={topGroundStyle}
          id="Layer_1-2"
          data-name="Layer 1"
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
