import { getInput } from "./utils.ts";
const testData = [
  "....#.....",
  ".........#",
  "..........",
  "..#.......",
  ".......#..",
  "..........",
  ".#..^.....",
  "........#.",
  "#.........",
  "......#...",
];

const lines = await getInput("./day6");
const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
} as const;

type Direction = typeof directions[keyof typeof directions];
let direction: Direction = directions.up;

let row = 0;
let col = 0;

const map = lines.map((line, index) => {
  const test = /[\^v><]/.exec(line);
  if (test && test.index > -1) {
    switch (test[0]) {
      case "^":
        direction = directions.up;
        break;
      case "v":
        direction = directions.down;
        break;
      case ">":
        direction = directions.right;
        break;
      case "<":
        direction = directions.left;
        break;
      default: {
        throw new Error();
      }
    }
    col = test.index;
    row = index;
  }
  return line.split("");
});

// part 1
const part1 = new Set<string>();

function walkMap(
  map: string[][],
  row: number,
  col: number,
  direction: Direction,
  seen: Set<string>,
  checkLoops = false,
) {
  while (
    (row > -1 && row < lines.length) && (col > -1 &&
      col < lines[0].length)
  ) {
    const key = `${row},${col}${checkLoops ? `:${direction}` : ""}`;
    if (checkLoops && seen.has(key)) {
      return true;
    }
    seen.add(key);
    switch (direction) {
      case directions.up: {
        if (map[row - 1] && map[row - 1][col] === "#") {
          direction = directions.right;
        } else row -= 1;
        break;
      }
      case directions.right: {
        if (map[row][col + 1] === "#") {
          direction = directions.down;
        } else col += 1;
        break;
      }
      case directions.down: {
        if (map[row + 1] && map[row + 1][col] === "#") {
          direction = directions.left;
        } else row += 1;
        break;
      }
      case directions.left: {
        if (map[row][col - 1] === "#") {
          direction = directions.up;
        } else col -= 1;
        break;
      }
    }
  }
}
walkMap(map, row, col, direction, part1);

// expect 41
console.log(part1.size);

//part 2
let part2 = 0;
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const check = structuredClone(map);
    check[i][j] = "#";
    if (walkMap(check, row, col, direction, new Set(), true)) {
      part2++;
    }
  }
}

//expect 6
console.log(part2);
