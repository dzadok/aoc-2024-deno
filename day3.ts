import { getSingleLineInput } from "./utils.ts";

const testData =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
const data = await getSingleLineInput("./day3");
const regex = /(?:mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;
let x;
let sum = 0;
let doing = true;
do {
  x = regex.exec(data);
  if (x) {
    if (doing && x[0].startsWith("mul")) {
      sum = sum + (x[1] * x[2]);
    }
    if (x[0] === "don't()") doing = false;
    if (x[0] === "do()") doing = true;
  }
} while (x);

//161
console.log(sum);
