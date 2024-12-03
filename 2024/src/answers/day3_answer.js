const sumInstructions = require("../day3");
const fs = require("fs/promises");

const fileToRead = __dirname + "/../../data/day3_input.txt";

fs.readFile(fileToRead, "utf-8")
  .then((fileContents) => {
    const part1 = sumInstructions(fileContents);
    const part2 = sumInstructions(fileContents, true);

    console.log(`part 1: ${part1}`);
    console.log(`part 2: ${part2}`);
  })
  .catch((error) => console.log(error));
