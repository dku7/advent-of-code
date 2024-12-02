const parseReports = (reports) =>
  reports.map((report) => report.split(" ").map((element) => Number(element)));

const calculateLevelChanges = (report) =>
  report.slice(0, -1).map((level, index) => report[index + 1] - level);

const changeIsPositiveAndSafe = (change) => change >= 1 && change <= 3;
const changeIsNegativeAndSafe = (change) => change <= -1 && change >= -3;

const reportIsSafe = (levelChanges) =>
  levelChanges.every(changeIsPositiveAndSafe) ||
  levelChanges.every(changeIsNegativeAndSafe);

const applyDampener = (report) => {
  for (let i = 0; i < report.length; i++) {
    const newReport = [...report];
    newReport.splice(i, 1);
    const newLevelChanges = calculateLevelChanges(newReport);

    if (reportIsSafe(newLevelChanges)) return true;
  }

  return false;
};

const getNumberOfSafeReports = (reports, useDampener = false) => {
  const parsedReports = parseReports(reports);
  let safeReportCount = 0;

  parsedReports.forEach((report) => {
    const levelChanges = calculateLevelChanges(report);
    let safe = reportIsSafe(levelChanges);

    if (!safe && useDampener) safe = applyDampener(report);

    if (safe) safeReportCount++;
  });

  return safeReportCount;
};

module.exports = { getNumberOfSafeReports };
