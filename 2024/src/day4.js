const reverseWord = (word) => word.split("").reverse().join("");

const findAllIndices = (line, word) => {
  const indices = [];
  for (let i = 0; i < line.length; i++)
    if (line[i] === word[0]) indices.push(i);

  return indices;
};

const canSearchDown = (lines, lineIndex, word) =>
  lines.length - lineIndex >= word.length;

const canSearchUp = (lineIndex, word) => lineIndex - word.length + 1 >= 0;

const getNumberOfMatches = (word, line) => {
  const reversedWord = reverseWord(word);
  const regEx = new RegExp(`(?=(${word}|${reversedWord}))`, "g");

  return [...line.matchAll(regEx)].length;
};

function searchDown(lines, lineIndex, word, index) {
  let total = 0;

  if (canSearchDown(lines, lineIndex, word)) {
    let foundWord = "";

    for (let step = 0; step < word.length; step++) {
      foundWord += lines[lineIndex + step][index];
    }

    total += getNumberOfMatches(word, foundWord);
  }

  return total;
}

function searchUp(lines, lineIndex, word, index) {
  let total = 0;

  if (canSearchUp(lineIndex, word)) {
    let foundWord = "";
    for (let step = 0; step < word.length; step++) {
      foundWord += lines[lineIndex - step][index];
    }

    total += getNumberOfMatches(word, foundWord);
  }

  return total;
}

function searchDiagDown(lines, lineIndex, word, index) {
  // going down left to right
  // condition: required line length: index + word length <= line length
  // && required no of lines: lineIndex + word length <= lines.length
  const wordLength = word.length;
  let lineLenRequired = index + wordLength;
  let linesRequired = lineIndex + wordLength;
  let total = 0;

  if (
    lineLenRequired <= lines[lineIndex].length &&
    linesRequired <= lines.length
  ) {
    let foundWord = "";
    for (let j = 0; j < wordLength; j++) {
      foundWord += lines[lineIndex + j][index + j];
    }

    total += getNumberOfMatches(word, foundWord);
  }

  // going down right to left
  // condition: required line length: index + 1 >= word length
  // && required no of lines: lineIndex + word length <= lines.length
  const charsRequired = word.length;
  lineLenRequired = index + 1;
  linesRequired = lineIndex + wordLength;

  if (lineLenRequired >= wordLength && linesRequired <= lines.length) {
    let foundWord = "";
    for (let j = 0; j < wordLength; j++) {
      foundWord += lines[lineIndex + j][index - j];
    }

    total += getNumberOfMatches(word, foundWord);
  }

  return total;
}

function searchDiagUp(lines, lineIndex, word, index) {
  let total = 0;
  const wordLength = word.length;

  // going up left to right
  // condition: required line length: index + word length <= line length
  // && required : lineIndex + 1 >= word length

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
  // condition: required line length: index + 1 >= word length
  // && required : lineIndex + 1 >= word length

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
      total += searchDown(lines, lineIndex, word, index);
      total += searchUp(lines, lineIndex, word, index);
      total += searchDiagDown(lines, lineIndex, word, index);
      total += searchDiagUp(lines, lineIndex, word, index);
    }
  });

  return total;
}

module.exports = findNumberOfWords;
