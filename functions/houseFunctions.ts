import { round } from "./utilityFunctions";
import ratios from "../constants";

// ratios
const { houseRatio, groundBottomPartRatio, logRatio } = ratios;
export const houseLogSizeCalculator = (
  windowHeight: number,
  windowWidth: number
): {
  house: { width: number; height: number; heightForPlants: number };
  log: { width: number; height: number; heightForPlants: number };
} => {
  const windowHeightWidthRatio = windowHeight / windowWidth;

  if (windowHeightWidthRatio < 0.8) {
    return {
      house: {
        width: 15,
        height: round(((0.15 * houseRatio) / windowHeightWidthRatio) * 100),
        heightForPlants: round(
          ((0.15 * houseRatio) / groundBottomPartRatio) * 100
        ),
      },
      log: {
        width: 3,
        height: round(((0.03 * logRatio) / windowHeightWidthRatio) * 100),
        heightForPlants: round(
          ((0.03 * logRatio) / groundBottomPartRatio) * 100
        ),
      },
    };
  }

  // we find the height based on windowHeightWidthRatio. the higher the ratio, the higher the house width in percentage with a base of 15.
  const houseWidth = round(windowHeightWidthRatio) * 1.2 * 15;
  const logWidth = round(windowHeightWidthRatio) * 1.2 * 3;
  // we find the height based on ground and house height-width ratios. the house height is it's width in pixels multiplied by its ratio and divided by the bottom part height in pixels which we find by the product of its width and its ratio . windowWidths are removed from both sides.

  return {
    house: {
      width: houseWidth,
      height: round(
        (((houseWidth / 100) * houseRatio) / windowHeightWidthRatio) * 100
      ),
      heightForPlants: round(
        (((houseWidth / 100) * houseRatio) / groundBottomPartRatio) * 100
      ),
    },
    log: {
      width: logWidth,
      height: round(
        (((logWidth / 100) * logRatio) / windowHeightWidthRatio) * 100
      ),
      heightForPlants: round(
        (((logWidth / 100) * logRatio) / groundBottomPartRatio) * 100
      ),
    },
  };
};

export const houseLogDistanceFromTopCalculator = (
  windowHeight: number,
  windowWidth: number,
  leftMountainHeight: number,
  houseHeight: number,
  houseHeightForPlants: number,
  logHeight: number,
  logHeightForPlants: number
) => {
  const groundVisiblePartHeight = round(
    windowHeight * (1 - 0.05 - leftMountainHeight / 100)
  );
  const groundBottomPartHeight = windowWidth * groundBottomPartRatio;

  const houseDistanceFromTop = round(
    ((windowHeight -
      groundVisiblePartHeight * 0.5 -
      (houseHeight / 100) * windowHeight) /
      windowHeight) *
      100
  );
  const houseDistanceFromTopForPlants = round(
    ((groundVisiblePartHeight * 0.5 -
      (houseHeightForPlants / 100) * groundBottomPartHeight) /
      groundBottomPartHeight) *
      100
  );

  const logDistanceFromTop = round(
    ((windowHeight -
      groundVisiblePartHeight * 0.5 -
      (logHeight / 100) * windowHeight) /
      windowHeight) *
      100
  );
  const logDistanceFromTopForPlants = round(
    ((groundVisiblePartHeight * 0.5 -
      (logHeightForPlants / 100) * groundBottomPartHeight) /
      groundBottomPartHeight) *
      100
  );

  return {
    houseDistanceFromTop,
    logDistanceFromTop,
    houseDistanceFromTopForPlants,
    logDistanceFromTopForPlants,
  };
};

export const logDistanceFromLeftCalculator = (
  windowHeightWidthRatio: number
) => {
  if (windowHeightWidthRatio >= 1.5) {
    return 50;
  }

  if (windowHeightWidthRatio >= 1 && windowHeightWidthRatio < 1.5) {
    return 40;
  }

  return 30;
};
