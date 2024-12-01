const findDifferenceBetween = (list1, list2) => {
  if (list1?.length > 0 && list2?.length > 0) {
    const sortedList1 = list1.sort((a, b) => a - b);
    const sortedList2 = list2.sort((a, b) => a - b);
    let totalDifference = 0;

    for (let i = 0; i < sortedList1.length; i++) {
      totalDifference += Math.abs(sortedList1[i] - sortedList2[i]);
    }

    return totalDifference;
  } else return 0;
};

module.exports = findDifferenceBetween;
