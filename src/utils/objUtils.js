export function makeChartArray(dict) {
  let chartArray = [];
  chartArray = Object.keys(dict).map((key) => ({
    x: Number(key),
    y: dict[key],
  }));
  return chartArray;
}

export function sumRange(array, start = 0, end = 50) {
  let sum = 0;

  for (let index = start; index < end; index++) {
    sum += array[index];
  }

  return sum;
}

export function getLastElement(obj) {
  let last = Object.keys(obj)[Object.keys(obj).length - 1];
  return last;
}
