import { getInput } from "./utils.ts";

const lines = await getInput("./day1");
const a: number[] = [], b: number[] = [];
lines.map((line) => line.split(/\s+/)).forEach(
  (s) => {
    if (s.length === 2) {
      a.push(Number(s[0]));
      b.push(Number(s[1]));
    }
  },
);

/* part 1
a.sort();
b.sort();

let totalDiff = 0;
while (a.length) {
  const [x, y] = [a.pop(), b.pop()];
  if (x == null || y == null) {
    totalDiff = NaN;
    break;
  }
  if (x > y) {
    totalDiff = totalDiff + x - y;
  } else totalDiff = totalDiff + y - x;
}

console.log(totalDiff);
*/

/* part 2 */
let similarity = 0;

const c = new Map<number, number>();
for (const x of b) {
  if (c.has(x)) {
    c.set(x, c.get(x)! + 1);
  } else {
    c.set(x, 1);
  }
}

for (const y of a) {
  if (c.has(y)) similarity += c.get(y)! * y;
}

console.log(similarity);
