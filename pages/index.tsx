import React from "react";
import Head from "next/head";
import Header from "../components/Header";

interface indexProps {}

const Index: React.FunctionComponent<indexProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <link rel="shortcut icon" href="/Sun.svg" type="image/x-icon" />
      </Head>
      <Header />;
    </>
  );
};

export default Index;
