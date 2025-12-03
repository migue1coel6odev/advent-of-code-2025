import { readFromFile } from "@ts/utils";

export async function part_1() {
  const file = await readFromFile("input.txt").text();
  // const file = await readFromFile("test_input.txt").text();

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
  if (stringifiedNumber.length % 2 !== 0) {
    return false;
  }

  const halfLength = stringifiedNumber.length / 2;
  return (
    stringifiedNumber.slice(0, halfLength) ===
    stringifiedNumber.slice(halfLength, stringifiedNumber.length)
  );
}
