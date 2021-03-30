import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 86.17 86.17"
      {...props}
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            style={{
              stroke: "#2e3192",
              strokeWidth: 7,
              fill: "none",
              strokeLinecap: "round",
              strokeMiterlimit: 10,
            }}
            d="M61.58 25.86 24.6 60.31M25.54 24.9l35.09 36.37"
          />
          <circle
            cx={43.09}
            cy={43.09}
            r={40.59}
            style={{
              stroke: "#29abe2",
              strokeWidth: 5,
              fill: "none",
              strokeLinecap: "round",
              strokeMiterlimit: 10,
            }}
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgComponent;
