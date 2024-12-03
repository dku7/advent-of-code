const getRegEx = (enabledOnly) => {
  const defaultRegEx = /(?:mul\()(\d+,\d+)(?:\))/;
  const conditionalRegEx = /|(don\'t\(\))|(do\(\))/;

  return new RegExp(
    defaultRegEx.source + (enabledOnly ? conditionalRegEx.source : ""),
    "g"
  );
};

const multiply = (expression) => {
  const [digit1, digit2] = expression.split(",");
  return Number(digit1) * Number(digit2);
};

// take in total, and enabled in COVE
// return fun that accepts command and expression

const getProcessFunction = (calculationsEnabled) => (command, expression) => {
  switch (command) {
    case "don't()":
      calculationsEnabled = false;
      return 0;
    case "do()":
      calculationsEnabled = true;
      return 0;
    default:
      return calculationsEnabled ? multiply(expression) : 0;
  }
};

const sumInstructions = (input, enabledOnly = false) => {
  const instructions = input.matchAll(getRegEx(enabledOnly));
  let total = 0;
  const processInstruction = getProcessFunction(true);

  for (const instruction of instructions) {
    const [command, expression] = instruction.slice(0, 2);
    total += processInstruction(command, expression);
  }

  return total;
};

module.exports = sumInstructions;
