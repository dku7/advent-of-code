const reverseWord = (word) => word.split("").reverse().join("");

const findAllIndices = (line, word) => {
  const indices = [];
  for (let i = 0; i < line.length; i++)
    if (line[i] === word[0]) indices.push(i);

  return indices;
};

const enoughLinesBelow = (lines, lineIndex, word) =>
  lines.length - lineIndex >= word.length;

const enoughLinesAbove = (lineIndex, word) => lineIndex - word.length + 1 >= 0;

function buildVerticalString(lines, word) {
  let total = 0;
  const reversedWord = reverseWord(word);
  const regEx = new RegExp(`(?=(${word}|${reversedWord}))`, "g");

  lines.forEach((line, lineIndex) => {
    const indices = findAllIndices(line, word);
    let newString = "";

    for (const index of indices) {
      if (enoughLinesBelow(lines, lineIndex, word)) {
        newString = "";
        for (let step = 0; step < word.length; step++) {
          newString += lines[lineIndex + step][index];
        }

        if (regEx.test(newString)) total++;
      }

      if (enoughLinesAbove(lineIndex, word)) {
        newString = "";
        for (let step = 0; step < word.length; step++) {
          newString += lines[lineIndex - step][index];
        }

        if (regEx.test(newString)) total++;
      }
    }
  });

  return total;
}

function buildDiagonalDString(lines, word) {
  let total = 0;
  const wordLength = word.length;
  const reversedWord = reverseWord(word);
  const regEx = new RegExp(`(?=(${word}|${reversedWord}))`, "g");

  lines.forEach((line, lineIndex) => {
    const indices = findAllIndices(line, word);

    for (const index of indices) {
      // going down left to right
      // condition: required line length: index + word length <= line length
      // && required no of lines: lineIndex + word length <= lines.length
      let lineLenRequired = index + wordLength;
      let linesRequired = lineIndex + wordLength;

      if (lineLenRequired <= line.length && linesRequired <= lines.length) {
        let newString = "";
        for (let j = 0; j < wordLength; j++) {
          newString += lines[lineIndex + j][index + j];
        }
        if (regEx.test(newString)) total++;
        //diagonalLines.push(newString);
      }

      // going down right to left
      // condition: required line length: index + 1 >= word length
      // && required no of lines: lineIndex + word length <= lines.length
      const charsRequired = word.length;
      lineLenRequired = index + 1;
      linesRequired = lineIndex + wordLength;

      if (lineLenRequired >= wordLength && linesRequired <= lines.length) {
        let newString = "";
        for (let j = 0; j < wordLength; j++) {
          newString += lines[lineIndex + j][index - j];
        }

        // diagonalLines.push(newString);
        if (regEx.test(newString)) total++;
      }
    }
    //diagonalLines.push(newString);
  });

  return total;
}

function buildDiagonalUString(lines, word) {
  let total = 0;
  const wordLength = word.length;
  const reversedWord = reverseWord(word);
  const regEx = new RegExp(`(?=(${word}|${reversedWord}))`, "g");

  lines.forEach((line, lineIndex) => {
    const indices = findAllIndices(line, word);

    for (const index of indices) {
      // going up left to right
      // condition: required line length: index + word length <= line length
      // && required : lineIndex + 1 >= word length

      let lineLenRequired = index + wordLength;
      let linesRequired = lineIndex + 1;

      if (lineLenRequired <= line.length && linesRequired >= wordLength) {
        let newString = "";
        for (let j = 0; j < wordLength; j++) {
          newString += lines[lineIndex - j][index + j];
        }

        if (regEx.test(newString)) {
          total++;
        }
      }

      // going up right to left
      // condition: required line length: index + 1 >= word length
      // && required : lineIndex + 1 >= word length

      lineLenRequired = index + 1;
      linesRequired = lineIndex + 1;

      if (lineLenRequired >= wordLength && linesRequired >= wordLength) {
        let newString = "";
        for (let j = 0; j < wordLength; j++) {
          newString += lines[lineIndex - j][index - j];
        }

        if (regEx.test(newString)) {
          total++;
        }
      }
    }
  });

  return total;
}

function findNumberOfWords(lines, word, index = 0) {
  const reversedWord = reverseWord(word);
  const regEx = new RegExp(`(?=(${word}|${reversedWord}))`, "g");

  let h = 0;

  for (const line of lines) {
    const hMatches = [...line.matchAll(regEx)];
    h += hMatches.length;
  }

  const v = buildVerticalString(lines, word);

  const dDLines = buildDiagonalDString(lines, word);
  const dULines = buildDiagonalUString(lines, word);

  const d = dULines + dDLines;

  return h + v + d;
}

module.exports = findNumberOfWords;
