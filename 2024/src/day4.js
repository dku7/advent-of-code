const reverseWord = (word) => word.split("").reverse().join("");

const findAllIndices = (line, word) =>
  line.split("").map((letter, index) => {
    if (letter === word[0]) return index;
  });

const canSearchDown = (lines, lineIndex, word) =>
  lines.length - lineIndex >= word.length;

const canSearchUp = (lineIndex, word) => lineIndex - word.length + 1 >= 0;

function getNumberOfMatches(word, line) {
  const reversedWord = reverseWord(word);
  const regEx = new RegExp(`(?=(${word}|${reversedWord}))`, "g");

  return [...line.matchAll(regEx)].length;
}

function searchVertically(lines, lineIndex, word, index) {
  let total = 0;

  if (canSearchDown(lines, lineIndex, word)) {
    let foundWord = "";

    for (let i = 0; i < word.length; i++)
      foundWord += lines[lineIndex + i][index];

    total += getNumberOfMatches(word, foundWord);
  }

  if (canSearchUp(lineIndex, word)) {
    let foundWord = "";
    for (let i = 0; i < word.length; i++)
      foundWord += lines[lineIndex - i][index];

    total += getNumberOfMatches(word, foundWord);
  }

  return total;
}

function canSearchDiagDownLeft(lines, lineIndex, word, index) {
  const wordLength = word.length;
  const lineLenRequired = index + wordLength;
  const linesRequired = lineIndex + wordLength;

  return (
    lineLenRequired <= lines[lineIndex].length && linesRequired <= lines.length
  );
}

function canSearchDiagDownRight(lines, lineIndex, word, index) {
  const wordLength = word.length;
  lineLenRequired = index + 1;
  linesRequired = lineIndex + wordLength;

  return lineLenRequired >= wordLength && linesRequired <= lines.length;
}
function searchDiagDown(lines, lineIndex, word, index) {
  const wordLength = word.length;
  let total = 0;

  if (canSearchDiagDownLeft(lines, lineIndex, word, index)) {
    let foundWord = "";
    for (let i = 0; i < wordLength; i++) {
      foundWord += lines[lineIndex + i][index + i];
    }

    total += getNumberOfMatches(word, foundWord);
  }

  if (canSearchDiagDownRight(lines, lineIndex, word, index)) {
    let foundWord = "";
    for (let i = 0; i < wordLength; i++) {
      foundWord += lines[lineIndex + i][index - i];
    }

    total += getNumberOfMatches(word, foundWord);
  }

  return total;
}

function searchDiagUp(lines, lineIndex, word, index) {
  let total = 0;
  const wordLength = word.length;

  // going up left to right

  let lineLenRequired = index + wordLength;
  let linesRequired = lineIndex + 1;

  if (
    lineLenRequired <= lines[lineIndex].length &&
    linesRequired >= wordLength
  ) {
    let foundWord = "";
    for (let j = 0; j < wordLength; j++) {
      foundWord += lines[lineIndex - j][index + j];
    }

    total += getNumberOfMatches(word, foundWord);
  }

  // going up right to left

  lineLenRequired = index + 1;
  linesRequired = lineIndex + 1;

  if (lineLenRequired >= wordLength && linesRequired >= wordLength) {
    let foundWord = "";
    for (let j = 0; j < wordLength; j++) {
      foundWord += lines[lineIndex - j][index - j];
    }

    total += getNumberOfMatches(word, foundWord);
  }

  return total;
}

function findNumberOfWords(lines, word) {
  let total = 0;

  lines.forEach((line, lineIndex) => {
    const indices = findAllIndices(line, word);

    total += getNumberOfMatches(word, line);

    for (const index of indices) {
      total += searchVertically(lines, lineIndex, word, index);

      total += searchDiagDown(lines, lineIndex, word, index);
      total += searchDiagUp(lines, lineIndex, word, index);
    }
  });

  return total;
}

module.exports = findNumberOfWords;
