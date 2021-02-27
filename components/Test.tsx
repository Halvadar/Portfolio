import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import Tree from "../public/Tree.json";

interface testProps {}

const Test: React.FunctionComponent<testProps> = ({}) => {
  const [state, setState] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Tree,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setState(true);
  });

  return (
    <div>
      <Lottie options={defaultOptions} isPaused={state} isStopped={state} />
      <button type="button" onClick={() => setState(false)}>
        stop
      </button>
    </div>
  );
};

export default Test;
