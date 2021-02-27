import { AppProps } from "next/app";
import React from "react";
import "../styles/styles.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

const asd = 1;

export default App;
