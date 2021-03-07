import { percentifier } from "./utilityFunctions";
import ratios from "../constants";

// ratios
const { mountainWidthHeightRatio, rightLeftMountainRatio } = ratios;

interface MountainWidthsCalculatorProps {
  windowWidth: number;
  windowHeight: number;
  windowHeightIsGreater: boolean;
}

export const mountainWidthsCalculator = ({
  windowWidth,
  windowHeight,
  windowHeightIsGreater,
}: MountainWidthsCalculatorProps) => {
  if (windowHeightIsGreater) {
    const leftMountainHeight = windowWidth / 2 / mountainWidthHeightRatio;

    // if windowHeight is greater that windowWidth mountain widths are gonna be set directly.
    // heights are gonna be calculated based on ratio
    return {
      leftMountain: {
        width: 50,
        height: percentifier(leftMountainHeight, windowHeight),
      },
      rightMountain: {
        width: 40,
        height: percentifier(
          leftMountainHeight * rightLeftMountainRatio,
          windowHeight
        ),
      },
    };
  }

  // if windowWidth is greater that windowHeight mountain widths are calculated based on windowHeight
  // leftMountain's width is gonna be windowHeight's 60% multiplied by height ratio
  // rightMountain is gonna be the same but also multiplied by the general right-left mountain ratio
  const leftMountainHeight = windowHeight * 0.45;
  const leftMountainWidth = leftMountainHeight * mountainWidthHeightRatio;

  return {
    leftMountain: {
      width: percentifier(leftMountainWidth, windowWidth),
      height: percentifier(leftMountainHeight, windowHeight),
    },
    rightMountain: {
      width: percentifier(
        leftMountainWidth * rightLeftMountainRatio,
        windowWidth
      ),
      height: percentifier(
        leftMountainHeight * rightLeftMountainRatio,
        windowHeight
      ),
    },
  };
};

interface MountainDistanceFromSidesCalculatorProps {
  leftMountainWidth: number;
  rightMountainWidth: number;
}

export const mountainDistanceFromSidesCalculator = ({
  leftMountainWidth,
  rightMountainWidth,
}: MountainDistanceFromSidesCalculatorProps) => {
  // To calculate the distance of mountains from the sides in percentage, we let the mountains intersect each other by 10% of their widths' sum. if their widths' sum is greater than window width we let the intersect factor increase
  const leftRightMountainWidthSum = leftMountainWidth + rightMountainWidth;
  let mountainIntersectFactor = 0.9;

  if (leftRightMountainWidthSum > 100) {
    mountainIntersectFactor = 100 / leftRightMountainWidthSum;
  }

  const distanceFromSides =
    (100 - (leftMountainWidth + rightMountainWidth) * mountainIntersectFactor) /
    2;

  return distanceFromSides;
};
