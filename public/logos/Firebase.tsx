import * as React from "react";

function SvgComponent(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 17.07 19.97" {...props}><defs><symbol id="logoTemplate" data-name="logoTemplate" viewBox="0 0 17 19.89"><circle cx={8.5} cy={11.39} r={8.5} style={{
          fill: "none"
        }} /><path d="M8.55 3.66a3 3 0 0 1-.36-2A3 3 0 0 1 9.11 0l.89.37a4.37 4.37 0 0 0-1 1.4 4.3 4.3 0 0 0-.45 1.89z" style={{
          fill: "#661300",
          fillRule: "evenodd"
        }} /></symbol><style>{".cls-4{fill:#ffa000}"}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle cx={8.54} cy={11.44} r={8.54} style={{
          fill: "#00a5d4"
        }} /><path className="cls-4" d="m10.06 9.27-1.18 1.1-1.09-2.2.57-1.26c.14-.26.37-.26.52 0z" /><path style={{
          fill: "#f57f17"
        }} d="M8.88 10.37 4.5 14.44l3.29-6.27 1.09 2.2z" /><path d="M11.34 7.61c.21-.21.42-.14.48.15L13 14.39l-3.82 2.27a1.83 1.83 0 0 1-.48.1 1.83 1.83 0 0 1-.45-.11L4.5 14.44z" style={{
          fill: "#ffca28"
        }} /><path className="cls-4" d="M7.79 8.17 4.5 14.44 6 5.27c0-.28.21-.31.36-.06z" /><use width={17} height={19.89} xlinkHref="#logoTemplate" /></g></g></svg>;
}

export default SvgComponent;