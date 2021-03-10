//  height width ratios
import plantCoordinates from "../public/plantCoordinateList";
import { round } from "./utilityFunctions";
import ratios from "../constants";

const { mushroomRatio, flowerRatio, grassRatio, groundRatio } = ratios;

const plantTypeRatio = (type) => {
  switch (type) {
    case 0:
      return mushroomRatio;
    case 1:
      return flowerRatio;
    case 2:
      return grassRatio;
    default:
      return null;
  }
};
export const plantFilter = (
  windowWidth: number,
  windowHeight: number,
  leftMountainHeight: number
) => {
  const groundBottomHeight = Math.round(
    windowHeight * (1 - leftMountainHeight / 100 - 0.05)
  );
  const filteredPlants = [];

  for (let i = 0; i < plantCoordinates.length; i += 1) {
    const plant = plantCoordinates[i];

    if (
      Math.round((windowWidth * plant.width) / 100) *
        plantTypeRatio(plant.type) +
        (windowWidth * groundRatio * plant.top) / 100 <
      groundBottomHeight
    ) {
      filteredPlants.push(plant);
    } else {
      break;
    }
  }

  return filteredPlants;
};

export const filteredPlantsUpdate = (
  windowHeight: number,
  windowWidth: number,
  leftMountainHeight: number,
  previousWindowRatioWasGreater: boolean,
  previousFilteredPlants?: Array<any>
) => {
  const groundBottomHeight = Math.round(
    windowHeight * (1 - leftMountainHeight / 100 - 0.05)
  );
  const FilteredPlants = [...previousFilteredPlants];

  if (!previousWindowRatioWasGreater) {
    for (let i = previousFilteredPlants.length - 1; i >= 0; i -= 1) {
      const plant = plantCoordinates[i];

      if (
        Math.round((windowWidth * plant.width) / 100) *
          plantTypeRatio(plant.type) +
          (windowWidth * groundRatio * plant.top) / 100 >=
        groundBottomHeight
      ) {
        FilteredPlants.pop();
      } else {
        break;
      }
    }
  } else {
    for (
      let i = previousFilteredPlants.length - 1;
      i < plantCoordinates.length - 1;
      i += 1
    ) {
      const plant = plantCoordinates[i];

      if (
        Math.round((windowWidth * plant.width) / 100) *
          plantTypeRatio(plant.type) +
          (windowWidth * groundRatio * plant.top) / 100 <
        groundBottomHeight
      ) {
        FilteredPlants.push(true);
      } else {
        break;
      }
    }
  }

  return FilteredPlants;
};
export const plantStateIncrementValueCalculator = (
  plantStateLength: number
) => {
  if (plantStateLength > 50) {
    return 5;
  }

  if (plantStateLength <= 50 && plantStateLength > 30) {
    return 3;
  }

  if (plantStateLength <= 30 && plantStateLength > 20) {
    return 2;
  }

  return 1;
};
export const plantHouseCharacterFilter = (
  houseDistanceFromLeft: number,
  houseWholeDistanceFromLeft: number,
  halfHouseDistanceFromTop: number,
  houseWholeDistanceFromTop: number,
  halfLogDistanceFromTop: number,
  logWholeDistanceFromTop: number,
  logDistanceFromLeft: number,
  logWholeDistanceFromLeft: number,
  halfCharacterDistanceFromTop: number,
  characterWholeDistanceFromTop: number,
  characterDistanceFromLeft: number,
  characterWholeDistanceFromLeft: number,
  plantWidth: number,
  plantType: number,
  plantDistanceFromLeft: number,
  plantDistanceFromTop: number,
  windowWidth: number,
  windowHeight: number
) => {
  // every height prop is in halfs
  const plantHeight = round(
    ((((windowWidth * plantWidth) / 100) * plantTypeRatio(plantType)) /
      windowHeight) *
      100
  );
  const plantWholeDistanceFromLeft = plantDistanceFromLeft + plantHeight;
  const plantWholeDistanceFromTop = plantDistanceFromTop + plantHeight;

  if (
    ((plantWholeDistanceFromLeft > houseDistanceFromLeft &&
      plantWholeDistanceFromLeft < houseWholeDistanceFromLeft) ||
      (plantDistanceFromLeft > houseDistanceFromLeft &&
        plantDistanceFromLeft < houseWholeDistanceFromLeft)) &&
    ((plantWholeDistanceFromTop > halfHouseDistanceFromTop &&
      plantWholeDistanceFromTop < houseWholeDistanceFromTop) ||
      (plantDistanceFromTop > halfHouseDistanceFromTop &&
        plantDistanceFromTop < houseWholeDistanceFromTop))
  ) {
    return true;
  }

  if (
    ((plantWholeDistanceFromLeft > logDistanceFromLeft &&
      plantWholeDistanceFromLeft < logWholeDistanceFromLeft) ||
      (plantDistanceFromLeft > logDistanceFromLeft &&
        plantDistanceFromLeft < logWholeDistanceFromLeft)) &&
    ((plantWholeDistanceFromTop > halfLogDistanceFromTop &&
      plantWholeDistanceFromTop < logWholeDistanceFromTop) ||
      (plantDistanceFromTop > halfLogDistanceFromTop &&
        plantDistanceFromTop < logWholeDistanceFromTop))
  ) {
    return true;
  }

  if (
    ((plantWholeDistanceFromLeft > characterDistanceFromLeft &&
      plantWholeDistanceFromLeft < characterWholeDistanceFromLeft) ||
      (plantDistanceFromLeft > characterDistanceFromLeft &&
        plantDistanceFromLeft < characterWholeDistanceFromLeft)) &&
    ((plantWholeDistanceFromTop > halfCharacterDistanceFromTop &&
      plantWholeDistanceFromTop < characterWholeDistanceFromTop) ||
      (plantDistanceFromTop > halfCharacterDistanceFromTop &&
        plantDistanceFromTop < characterWholeDistanceFromTop))
  ) {
    return true;
  }

  return false;
};
