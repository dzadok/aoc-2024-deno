import { getInput } from "./utils.ts";
const testData = [
  "190: 10 19",
  "3267: 81 40 27",
  "83: 17 5",
  "156: 15 6",
  "7290: 6 8 6 15",
  "161011: 16 10 13",
  "192: 17 8 14",
  "21037: 9 7 18 13",
  "292: 11 6 16 20",
];

const lines = await getInput("./day7");

const part2 = lines.map(testLine).reduce((
  a,
  b,
) => a + b, 0);
console.log(part2);

function testLine(line: string) {
  const [a, b] = line.split(":");
  const target = Number(a);
  const vals = b.split(" ").map(Number).filter((num) => num > 0);
  if (vals.length === 0) return 0;
  let sums = [vals.shift()];
  for (const num of vals) {
    sums = sums.filter((v) => v != undefined).flatMap((
      sum,
      //                        remove for part 1
    ) => [sum + num, sum * num, Number(`${sum}${num}`)]);
  }
  if (sums.includes(target)) return target;
  return 0;
}
