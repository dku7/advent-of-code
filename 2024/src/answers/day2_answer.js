const { getNumberOfSafeReports } = require("../day2");
const fs = require("fs/promises");
const fileToRead = __dirname + "/../../data/day2_input.txt";

fs.readFile(fileToRead, "utf-8")
  .then((fileContents) => fileContents.split("\n"))
  .then((reports) => {
    const part1 = getNumberOfSafeReports(reports);
    const part2 = getNumberOfSafeReports(reports, true);

    console.log(`part 1: ${part1}`);
    console.log(`part 2: ${part2}`);
  })
  .catch((error) => console.log(error));
