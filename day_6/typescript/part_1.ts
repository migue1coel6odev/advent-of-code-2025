import { readFromFile } from "@ts/utils";

export async function part_1() {
  const file = await readFromFile("input.txt").text();
  // const file = await readFromFile("test_input.txt").text();

  const lines = file
    .split("\n")
    .map((line) => line.trim().replaceAll(/[ ]+/g, "|").split("|"));

  const mathProblems: Array<Array<number | string>> = [];

  for (let i = 0; i < lines[0]!.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      if (!Array.isArray(mathProblems[i])) {
        mathProblems[i] = [];
      }

      if (j === lines.length - 1) {
        mathProblems[i]!.push(lines[j]![i]!);
      } else {
        mathProblems[i]!.push(+lines[j]![i]!);
      }
    }
  }

  const result = calculateMathProblems(mathProblems);

  console.log(`Result: ${result}`);
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
