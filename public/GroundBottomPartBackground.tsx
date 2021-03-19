import * as React from "react";
import { useContext } from "react";
import { animated, useSpring } from "react-spring";
import { isDayContext } from "../components/Header";

function SvgComponent(props) {
  const isDay = useContext(isDayContext);
  const groundStyle = useSpring({
    from: { fill: "#8cbc4b" },
    fill: isDay ? "#8cbc4b" : "#6c943d",
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920.91 4197.13"
      {...props}
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <animated.path
            d="M.64 0c.16 172.6.36 2787.91.49 4181.87h1919.41c0-1394-.06-4009.27-.09-4181.87z"
            style={groundStyle}
          />
          <path
            d="M1920.62 88.77a184 184 0 0 1-52 37.82c-96.62 46.52-188.79-41.69-317.37-41.88-128-.18-163 19.87-295.8 27-231.4 12.45-242.17-42.12-429.52-31.07C632.24 92.09 603 152.83 391 182 226.52 204.58 88.75 189.35.62 173.86v4010.07h1920z"
            style={{
              opacity: 0.02,
            }}
          />
          <path
            d="M1920 77a184 184 0 0 1-52 37.82c-96.63 46.52-188.83-41.69-317.41-41.88-128-.18-163 19.87-295.8 27-231.4 12.45-242.17-42.12-429.52-31.07-193.69 11.43-223 72.17-434.91 101.3C225.9 192.81 88.13 177.58 0 162.09.17 281 .34 3230.16.51 4190.7h1919.41c.08-1189.61.08-3966.41.08-4113.7z"
            style={{
              opacity: 0.02,
            }}
          />
          <path
            d="M1920.91 69.13A183.59 183.59 0 0 1 1869 107c-96.63 46.53-188.84-41.69-317.41-41.87-128-.18-163 19.87-295.8 27C1024.35 104.54 1013.57 50 826.23 61c-193.7 11.42-223 72.16-434.92 101.3-164.5 22.61-302.26 7.38-390.4-8.11C1 276 1.17 3213.27 1.3 4197.13h1919.41c.07-1212.93.14-3977.82.2-4128z"
            style={{
              opacity: 0.02,
            }}
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgComponent;
