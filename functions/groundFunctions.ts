export const groundTopPartDistanceFromBottomCalculator = (
  leftMountainHeight: number
): number => {
  // To calculate the distance of ground's top part from bottom we substract 5 - distance of left mountain from top and left mountain height from 100 %
  return 100 - 5 - leftMountainHeight;
};
export const groundBottomPartBackgroundDistanceFromTopCalculator = (
  leftMountainHeight: number
): number => {
  // we need to find the sum of the left mountain's height and it's distance from top to get the distance of grounds bottom part from top
  const distance = 5 + leftMountainHeight;
  // we the bottom part a little bit so the river's top and bottom side match
  const adjustedDistance = distance - distance / 100;

  return adjustedDistance;
};

export const groundBottomPartHeightCalculator = (
  windowHeight: number,
  leftMountainHeight: number
): number => {
  // calculates the height of the ground's bottom part in pixels for the extension to fill it. 0.05 is the distance of the left mountain from top. +4 is the compenstation for top -4 of the bottom part for alignement.

  return windowHeight * (1 - 0.05 - leftMountainHeight / 100) + 4;
};
