import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34.05 41.5"
      {...props}
    >
      <path
        style={{
          strokeMiterlimit: 10,
          stroke: "#754c24",
          fill: "#f6861f",
          strokeWidth: ".25px",
        }}
        d="M0 0h34.05v41.5H0z"
      />
      <path
        d="M0 0v20.45a34.78 34.78 0 0 0 10.53-8.37A34.87 34.87 0 0 0 17 .46a36.37 36.37 0 0 0 6.6 11.74 36.38 36.38 0 0 0 10.45 8.55V0z"
        style={{
          fill: "#c69c6d",
          strokeWidth: ".1px",
          strokeMiterlimit: 10,
          stroke: "#754c24",
        }}
      />
      <path
        style={{
          fill: "none",
          stroke: "#603813",
          strokeWidth: ".5px",
          strokeMiterlimit: 10,
        }}
        d="m0 20.45 34.05.3M17.03 0v41.5"
      />
    </svg>
  );
}

export default SvgComponent;
