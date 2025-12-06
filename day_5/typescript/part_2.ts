import { readFromFile } from "@ts/utils";

export async function part_2() {
  const file = await readFromFile("input.txt").text();
  // const file = await readFromFile("test_input.txt").text();

  const [rangesArray] = file.split("\n\n").map((text) => text.split("\n"));

  const ranges = rangesArray?.map((range) => range.split("-").map((id) => +id));

  const sortedInitialRanges = ranges?.sort(([a], [b]) => (a! > b! ? 1 : -1));

  let freshIds = 0;
  sortedInitialRanges?.reduce((previousValue, [lowest, highest]) => {
    if (lowest! > previousValue) {
      freshIds += highest! - lowest! + 1;
      return highest!;
    }

    if (highest! > previousValue) {
      freshIds += highest! - previousValue!;
      return highest!;
    }

    return previousValue!;
  }, 0);

  console.log(`Result: ${freshIds}`);
}
