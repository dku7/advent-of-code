const plotRoute = require("../day6");
const fs = require("fs/promises");
const fileToRead = __dirname + "/../../data/day6_input.txt";

fs.readFile(fileToRead, "utf-8")
  .then((fileContents) => fileContents.split("\n"))
  .then((map) => {
    const part1 = plotRoute(map);
    const part2 = 0;

    console.log(`part 1: ${part1}`);
    console.log(`part 2: ${part2}`);
  })
  .catch((error) => console.log(error));
