import React from "react";
import { Spring, SpringProps } from "react-spring/renderprops.cjs";

interface SpringWrapperProps {
  animationCanBeStarted: boolean;
  springProps: SpringProps;
  render: any;
}

const SpringWrapper: React.FunctionComponent<SpringWrapperProps> = ({
  animationCanBeStarted,
  springProps,
  render,
}) => {
  if (animationCanBeStarted) {
    return <Spring {...springProps}>{(props) => render(props)}</Spring>;
  }

  return render();
};

export default SpringWrapper;
