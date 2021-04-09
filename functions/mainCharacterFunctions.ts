import ratios from "../constants";
import { round } from "./utilityFunctions";

// ratios
const { mainCharacterRatio, groundBottomPartRatio } = ratios;

export const mainCharacterSizeCalculator = (
  windowHeight: number,
  windowWidth: number,
  selected: boolean
): { width: number; height: number; heightForPlants: number } => {
  const windowHeightWidthRatio = windowHeight / windowWidth;

  if (windowHeightWidthRatio < 0.8) {
    if (selected) {
      return {
        width: round(90 / mainCharacterRatio) * windowHeightWidthRatio,
        height: 90,
        heightForPlants: round(
          (25 * mainCharacterRatio) / groundBottomPartRatio
        ),
      };
    }

    return {
      width: 25,
      height: round((25 * mainCharacterRatio) / windowHeightWidthRatio),
      heightForPlants: round((25 * mainCharacterRatio) / groundBottomPartRatio),
    };
  }

  // we find the height based on windowHeightWidthRatio. the higher the ratio, the higher the house width in percentage with a base of 15.
  const mainCharacterWidth = !selected
    ? round(windowHeightWidthRatio) * 2 * 20
    : round(windowHeightWidthRatio) * 2 * 30;

  // we find the height based on ground and house height-width ratios. the house height is it's width in pixels multiplied by its ratio and divided by the bottom part height in pixels which we find by the product of its width and its ratio . windowWidths are removed from both sides.

  return {
    width: mainCharacterWidth,
    height: round(
      (mainCharacterWidth * mainCharacterRatio) / windowHeightWidthRatio
    ),
    heightForPlants: round(
      (mainCharacterWidth * mainCharacterRatio) / groundBottomPartRatio
    ),
  };
};

export const mainCharacterDistanceFromTopCalculator = (
  windowWidth: number,
  windowHeight: number,
  leftMountainHeight: number,
  mainCharacterHeight: number,
  mainCharacterHeightForPlants: number
) => {
  const groundVisiblePartHeight = round(
    windowHeight * (1 - 0.05 - leftMountainHeight / 100)
  );
  const groundBottomPartHeight = windowWidth * groundBottomPartRatio;

  const mainCharacterDistanceFromTop = round(
    ((windowHeight -
      groundVisiblePartHeight * 0.1 -
      (mainCharacterHeight / 100) * windowHeight) /
      windowHeight) *
      100
  );

  const mainCharacterDistanceFromTopForPlants = round(
    ((groundVisiblePartHeight * 0.9 -
      (mainCharacterHeightForPlants / 100) * groundBottomPartHeight) /
      groundBottomPartHeight) *
      100
  );

  return {
    mainCharacterDistanceFromTop,
    mainCharacterDistanceFromTopForPlants,
  };
};
