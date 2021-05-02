import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 76.84 118.98"
      {...props}
    >
      <g id="Layer_2" data-name="Layer 2">
        <path
          d="M76.47 7.28v82.45a6.93 6.93 0 0 1-2.93 5.64l-31.14 22a6.92 6.92 0 0 1-8 0l-31.1-22a6.89 6.89 0 0 1-2.92-5.64V7.28a6.9 6.9 0 0 1 6.9-6.9h62.28a6.91 6.91 0 0 1 6.91 6.9z"
          style={{
            fill: "#fff",
            stroke: "#000",
            strokeMiterlimit: 10,
            strokeWidth: ".75px",
          }}
          id="Layer_1-2"
          data-name="Layer 1"
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
