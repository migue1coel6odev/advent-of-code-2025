import { readFromFile } from "@ts/utils";

export async function part_2() {
  const file = await readFromFile("input.txt").text();
  // const file = await readFromFile("test_input.txt").text();

  const lines = file.split("\n").map((line) => line.split(""));

  const mathProblems: Array<Array<number | string>> = [];

  let currentStartIndex = 0;
  for (
    let operatorsIndex = 1;
    operatorsIndex < lines[0]!.length;
    operatorsIndex++
  ) {
    if (["+", "*"].includes(lines[lines.length - 1]![operatorsIndex]!)) {
      mathProblems.push(
        parseMathProblem(lines, currentStartIndex, operatorsIndex)
      );
      currentStartIndex = operatorsIndex;
    }
    if (operatorsIndex === lines[0]!.length - 1) {
      mathProblems.push(
        parseMathProblem(lines, currentStartIndex, operatorsIndex + 2)
      );
    }
  }

  console.log(mathProblems);
  const result = calculateMathProblems(mathProblems);

  console.log(`Result: ${result}`);
}

function parseMathProblem(lines: string[][], start: number, end: number) {
  const numbers: Array<number | string> = [];
  for (let i = start; i < end - 1; i++) {
    const currentNumber = [];
    for (let j = 0; j < lines.length - 1; j++) {
      currentNumber.push(lines[j]![i]);
    }
    numbers.push(+currentNumber.join(""));
  }
  numbers.push(lines[lines.length - 1]![start]!);
  return numbers;
}

function calculateMathProblems(mathProblems: Array<Array<number | string>>) {
  let sum = 0;
  for (const mathProblem of mathProblems) {
    const operator = mathProblem.pop();

    switch (operator) {
      case "*":
        sum += mathProblem.reduce(
          (acc: number, value) => acc * (value as number),
          1
        );
        break;
      case "+":
        sum += mathProblem.reduce(
          (acc: number, value) => acc + (value as number),
          0
        );
        break;
    }
  }
  return sum;
}
