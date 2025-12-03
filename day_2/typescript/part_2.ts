import { readFromFile } from "@ts/utils";

export async function part_2() {
  const file = await readFromFile("input.txt").text();
  //   const file = await readFromFile("test_input.txt").text();

  let sum = 0;
  for (const range of file.split(",")) {
    const [start, end] = range.split("-");
    const nextInvalid = findNextInvalid(+start!, +end!);
    while (true) {
      const { value, done } = nextInvalid.next();
      if (done) break;

      sum += value;
    }
  }

  console.log(`Result: ${sum}`);
}

function* findNextInvalid(start: number, end: number) {
  let currentNumber = start;
  while (currentNumber <= end) {
    if (checkIsInvalid(currentNumber)) {
      yield currentNumber;
    }
    currentNumber++;
  }
}

function checkIsInvalid(nr: number) {
  const stringifiedNumber = `${nr}`;
  const halfLength = Math.floor(stringifiedNumber.length / 2);

  for (let i = 1; i <= halfLength; i++) {
    if (hasInvalidPattern(stringifiedNumber, i)) {
      return true;
    }
  }
}

function hasInvalidPattern(stringifiedNumber: string, patternLength: number) {
  const repeatingPattern = stringifiedNumber.slice(0, patternLength);

  const regex = new RegExp(
    `(${repeatingPattern}){${stringifiedNumber.length / patternLength}}`
  );
  if (regex.test(stringifiedNumber)) {
    return true;
  }
  return false;
}
