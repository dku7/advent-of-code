const { findDifferenceBetween, findSimilarities } = require("../puzzles/day1");
const fs = require("fs/promises");

const fileToRead = __dirname + "/../data/day1_input.txt";

fs.readFile(fileToRead, "utf-8")
  .then((fileContents) => fileContents.replaceAll("   ", "\n").split("\n"))
  .then((array) => {
    const list1 = [];
    const list2 = [];

    array.forEach((element, index) => {
      if (index % 2 === 0) list1.push(Number(element));
      else list2.push(Number(element));
    });

    console.log(`part 1: ${findDifferenceBetween(list1, list2)}`);
    console.log(`part 2: ${findSimilarities(list1, list2)}`);
  })
  .catch((error) => console.log(error));
