const { findDifferenceBetween, findSimilarities } = require("../puzzles/day1");
const fs = require("fs/promises");

const fileToRead = __dirname + "/../data/day1_input.txt";
const list1 = [];
const list2 = [];

fs.readFile(fileToRead, "utf-8")
  .then((fileContents) => fileContents.split("   ").join("\n").split("\n"))
  .then((array) => {
    for (let i = 0; i < array.length; i++) {
      if (i % 2 === 0) list1.push(Number(array[i]));
      else list2.push(Number(array[i]));
    }
  })
  .then(() => {
    console.log(`part 1: ${findDifferenceBetween(list1, list2)}`);
    console.log(`part 2: ${findSimilarities(list1, list2)}`);
  })
  .catch((error) => console.log(error));
