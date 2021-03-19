import cloudCoordinates from "../public/cloudCoordinates";
import starCoordinates from "../public/starCoordinates";
import { round } from "./utilityFunctions";

export const cloudStarPropsCalculator = (
  windowHeight: number,
  windowWidth: number,
  leftMountainHeight: number,
  windowHeightIsGreater: boolean
) => {
  const newCloudCoordinates = cloudCoordinates.map((cloud) => {
    const distanceFromTop = round(cloud.top * (0.1 + leftMountainHeight / 100));
    let width;

    if (windowHeightIsGreater) {
      width = cloud.width;
    } else {
      width = round(((cloud.width * windowHeight) / windowWidth) * 1.5);
    }

    return { ...cloud, top: distanceFromTop, width };
  });
  const newStarCoordinates = starCoordinates.map((star) => {
    const distanceFromTop = round(star.top * (0.1 + leftMountainHeight / 100));
    let width;

    if (windowHeightIsGreater) {
      width = star.width;
    } else {
      width = round(((star.width * windowHeight) / windowWidth) * 1.5);
    }

    return { ...star, top: distanceFromTop, width };
  });

  return {
    cloudCoordinates: newCloudCoordinates,
    starCoordinates: newStarCoordinates,
  };
};
