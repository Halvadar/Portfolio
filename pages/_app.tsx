import { AppProps } from "next/app";
import React from "react";
import "../styles/styles.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
