const calibrate = require("../day7");
const fs = require("fs/promises");
const fileToRead = __dirname + "/../../data/day7_input.txt";

fs.readFile(fileToRead, "utf-8")
  .then((fileContents) => fileContents.split("\n"))
  .then((tests) => {
    const part1 = calibrate(tests);
    const part2 = calibrate(tests, true);

    console.log(`part 1: ${part1}`);
    console.log(`part 2: ${part2}`);
  })
  .catch((error) => console.log(error));
