export const technologiesListCoordinatesCalculator = (windowRatio) => {
  let rightStart;
  let rightFinish;
  let bottom;
  let width;
  let transform;

  if (windowRatio > 1.5) {
    rightStart = 10;
    rightFinish = 5;
    bottom = 5;
    width = 25;
    // transform = "translateX(25%)";

    return { rightStart, rightFinish, bottom, width, transform };
  }

  if (windowRatio > 1) {
    rightStart = 10;
    rightFinish = 5;
    bottom = 5;
    width = 20;
    // transform = "translateX(25%)";

    return { rightStart, rightFinish, bottom, width, transform };
  }

  rightStart = 15;
  rightFinish = 10;
  bottom = 50;
  width = 20;
  transform = "translateY(50%)";

  return { rightStart, rightFinish, bottom, width, transform };
};
