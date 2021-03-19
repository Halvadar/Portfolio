import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 42.62 23.03"
      {...props}
    >
      <defs>
        <symbol
          id="New_Symbol_1"
          data-name="New Symbol 1"
          viewBox="0 0 33.18 17.93"
        >
          <path
            d="M10.59 17.93A13.29 13.29 0 0 0 8.05 8.5c-3.16-4.23-8.29-6-8-6.29s6.75 1.44 10.3 5.87a10.85 10.85 0 0 1 2.4 7.75A14.13 14.13 0 0 0 13 8C11.73 3.15 8.08.22 8.48 0s5.14 2.64 6.77 7.13c1.57 4.33-.47 8.21-.14 8.27s.54-4 3.53-8.06S25.77 1.13 26 1.27 22.58 3.79 19.91 8a19.46 19.46 0 0 0-2.82 7.23 17.43 17.43 0 0 1 6.35-6.39c4.41-2.67 9.56-3.47 9.74-3.17s-4.36 1.39-8.61 4.5a20.64 20.64 0 0 0-6.35 7.44z"
            style={{
              fill: "#00ad00",
            }}
          />
        </symbol>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <use
          width={33.18}
          height={17.93}
          transform="scale(1.28)"
          xlinkHref="#New_Symbol_1"
          id="Layer_1-2"
          data-name="Layer 1"
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
