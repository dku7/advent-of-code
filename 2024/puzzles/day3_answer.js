const sumInstructions = require("../puzzles/day3");
const fs = require("fs/promises");

const fileToRead = __dirname + "/../data/day3_input.txt";

fs.readFile(fileToRead, "utf-8")
  .then((fileContents) => {
    const part1 = sumInstructions(fileContents);
    console.log(`part 1: ${part1}`);
  })
  .catch((error) => console.log(error));
