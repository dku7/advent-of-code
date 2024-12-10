const getNumberOfTrailheads = require("../day10");
const fs = require("fs/promises");
const fileToRead = __dirname + "/../../data/day10_input.txt";

fs.readFile(fileToRead, "utf-8")
  .then((fileContents) => fileContents.split("\n"))
  .then((map) => {
    const part1 = getNumberOfTrailheads(map);
    console.log(`part 1: ${part1}`);
    //return tests;
  })
  // .then((tests) => {
  //   const part2 = calibrate(tests, true);
  //   console.log(`part 2: ${part2}`);
  // })
  .catch((error) => console.log(error));
