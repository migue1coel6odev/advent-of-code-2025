import { readFromFile } from "@ts/utils";

export async function part_2() {
  // const file = await readFromFile("input.txt").text();
  const file = await readFromFile("test_input.txt").text();

  const matrix: Array<Array<"." | "@" | "X">> = [];

  for (const line of file.split("\n")) {
    matrix.push([".", ...line, "."] as Array<"." | "@" | "X">);
  }
  matrix.unshift(new Array(matrix[0]?.length).fill("."));
  matrix.push(new Array(matrix[0]?.length).fill("."));

  const nrRemovableRolls = checkRollsOfPaperRemovable(matrix);
  let sum = 0;
  let currentRemovableRolls = nrRemovableRolls();

  while (currentRemovableRolls !== 0) {
    sum += currentRemovableRolls;
    currentRemovableRolls = nrRemovableRolls();
  }

  console.log(`Result: ${sum}`);
}

function checkRollsOfPaperRemovable(matrix: Array<Array<"." | "@" | "X">>) {
  return function () {
    let nrRemovableRolls = 0;
    const removableRolls: Array<Array<number>> = [];
    const checkIsRemovable = checkIsRemovableForMatrix(matrix);
    for (let i = 1; i < matrix.length - 1; i++) {
      for (let j = 1; j < matrix[0]!.length - 1; j++) {
        if (matrix[i]![j] === "@" && checkIsRemovable(i, j)) {
          nrRemovableRolls++;
          removableRolls.push([i, j]);
        }
      }
    }
    for (const [x, y] of removableRolls) {
      matrix[x!]![y!] = "X";
    }

    return nrRemovableRolls;
  };
}

function checkIsRemovableForMatrix(matrix: Array<Array<"." | "@" | "X">>) {
  return function (x: number, y: number) {
    if (
      [
        matrix[x - 1]![y - 1],
        matrix[x]![y - 1],
        matrix[x + 1]![y - 1],
        matrix[x - 1]![y],
        matrix[x + 1]![y],
        matrix[x - 1]![y + 1],
        matrix[x]![y + 1],
        matrix[x + 1]![y + 1],
      ].filter((c) => c === "@").length < 4
    ) {
      return true;
    }
    return false;
  };
}
