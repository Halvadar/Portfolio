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
