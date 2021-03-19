import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 58.08 58.08"
      {...props}
    >
      <defs>
        <radialGradient
          id="radial-gradient"
          cx={51.35}
          cy={-42.88}
          r={45.61}
          gradientTransform="matrix(.63 0 0 .66 -3.14 57.26)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.12} stopColor="#feff13" />
          <stop offset={0.23} stopColor="#feff1d" />
          <stop offset={0.41} stopColor="#feff37" />
          <stop offset={0.64} stopColor="#feff61" />
          <stop offset={0.91} stopColor="#ffff9c" />
          <stop offset={1} stopColor="#ffffb1" />
        </radialGradient>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <circle
          cx={29.04}
          cy={29.04}
          r={29.04}
          style={{
            fill: "url(#radial-gradient)",
          }}
          id="Layer_1-2"
          data-name="Layer 1"
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
