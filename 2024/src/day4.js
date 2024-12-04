const reverseWord = (word) => word.split("").reverse().join("");
//todo: combine top to bottom to search both vertically and diagonally

function diagonalOccurrences(currentIndex, lines, word) {
  const indexOfFirstLetter = lines[currentIndex].indexOf(word[0]);
  let occurrences = 0;
  let wordFound = false;

  if (indexOfFirstLetter > -1 && lines.length >= word.length) {
    let noOfRemainingLines = lines.length - currentIndex;

    if (noOfRemainingLines >= word.length - 1) {
      //search l-r:
      for (let j = 1; j < word.length; j++) {
        const nextLineLetter = lines[currentIndex + j][indexOfFirstLetter + j];
        //console.log("next line: ", nextLineLetter);
        const expectedLetter = word[j];
        //console.log("expected letter: ", word[j]);

        if (nextLineLetter !== expectedLetter) break;
        wordFound = true;
      }

      if (wordFound) occurrences++;
    }

    // search r-l
    if (indexOfFirstLetter >= lines[currentIndex].length - 1) {
      wordFound = false;

      for (let j = 1; j < word.length; j++) {
        const nextLineLetter = lines[currentIndex + j][indexOfFirstLetter - j];
        const expectedLetter = word[j];

        if (nextLineLetter !== expectedLetter) break;
        wordFound = true;
      }

      if (wordFound) occurrences++;
    }
  }

  return occurrences;
}

function verticalOccurrences(currentIndex, lines, word) {
  const indexOfFirstLetter = lines[currentIndex].indexOf(word[0]);
  let occurrences = 0;
  let wordFound = false;

  if (indexOfFirstLetter > -1 && lines.length >= word.length) {
    let noOfRemainingLines = lines.length - currentIndex;

    // top to bottom
    if (noOfRemainingLines >= word.length - 1) {
      for (let j = 1; j < word.length; j++) {
        const nextLineLetter = lines[currentIndex + j][indexOfFirstLetter];
        const expectedLetter = word[j];

        if (nextLineLetter !== expectedLetter) break;
        wordFound = true;
      }

      if (wordFound) occurrences++;
    }

    // now search bottom to top
    noOfRemainingLines = currentIndex - lines.length;
    if (currentIndex - word.length >= -1) {
      for (let j = 1; j < word.length; j++) {
        const nextLineLetter = lines[currentIndex - j][indexOfFirstLetter];
        const expectedLetter = word[j];

        if (nextLineLetter !== expectedLetter) break;
        wordFound = true;
      }

      if (wordFound) occurrences++;
    }
  }

  return occurrences;
}
function findNumberOfWords(lines, word) {
  let occurrences = 0;
  const reversedWord = reverseWord(word);
  const regEx = new RegExp(`${word}|${reversedWord}`, "g");

  for (let i = 0; i < lines.length; i++) {
    const matches = [...lines[i].matchAll(regEx)];

    occurrences += matches.length;
    occurrences += diagonalOccurrences(i, lines, word);
    occurrences += verticalOccurrences(i, lines, word);
  }

  return occurrences;
}

module.exports = findNumberOfWords;
