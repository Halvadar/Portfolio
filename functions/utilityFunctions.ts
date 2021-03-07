export const pixelRemover = (targetValue: string): number => {
  return parseInt(targetValue.slice(0, targetValue.length - 2));
};

export const pixelAdder = (targetValue: number): string => {
  return `${targetValue} + px`;
};

export const percentifier = (
  targetValue: number,
  referenceValue: number
): number => {
  return Math.floor((targetValue / referenceValue) * 100 * 100) / 100;
};

export const round = (value: number): number => {
  return Math.round(value * 100) / 100;
};

export const numberToBoolean = (value: number): boolean => {
  if (value > 0) {
    return true;
  }

  return false;
};
