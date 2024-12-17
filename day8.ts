import { getInput } from "./utils.ts";
const testData = [
  "............",
  "........0...",
  ".....0......",
  ".......0....",
  "....0.......",
  "......A.....",
  "............",
  "............",
  "........A...",
  ".........A..",
  "............",
  "............",
];

const lines = await getInput("./day8");

const antinodes = new Set<`${number},${number}`>();

const antennas = new Map<string, Array<[number, number]>>();
for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    const value = lines[i][j];
    if (value === ".") continue;
    if (!antennas.has(value)) {
      antennas.set(value, []);
    }
    antennas.get(value)?.forEach((pos) => {
      const [dy, dx] = [i - pos[0], j - pos[1]];
      if (
        (pos[0] - dy > -1) && (pos[1] - dx > -1) &&
        (pos[1] - dx < lines[i].length)
      ) {
        antinodes.add(`${pos[0] - dy},${pos[1] - dx}`);
      }
      if (
        (i + dy < lines.length) && (j + dx < lines[i].length) && (j + dx > -1)
      ) {
        antinodes.add(`${i + dy},${j + dx}`);
      }
    });
    antennas.get(value)!.push([i, j]);
  }
}

// expect 14
console.log(antinodes.size);

function gcdEuclid(a: number, b: number) {
  let c;
  while (b) {
    c = a % b;
    a = b;
    b = c;
  }
  return Math.abs(a);
}

function reduceFraction(numerator: number, denominator: number) {
  const gcd = Math.abs(numerator) > Math.abs(denominator)
    ? gcdEuclid(Math.abs(denominator), Math.abs(numerator))
    : gcdEuclid(Math.abs(numerator), Math.abs(denominator));
  return [numerator / gcd, denominator / gcd];
}

const newAntinodes = new Set<string>();
function part2(locations: Array<[number, number]>) {
  const seen: Array<[number, number]> = [];
  if (locations.length < 2) return;
  locations.forEach((x) => {
    seen.forEach((y) => {
      const [dy, dx] = reduceFraction(y[0] - x[0], y[1] - x[1]);
      let row = y[0];
      let col = y[1];
      do {
        newAntinodes.add(`${row},${col}`);
        row -= dy;
        col -= dx;
      } while (
        row > -1 && row < lines.length && col > -1 && col < lines[0].length
      );
      row = y[0];
      col = y[1];
      do {
        newAntinodes.add(`${row},${col}`);
        row += dy;
        col += dx;
      } while (
        row > -1 && row < lines.length && col > -1 && col < lines[0].length
      );
    });
    seen.push(x);
  });
}

antennas.values().forEach(part2);

// expect 34
console.log(newAntinodes.size);
