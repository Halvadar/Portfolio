import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 85.92 24.94"
      {...props}
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            d="M15.65 15.34a51 51 0 0 1 25.9-9.84c24.1-1.93 40.52 15 42.87 17.53"
            style={{
              stroke: "#29ABE2",
              strokeLinecap: "round",
              strokeMiterlimit: 10,
              fill: "none",
              strokeWidth: 3,
            }}
          />
          <path
            d="M11.8 1.51Q6.3 13 .8 24.44l25.28-.05L15 15.54q-1.62-7.02-3.2-14.03z"
            style={{
              fill: "#29ABE2",
              stroke: "#2E3192",
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
