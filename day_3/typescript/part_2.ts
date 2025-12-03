import { readFromFile } from "@ts/utils";

const MAX_DIGITS = 12;

export async function part_2() {
  const file = await readFromFile("input.txt").text();
  //   const file = await readFromFile("test_input.txt").text();

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
    let currentEndOffset = bank.length - (MAX_DIGITS - 1);
    let currentNumber = `${i}`;
    if (mappedBatteries.has(i)) {
      for (const index of mappedBatteries.get(i)!) {
        if (index >= currentEndOffset) {
          break;
        }
        let startIndex = index;
        while (currentEndOffset < bank.length) {
          const [nr, index] = findHighestNumberAfterIndex(
            mappedBatteries,
            startIndex,
            currentEndOffset
          );
          if (nr) {
            currentNumber = `${currentNumber}${nr}`;
            currentEndOffset++;
            startIndex = index!;
          }
        }
        return +currentNumber;
      }
    }
  }
  return 0;
}

function findHighestNumberAfterIndex(
  mappedBatteries: Map<number, Array<number>>,
  startIndex: number,
  maxIndex: number
) {
  for (let i = 9; i >= 0; i--) {
    if (mappedBatteries.has(i)) {
      const batteries = mappedBatteries.get(i)!;
      for (const batteryIndex of batteries) {
        if (batteryIndex > startIndex && batteryIndex <= maxIndex) {
          return [i, batteryIndex];
        }
      }
    }
  }
  return [];
}
