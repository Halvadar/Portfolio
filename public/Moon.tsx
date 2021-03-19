import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 59.05 63.84"
      {...props}
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1={12.88}
          y1={23.34}
          x2={68.07}
          y2={55.36}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#999" />
          <stop offset={0.17} stopColor="#a2a2a2" />
          <stop offset={0.44} stopColor="#bababa" />
          <stop offset={0.78} stopColor="#e2e2e2" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <path
          d="M59.05 31.18A32.66 32.66 0 0 1 0 50.42a32.41 32.41 0 0 0 42.86-30.66A32.23 32.23 0 0 0 36.13 0a32.66 32.66 0 0 1 22.92 31.18z"
          style={{
            fill: "url(#linear-gradient)",
          }}
          id="Layer_1-2"
          data-name="Layer 1"
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
