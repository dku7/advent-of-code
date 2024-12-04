const fs = require("fs/promises");
const fileToRead = __dirname + "/../../data/day4_input.txt";

fs.readFile(fileToRead, "utf-8")
  .then((fileContents) => {})
  .then(() => {
    const part1 = 0;
    const part2 = 0;

    console.log(`part 1: ${part1}`);
    console.log(`part 2: ${part2}`);
  })
  .catch((error) => console.log(error));
