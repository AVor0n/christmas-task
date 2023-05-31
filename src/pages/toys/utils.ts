/** Возвращает минимальное и максимальное значения для массива чисел */
export const getMinMax = (nums: number[]) => {
  const sortedNums = nums.sort((a, b) => a - b);
  return { min: sortedNums[0], max: sortedNums.at(-1) };
};
