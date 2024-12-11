import { getInput } from "./utils.ts";

const testData = [
  "MMMSXXMASM",
  "MSAMXMSMSA",
  "AMXSXMAAMM",
  "MSAMASMSMX",
  "XMASAMXAMM",
  "XXAMMXXAMA",
  "SMSMSASXSS",
  "SAXAMASAAA",
  "MAMMMXMMMM",
  "MXMXAXMASX",
];

const lines = await getInput("./day4");
let count = 0;
const rows = lines.length;
const cols = lines[1].length;

// part 1
const dirs = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

function possible(move: number[], i: number, j: number) {
  if (i + (move[0] * 3) > rows - 1) return false;
  if (i + (move[0] * 3) < 0) return false;
  if (j + (move[1] * 3) > cols - 1) return false;
  if (j + (move[1] * 3) < 0) return false;
  return true;
}

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    if (lines[i][j] === "X") {
      dirs.map((move) => {
        if (!possible(move, i, j)) return;
        if (lines[i + move[0]][j + move[1]] === "M") {
          if (lines[i + move[0] * 2][j + move[1] * 2] === "A") {
            if (lines[i + move[0] * 3][j + move[1] * 3] === "S") count++;
          }
        }
      });
    }
  }
}

// 18
console.log(count);

//part 2
const moves = [[-1, -1], [1, 1], [-1, 1], [1, -1]];

let answer = 0;
for (let i = 1; i < rows - 1; i++) {
  for (let j = 1; j < cols - 1; j++) {
    if (lines[i][j] === "A") {
      const letters = moves.map((move) => lines[i + move[0]][j + move[1]]);
      if (
        (
          (letters[0] === "M" && letters[1] === "S") ||
          (letters[0] === "S" && letters[1] === "M")
        ) &&
        ((letters[2] === "M" && letters[3] === "S") ||
          (letters[2] === "S" && letters[3] === "M"))
      ) answer++;
    }
  }
}
console.log(answer);
