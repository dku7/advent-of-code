const add = (num1, num2) => num1 + num2;
const multiply = (num1, num2) => num1 * num2;
const operators = [add, multiply];

function buildListOfOperators(numberOfNumbers) {
  const operatorList = [];

  const build = (currentList) => {
    if (currentList.length === numberOfNumbers) {
      operatorList.push([...currentList]);
      return operatorList;
    }

    for (const operator of operators) {
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

function testNumbers(testValue, numbers) {
  const operatorList = buildListOfOperators(numbers.length);
  let total = 0;

  if (allAdded(numbers) === testValue) return testValue;
  if (allMultiplied(numbers) === testValue) return testValue;

  for (const operators of operatorList) {
    for (let i = 0; i < operators.length - 1; i++) {
      total = i === 0 ? numbers[0] : total;
      total = operators[i](total, numbers[i + 1]);
    }

    if (total === testValue) return testValue;
  }
}

const getParts = (equation) => {
  const testValue = Number(equation[1]);
  const numbers = equation[2].split(" ").map((number) => Number(number));

  return { testValue, numbers };
};

function calibrate(input) {
  const regEx = /(\d+): (\d+(?:\s\d+)*)/g;
  let total = 0;

  for (line of input) {
    const equations = line.matchAll(regEx);

    for (const equation of equations) {
      const parts = getParts(equation);

      if (testNumbers(parts.testValue, parts.numbers)) total += parts.testValue;
    }
  }

  return total;
}

module.exports = calibrate;
