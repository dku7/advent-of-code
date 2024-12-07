const add = (num1, num2) => num1 + num2;
const multiply = (num1, num2) => num1 * num2;
const concat = (num1, num2) => Number(`${num1}${num2}`);

const operators = [add, multiply];
const operatorsWithConcat = [add, multiply, concat];

function buildListOfOperators(numberOfNumbers, useConcat) {
  const operatorList = [];
  const operatorsToUse = useConcat ? operatorsWithConcat : operators;

  const build = (currentList) => {
    if (currentList.length === numberOfNumbers) {
      operatorList.push([...currentList]);
      return operatorList;
    }

    for (const operator of operatorsToUse) {
      currentList.push(operator);
      build(currentList);
      currentList.pop();
    }
  };

  build([]);

  return operatorList;
}

const allAdded = (numbers) =>
  numbers.reduce((total, number) => (total += number));
const allMultiplied = (numbers) =>
  numbers.reduce((total, number) => (total *= number));

function testNumbers(testValue, numbers, useConcat) {
  const operatorList = buildListOfOperators(numbers.length, useConcat);
  let total = 0;

  if (allAdded(numbers) === testValue) return testValue;
  if (allMultiplied(numbers) === testValue) return testValue;

  for (const operators of operatorList) {
    for (let i = 0; i < operators.length - 1; i++) {
      const operatorFunction = operators[i];

      total = i === 0 ? numbers[0] : total;
      total = operatorFunction(total, numbers[i + 1]);
    }

    if (total === testValue) return testValue;
  }
}

const getParts = (equation) => {
  const testValue = Number(equation[1]);
  const numbers = equation[2].split(" ").map((number) => Number(number));

  return { testValue, numbers };
};

function calibrate(input, useConcat = false) {
  const regEx = /(\d+): (\d+(?:\s\d+)*)/g;
  let total = 0;

  input.forEach((line) => {
    const equations = line.matchAll(regEx);

    for (const equation of equations) {
      const parts = getParts(equation);

      if (testNumbers(parts.testValue, parts.numbers, useConcat))
        total += parts.testValue;
    }
  });

  return total;
}

module.exports = calibrate;
