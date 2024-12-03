const sumInstructions = (input, enabledOnly = false) => {
  const regex = enabledOnly
    ? /(?:mul\()(\d+,\d+)(?:\))|(don\'t\(\))|(do\(\))/g
    : /(?:mul\()(\d+,\d+)(?:\))/g;
  const instructions = input.matchAll(regex);
  let total = 0;
  let calculationsDisabled = false;

  instructions.forEach((instruction) => {
    if (instruction[0] === "don't()") {
      calculationsDisabled = true;
    } else if (instruction[0] === "do()") {
      calculationsDisabled = false;
    } else if (!calculationsDisabled) {
      const digits = instruction[1].split(",");
      total += Number(digits[0]) * Number(digits[1]);
    }

    console.log(instruction[0], " disabled = ", calculationsDisabled);
  });

  return total;
};

module.exports = sumInstructions;
