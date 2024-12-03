const sortList = (list) => [...list].sort((a, b) => a - b);

function findDifferenceBetween(list1, list2) {
  const sortedList1 = sortList(list1);
  const sortedList2 = sortList(list2);
  let totalDifference = 0;

  for (let i = 0; i < sortedList1.length; i++) {
    totalDifference += Math.abs(sortedList1[i] - sortedList2[i]);
  }

  return totalDifference;
}

function findSimilarities(list1, list2) {
  let score = 0;

  for (const firstNumber of list1) {
    const timesRepeated = list2.filter(
      (secondNumber) => secondNumber === firstNumber
    ).length;

    score += firstNumber * timesRepeated;
  }

  return score;
}

module.exports = { findDifferenceBetween, findSimilarities };
