import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 31.82 37.46"
      {...props}
    >
      <defs>
        <symbol id="soko" data-name="soko" viewBox="0 0 14.94 17.5">
          <path
            d="M.21 6.59c.11 1.26 4.62 1.92 7.55 1.92 2.5 0 6.85-.47 7-1.71s-3.49-3-7-3.09C4 3.59.1 5.38.21 6.59z"
            style={{
              stroke: "#000",
              strokeMiterlimit: 10,
              strokeWidth: ".25px",
              fill: "#e6e6e6",
            }}
          />
          <path
            d="M4.42 16.41c-.69-.78.25-1.89.74-4.87.53-3.28.08-4.34.92-5.52A1.88 1.88 0 0 1 9 5.65c.84 1 .28 2.31.84 5.64.52 3.07 1.65 4.4.91 5.21-.3.33-1.15.34-2.85.34-2.06-.01-3.11-.01-3.48-.43z"
            style={{
              fill: "#c69c6d",
              stroke: "#000",
              strokeMiterlimit: 10,
              strokeWidth: ".25px",
            }}
          />
          <path
            d="M14.68 6.94c-.52.78-2.41-.53-7-.7-4.86-.18-7 1.14-7.48.33C-.5 5.31 3.47-.26 8.17.15c4.3.37 7.32 5.59 6.51 6.79z"
            style={{
              fill: "#d90000",
              stroke: "#000",
              strokeMiterlimit: 10,
              strokeWidth: ".25px",
            }}
          />
          <circle
            cx={3.74}
            cy={4.53}
            r={1.18}
            style={{
              fill: "#f2f2f2",
            }}
          />
          <circle
            cx={7.91}
            cy={2.52}
            r={1.18}
            style={{
              fill: "#f2f2f2",
            }}
          />
          <circle
            cx={11.61}
            cy={4.83}
            r={1.18}
            style={{
              fill: "#f2f2f2",
            }}
          />
          <path
            d="M2.55 17.5a2.45 2.45 0 0 0 .55-1.75A2.79 2.79 0 0 0 .51 13.5 6.64 6.64 0 0 1 5 14.56a6.35 6.35 0 0 1 1.79 1.89 3.11 3.11 0 0 1 .51-1.87 3.23 3.23 0 0 1 1.95-1.34 2.27 2.27 0 0 0-.55 1.85 2.23 2.23 0 0 0 1.09 1.51 6.62 6.62 0 0 1 1.68-1.53 6.73 6.73 0 0 1 3.12-1 2.78 2.78 0 0 0-2.25 2.17 2.11 2.11 0 0 0 .25 1.23z"
            style={{
              fill: "#3b9f3d",
            }}
          />
        </symbol>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <use
          width={14.94}
          height={17.5}
          transform="matrix(2.15 0 0 2.15 -.14 -.14)"
          xlinkHref="#soko"
          id="Layer_1-2"
          data-name="Layer 1"
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
