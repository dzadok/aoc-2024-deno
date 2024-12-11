import { getInput } from "./utils.ts";
const testData = [
  "47|53",
  "97|13",
  "97|61",
  "97|47",
  "75|29",
  "61|13",
  "75|53",
  "29|13",
  "97|29",
  "53|29",
  "61|53",
  "97|53",
  "61|29",
  "47|13",
  "75|47",
  "97|75",
  "47|61",
  "75|61",
  "47|29",
  "75|13",
  "53|13",
  "",
  "75,47,61,53,29",
  "97,61,53,29,13",
  "75,29,13",
  "75,97,47,61,53",
  "61,13,29",
  "97,13,75,29,47",
];

const lines = await getInput("./day5");

let line = undefined;
const rules: number[][] = [];
do {
  line = lines.shift();
  if (!line) break;
  rules.push(line.split("|").map(Number));
} while (line !== "");

const updates = lines.map((line) => line.split(",").map(Number));
const goodUpdates = updates.filter((update) => {
  const seen = new Set<number>();
  for (const page of update) {
    for (const rule of rules.filter((rule) => rule[0] === page)) {
      if (seen.has(rule[1])) {
        return false;
      }
    }
    seen.add(page);
  }
  return true;
});

// part 1
console.log(
  goodUpdates.map((update) => update[Math.floor(update.length / 2)]).reduce((
    x,
    y,
  ) => x + y),
);

const badUpdates = updates.filter((update) => !goodUpdates.includes(update));

let total = 0;
for (const update of badUpdates) {
  for (let i = 0; i < update.length - 1; i++) {
    for (let j = i + 1; j < update.length; j++) {
      if (
        rules.find((rule) => rule[0] === update[j] && rule[1] === update[i])
      ) {
        [update[i], update[j]] = [update[j], update[i]];
      }
    }
  }
  total += update[Math.floor(update.length / 2)];
}

// part 2
console.log(total);
