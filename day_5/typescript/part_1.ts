import { readFromFile } from "@ts/utils";

export async function part_1() {
  const file = await readFromFile("input.txt").text();
  // const file = await readFromFile("test_input.txt").text();

  const [rangesArray, ingredientListArray] = file
    .split("\n\n")
    .map((text) => text.split("\n"));

  const ranges = rangesArray?.map((range) => range.split("-").map((id) => +id));
  const ingredientList = ingredientListArray?.map((id) => +id);

  const result = checkFreshIngredients(ranges!, ingredientList!);

  console.log(`Result: ${result.length}`);
}

function checkFreshIngredients(
  ranges: Array<Array<number>>,
  ingredientList: Array<number>
) {
  const listOfFreshIngredients = [];

  for (const ingredientId of ingredientList) {
    for (const range of ranges) {
      const sorted = [...range, ingredientId].sort((a, b) => (a > b ? 1 : -1));
      if (sorted[1] === ingredientId) {
        listOfFreshIngredients.push(ingredientId);
        break;
      }
    }
  }

  return listOfFreshIngredients;
}
