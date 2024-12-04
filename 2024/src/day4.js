const reverseWord = (word) => word.split("").reverse().join("");
//todo: combine top to bottom to search both vertically and diagonally
const findAllIndices = (line, char) => {
  const indices = [];
  for (let i = 0; i < line.length; i++) if (line[i] === char) indices.push(i);
  return indices;
};

function searchDiagonally(currentIndex, lines, word) {
  const firstLetterIndices = findAllIndices(lines[currentIndex], word[0]);

  let occurrences = 0;
  let wordFound = false;

  for (const indexOfFirstLetter of firstLetterIndices) {
    if (lines.length >= word.length) {
      let noOfRemainingLines = lines.length - currentIndex;

      ///////////////////////////////////
      // search downwards
      ///////////////////////////////////
      if (noOfRemainingLines >= word.length) {
        //search l-r
        for (let j = 1; j < word.length; j++) {
          wordFound = false;

          const foundLetter = lines[currentIndex + j][indexOfFirstLetter + j];
          const expectedLetter = word[j];

          if (foundLetter !== expectedLetter) break;
          wordFound = true;
        }

        if (wordFound) {
          occurrences++;
        }

        // search r-l
        if (indexOfFirstLetter >= lines[currentIndex].length - 1) {
          for (let j = 1; j < word.length; j++) {
            wordFound = false;
            const foundLetter = lines[currentIndex + j][indexOfFirstLetter - j];
            const expectedLetter = word[j];

            if (foundLetter !== expectedLetter) break;
            wordFound = true;
          }

          if (wordFound) {
            occurrences++;
          }
        }
      } // end search downwards

      ///////////////////////////////////
      // search upwards
      ///////////////////////////////////
      noOfRemainingLines = currentIndex - lines.length;
      if (currentIndex - word.length >= -1) {
        // l-r

        for (let j = 1; j < word.length; j++) {
          wordFound = false;
          const foundLetter = lines[currentIndex - j][indexOfFirstLetter + j];
          const expectedLetter = word[j];
          // if (lines[currentIndex] === "MXMXAXMASX") {
          //   console.log(
          //     "foundLetter: ",
          //     foundLetter,
          //     ", expected letter: ",
          //     expectedLetter
          //   );
          // }
          if (foundLetter !== expectedLetter) break;
          wordFound = true;
        }
        if (wordFound) {
          // console.log(
          //   "!!!FOUND ONE GOING UP, L-R!!!! for index: ",
          //   indexOfFirstLetter
          // );
          occurrences++;
        }

        // search r-l
        // if (indexOfFirstLetter >= lines[currentIndex].length - 1) {
        //console.log("starting, found is: ", wordFound);
        // console.log("===R-L===, processing index: ", indexOfFirstLetter);
        for (let j = 1; j < word.length; j++) {
          wordFound = false;
          const foundLetter = lines[currentIndex - j][indexOfFirstLetter - j];
          const expectedLetter = word[j];

          if (foundLetter !== expectedLetter) break;
          wordFound = true;
        }

        if (wordFound) {
          // console.log(
          //   "!!!FOUND ONE GOING UP, R-L!!!!l for index: ",
          //   indexOfFirstLetter
          // );
          occurrences++;
        }
        // }
      } // end search upwards
    }
  }

  // console.log(
  //   `searching diagonally, line = ${lines[currentIndex]}, indices = ${firstLetterIndices}, currentIndex = ${currentIndex}, current line = ${lines[currentIndex]}, ${occurrences} found`
  // );
  return occurrences;
}

function searchVertically(currentIndex, lines, word) {
  const firstLetterIndices = findAllIndices(lines[currentIndex], word[0]);
  //const indexOfFirstLetter = lines[currentIndex].indexOf(word[0]);
  let occurrences = 0;
  let wordFound = false;

  for (indexOfFirstLetter of firstLetterIndices) {
    if (lines.length >= word.length) {
      let noOfRemainingLines = lines.length - currentIndex;

      // top to bottom
      if (noOfRemainingLines >= word.length - 1) {
        for (let j = 1; j < word.length; j++) {
          wordFound = false;
          const foundLetter = lines[currentIndex + j][indexOfFirstLetter];
          const expectedLetter = word[j];

          if (foundLetter !== expectedLetter) break;
          wordFound = true;
        }

        if (wordFound) occurrences++;
      }

      // now search bottom to top
      noOfRemainingLines = currentIndex - lines.length;
      if (currentIndex - word.length >= -1) {
        for (let j = 1; j < word.length; j++) {
          wordFound = false;
          const foundLetter = lines[currentIndex - j][indexOfFirstLetter];
          const expectedLetter = word[j];

          if (foundLetter !== expectedLetter) break;
          wordFound = true;
        }

        if (wordFound) occurrences++;
      }
    }
  }

  return occurrences;
}
function findNumberOfWords(lines, word, index = 0) {
  let occurrences = 0;
  const reversedWord = reverseWord(word);
  const regEx = new RegExp(`(?=(${word}|${reversedWord}))`, "g");
  // console.log(regEx);
  let h = 0;
  let v = 0;
  let d = 0;
  // console.log("lines: ", lines, "index: ", index);

  //for (let i = 0; i < lines.length; i++) {
  const matches = [...lines[index].matchAll(regEx)];

  // async? Promise.all
  h += matches.length;

  d += searchDiagonally(index, lines, word);

  v += searchVertically(index, lines, word);

  console.log(`results for line ${index}: h: ${h}, d: ${d}, v: ${v}`);
  //}

  // console.log(`h: ${h}, d: ${d}, v: ${v}`);

  occurrences += h + d + v;
  // test to see if we're at the last line
  // if not set current index + 1
  if (index < lines.length - 1) {
    occurrences += findNumberOfWords(lines, word, index + 1);
  }

  return occurrences;
}

module.exports = findNumberOfWords;
