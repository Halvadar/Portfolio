import ratios from "../constants";
import { round } from "./utilityFunctions";

// ratios
const { mainCharacterRatio, groundBottomPartRatio } = ratios;

export const mainCharacterSizeCalculator = (
  windowHeight: number,
  windowWidth: number
): { width: number; height: number } => {
  const windowHeightWidthRatio = windowHeight / windowWidth;

  if (windowHeightWidthRatio < 0.8) {
    return {
      width: 25,
      height: ((0.25 * mainCharacterRatio) / groundBottomPartRatio) * 100,
    };
  }

  // we find the height based on windowHeightWidthRatio. the higher the ratio, the higher the house width in percentage with a base of 15.
  const mainCharacterWidth = round(windowHeightWidthRatio) * 2 * 20;

  // we find the height based on ground and house height-width ratios. the house height is it's width in pixels multiplied by its ratio and divided by the bottom part height in pixels which we find by the product of its width and its ratio . windowWidths are removed from both sides.
  return {
    width: mainCharacterWidth,
    height: round(
      (((mainCharacterWidth / 100) * mainCharacterRatio) /
        groundBottomPartRatio) *
        100
    ),
  };
};

export const mainCharacterDistanceFromTopCalculator = (
  windowWidth: number,
  windowHeight: number,
  leftMountainHeight: number,
  mainCharacterHeight: number
) => {
  const groundVisiblePartHeight = round(
    windowHeight * (1 - 0.05 - leftMountainHeight / 100)
  );
  const groundBottomPartHeight = windowWidth * groundBottomPartRatio;

  const mainCharacterDistanceFromTop = round(
    ((groundVisiblePartHeight * 0.9 -
      (mainCharacterHeight / 100) * groundBottomPartHeight) /
      groundBottomPartHeight) *
      100
  );

  return mainCharacterDistanceFromTop;
};
