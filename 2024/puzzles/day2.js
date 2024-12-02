const parseReports = (reports) =>
  reports.map((report) => report.split(" ").map((element) => Number(element)));

const levelIsSafe = (change) => change >= -3 && change <= 3;

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

  parsedReports.forEach((report) => {
    const levelChanges = calculateLevelChanges(report);

    if (reportIsSafe(levelChanges)) safeReportCount++;
  });

  return safeReportCount;
};

module.exports = { getNumberOfSafeReports };
