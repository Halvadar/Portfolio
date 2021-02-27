import React from "react";
import { Spring, SpringProps } from "react-spring/renderprops.cjs";

interface SpringWrapperProps {
  animationCanBeStarted: boolean;
  springProps: SpringProps;
  onRestCallback: React.Dispatch<React.SetStateAction<boolean>>;
  render: any;
}

const SpringWrapper: React.FunctionComponent<SpringWrapperProps> = ({
  animationCanBeStarted,
  springProps,
  onRestCallback,
  render,
}) => {
  if (animationCanBeStarted) {
    return (
      <Spring onRest={() => onRestCallback(true)} {...springProps}>
        {(props) => render(props)}
      </Spring>
    );
  }

  return render();
};

export default SpringWrapper;
