const findDifferenceBetween = (list1, list2) => {
  const sortedList1 = list1.sort((a, b) => a - b);
  const sortedList2 = list2.sort((a, b) => a - b);
  let totalDifference = 0;

  for (let i = 0; i < sortedList1.length; i++) {
    totalDifference += Math.abs(sortedList1[i] - sortedList2[i]);
  }

  return totalDifference;
};

const findSimilarities = (list1, list2) => {
  let score = 0;

  for (firstNumber of list1) {
    const timesRepeated = list2.filter(
      (secondNumber) => secondNumber === firstNumber
    ).length;

    score += firstNumber * timesRepeated;
  }

  return score;
};

module.exports = { findDifferenceBetween, findSimilarities };
