const sumInstructions = (input) => {
  const regex = /(?:mul\()(\d+,\d+)(?:\))/gm;
  const instructions = input.matchAll(regex);
  let total = 0;

  instructions.forEach((instruction) => {
    const digits = instruction[1].split(",");
    total += Number(digits[0]) * Number(digits[1]);
  });

  return total;
};

module.exports = sumInstructions;
