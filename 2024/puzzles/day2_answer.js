const { getNumberOfSafeReports } = require("../puzzles/day2");
const fs = require("fs/promises");
const fileToRead = __dirname + "/../data/day2_input.txt";

fs.readFile(fileToRead, "utf-8")
  .then((fileContents) => {
    const reports = fileContents.split("\n");

    console.log(`part 1: ${getNumberOfSafeReports(reports)}`);
    console.log(`part 2: ${getNumberOfSafeReports(reports, true)}`);
  })
  .catch((error) => console.log(error));
