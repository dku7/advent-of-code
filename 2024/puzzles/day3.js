const getRegEx = (enabledOnly) => {
  const defaultRegEx = /(?:mul\()(\d+,\d+)(?:\))/;
  const conditionalRegEx = /|(don\'t\(\))|(do\(\))/;

  return new RegExp(
    defaultRegEx.source + (enabledOnly ? conditionalRegEx.source : ""),
    "g"
  );
};

const multiply = (expression) => {
  const digits = expression.split(",");
  return Number(digits[0]) * Number(digits[1]);
};

const sumInstructions = (input, enabledOnly = false) => {
  const instructions = input.matchAll(getRegEx(enabledOnly));
  let total = 0;
  let calculationsEnabled = true;

  for (const instruction of instructions) {
    const command = instruction[0];
    const expression = instruction[1];

    switch (command) {
      case "don't()":
        calculationsEnabled = false;
        break;
      case "do()":
        calculationsEnabled = true;
        break;
      default:
        total += calculationsEnabled ? multiply(expression) : 0;
    }
  }

  return total;
};

module.exports = sumInstructions;
