const findNumberOfWords = require("../day4");
const fs = require("fs/promises");
const fileToRead = __dirname + "/../../data/day4_input.txt";

fs.readFile(fileToRead, "utf-8")
  .then((fileContents) => fileContents.split("\n"))
  .then((lines) => {
    // console.log(lines);
    const word = "XMAS";
    const part1 = findNumberOfWords(lines, word);
    const part2 = 0;

    console.log(`part 1: ${part1}`);
    console.log(`part 2: ${part2}`);
  })
  .catch((error) => console.log(error));
