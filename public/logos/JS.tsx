import * as React from "react";

function SvgComponent(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 17.1 20.06" {...props}><defs><symbol id="logoTemplate" data-name="logoTemplate" viewBox="0 0 17 19.89"><circle cx={8.5} cy={11.39} r={8.5} style={{
          fill: "none"
        }} /><path d="M8.55 3.66a3 3 0 0 1-.36-2A3 3 0 0 1 9.11 0l.89.37a4.37 4.37 0 0 0-1 1.4 4.3 4.3 0 0 0-.45 1.89z" style={{
          fill: "#661300",
          fillRule: "evenodd"
        }} /></symbol></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="Logos"><circle cx={8.6} cy={11.56} r={8.5} style={{
            fill: "#f7df1e"
          }} /><path d="M3.67 13.28c.26.45.48.83 1 .83s.86-.21.86-1V7.67h1.6v5.45a2.17 2.17 0 0 1-2.39 2.41 2.48 2.48 0 0 1-2.4-1.46zm5.65-.13a1.74 1.74 0 0 0 1.57 1c.67 0 1.09-.33 1.09-.79s-.44-.74-1.16-1.06l-.4-.17C9.26 11.61 8.5 11 8.5 9.69a2.13 2.13 0 0 1 2.34-2.11 2.36 2.36 0 0 1 2.27 1.28l-1.24.8a1.1 1.1 0 0 0-1-.69.7.7 0 0 0-.77.69c0 .48.3.67 1 1l.39.17c1.36.58 2.13 1.17 2.13 2.51s-1.13 2.22-2.65 2.22A3.06 3.06 0 0 1 8 13.9z" /><use width={17} height={19.89} xlinkHref="#logoTemplate" /></g></g></g></svg>;
}

export default SvgComponent;