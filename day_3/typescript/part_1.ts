import { readFromFile } from "@ts/utils";

export async function part_1() {
  const file = await readFromFile("input.txt").text();
  // const file = await readFromFile("test_input.txt").text();

  let sum = 0;
  for (const bank of file.split("\n")) {
    const maxJoltage = checkHighestBankJoltage(bank);
    sum += maxJoltage;
  }

  console.log(`Result: ${sum}`);
}

function checkHighestBankJoltage(bank: string) {
  const mappedBatteries = new Map<number, Array<number>>();

  [...bank].map((battery, index) => {
    const nr = +battery;
    if (mappedBatteries.has(nr)) {
      mappedBatteries.get(nr)?.push(index);
    } else {
      mappedBatteries.set(nr, [index]);
    }
  });

  for (let i = 9; i >= 0; i--) {
    if (mappedBatteries.has(i)) {
      for (const index of mappedBatteries.get(i)!) {
        const nr = findHighestNumberAfterIndex(mappedBatteries, index);
        if (nr) {
          return +`${i}${nr}`;
        }
      }
    }
  }
  return 0;
}

function findHighestNumberAfterIndex(
  mappedBatteries: Map<number, Array<number>>,
  startIndex: number
) {
  for (let i = 9; i >= 0; i--) {
    if (mappedBatteries.has(i)) {
      const batteries = mappedBatteries.get(i);
      if (Math.max(startIndex, ...batteries!) !== startIndex) {
        return i;
      }
    }
  }
}
