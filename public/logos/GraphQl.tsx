import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 17.1 19.93"
      {...props}
    >
      <defs>
        <symbol
          id="logoTemplate"
          data-name="logoTemplate"
          viewBox="0 0 17 19.89"
        >
          <circle
            cx={8.5}
            cy={11.39}
            r={8.5}
            style={{
              fill: "none",
            }}
          />
          <path
            d="M8.55 3.66a3 3 0 0 1-.36-2A3 3 0 0 1 9.11 0l.89.37a4.37 4.37 0 0 0-1 1.4 4.3 4.3 0 0 0-.45 1.89z"
            style={{
              fill: "#661300",
              fillRule: "evenodd",
            }}
          />
        </symbol>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g id="Logos">
            <circle
              cx={8.5}
              cy={11.43}
              r={8.5}
              style={{
                fill: "#b3ecf2",
              }}
            />
            <path
              d="M16.26 14.91a8.52 8.52 0 0 1-15.53 0A8.61 8.61 0 0 1 .73 8h15.53a8.57 8.57 0 0 1 0 6.94z"
              style={{
                fill: "#8ae3ff",
              }}
            />
            <path
              transform="rotate(-60 6.636 12.607)"
              style={{
                fill: "#e535ab",
              }}
              d="M2.34 12.38h8.6v.45h-8.6z"
            />
            <path
              style={{
                fill: "#e535ab",
              }}
              d="M4.21 15.62h8.6v.45h-8.6z"
            />
            <path
              transform="rotate(-60 6.636 16.926)"
              style={{
                fill: "#e535ab",
              }}
              d="M6.42 14.44h.45v4.97h-.45z"
            />
            <path
              transform="rotate(-60 10.376 10.448)"
              style={{
                fill: "#e535ab",
              }}
              d="M10.15 7.96h.45v4.97h-.45z"
            />
            <path
              transform="rotate(-30 6.643 10.44)"
              style={{
                fill: "#e535ab",
              }}
              d="M4.16 10.22h4.97v.45H4.16z"
            />
            <path
              transform="rotate(-30 10.383 12.602)"
              style={{
                fill: "#e535ab",
              }}
              d="M10.16 8.31h.45v8.6h-.45z"
            />
            <path
              style={{
                fill: "#e535ab",
              }}
              d="M4.55 11.2H5v4.97h-.45zM12.02 11.2h.45v4.97h-.45z"
            />
            <path
              transform="rotate(-30 10.386 16.923)"
              style={{
                fill: "#e535ab",
              }}
              d="M8.22 16.73h4.32v.39H8.22z"
            />
            <path
              d="M13.06 16.31a1 1 0 0 1-1.28.35.94.94 0 1 1 1.28-.35M5.58 12a.94.94 0 1 1-.35-1.28.95.95 0 0 1 .35 1.28M4 16.31a.93.93 0 1 1 1.28.35.94.94 0 0 1-1.28-.35M11.44 12a.93.93 0 1 1 1.28.35 1 1 0 0 1-1.28-.35M8.51 18.94a.94.94 0 1 1 .94-.94.94.94 0 0 1-.94.94M8.51 10.3a.94.94 0 1 1 .94-.94.94.94 0 0 1-.94.94"
              style={{
                fill: "#e535ab",
              }}
            />
            <text
              transform="translate(3.83 7)"
              style={{
                fontSize: "2.32px",
                stroke: "#000",
                strokeMiterlimit: 10,
                strokeWidth: ".15px",
                fontFamily: "MyriadPro-Regular,Myriad Pro",
                letterSpacing: ".08em",
              }}
            >
              G
              <tspan
                x={1.69}
                y={0}
                style={{
                  letterSpacing: ".08em",
                }}
              >
                r
              </tspan>
              <tspan x={2.63} y={0}>
                aphQl
              </tspan>
            </text>
            <use
              width={17}
              height={19.89}
              transform="translate(.1)"
              xlinkHref="#logoTemplate"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SvgComponent;
