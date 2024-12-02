/* A report only counts as safe if both of the following are true:
- The levels are either all increasing or all decreasing.
- Any two adjacent levels differ by at least one and at most three.*/

const parseReports = (reports) =>
  reports.map((report) => report.split(" ").map((el) => Number(el)));

const levelIsSafe = (change) => change > -3 && change < 3;

const calculateLevelChanges = (report) =>
  report.slice(0, -1).map((level, index) => report[index + 1] - level);

const changeIsPositive = (change) => change > 0;

const changeIsNegative = (change) => change < 0;

const reportIsSafe = (levelChanges) =>
  levelChanges.every(levelIsSafe) &&
  (levelChanges.every(changeIsPositive) ||
    levelChanges.every(changeIsNegative));

const getNumberOfSafeReports = (reports) => {
  const parsedReports = parseReports(reports);
  let safeReportCount = 0;

  //console.log(parsedReports);

  parsedReports.forEach((report) => {
    const levelChanges = calculateLevelChanges(report);
    //console.log("levelChanges: ", levelChanges);

    if (reportIsSafe(levelChanges)) safeReportCount++;
  });

  return safeReportCount;
};

module.exports = { getNumberOfSafeReports };
