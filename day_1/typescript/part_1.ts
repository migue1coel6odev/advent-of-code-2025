import { readFromFile } from "@ts/utils";

let CURRENT_POS = 50;
const MIN_DIAL = 0;
const MAX_DIAL = 99;
let ZEROS_ENCOUNTERED = 0;

export async function part_1() {
  const file = await readFromFile("input.txt").text();
  //   const file = await readFromFile("test_input.txt").text();
  for (const instruction of file.split("\n")) {
    const direction = instruction.slice(0, 1);
    const nr_rotations = instruction.slice(1, instruction.length);

    rotate_dial(direction === "R", Number(nr_rotations));
    if (CURRENT_POS === 0) {
      ZEROS_ENCOUNTERED++;
    }
  }

  console.log(`Encountered ${ZEROS_ENCOUNTERED} zeros`);
}

function rotate_dial(moveRight: boolean, nr_rotations: number) {
  let rotations = nr_rotations;
  while (rotations > MAX_DIAL) {
    rotations = Math.abs(rotations - (MAX_DIAL + 1));
  }
  if (rotations === 0) return;

  if (moveRight) {
    CURRENT_POS += rotations;

    if (CURRENT_POS > MAX_DIAL) {
      CURRENT_POS -= MAX_DIAL + 1;
    }
    return;
  }

  CURRENT_POS -= rotations;
  if (CURRENT_POS < MIN_DIAL) {
    CURRENT_POS += MAX_DIAL + 1;
  }
  return;
}
