import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17.87 17.87"
      {...props}
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            d="M8.93 17.76C8.57 9.63 8.2 9.3 0 8.93c8.23-.36 8.57-.7 8.94-8.93.36 8.23.69 8.57 8.93 8.94-8.2.36-8.57.69-8.94 8.82z"
            style={{
              fill: "#ffff67",
            }}
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgComponent;
