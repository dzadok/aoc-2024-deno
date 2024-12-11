import { getInput } from "./utils.ts";

const testData = [
  "7 6 4 2 1",
  "1 2 7 8 9",
  "9 7 6 2 1",
  "1 3 2 4 5",
  "8 6 4 4 1",
  "1 3 6 7 9",
  "1 3 2 3 5",
  "9 2 3 5",
];
const lines = await getInput("./day2");

function safe(report: string) {
  const test = report.split(" ").map(Number);
  let last;
  let dir: "up" | "down" | undefined;
  for (const num of test) {
    if (last === undefined) {
      last = num;
      continue;
    }
    if (num === last) return false;
    if (num - last > 3) return false;
    if (last - num > 3) return false;
    switch (dir) {
      case undefined: {
        if (num > last) {
          dir = "up";
        } else {
          dir = "down";
        }
        break;
      }
      case "up": {
        if (num < last) return false;
        break;
      }
      case "down": {
        if (num > last) return false;
        break;
      }
    }
    last = num;
  }
  return true;
}

//part 1
console.log(lines.filter(safe).length);

//part 2
function safer(report: string) {
  if (safe(report)) return true;
  const test = report.split(" ");
  for (const i in test) {
    if (safe(test.toSpliced(i, 1).join(" "))) return true;
  }
}

// expect 6
console.log(lines.filter(safer).length);
