export const reportRoutes = (tpIid, reportType) =>
  `/admin/training-plan/${tpIid}/report/${reportType}`;

export const reportTypes = {
  creditOverallProgress: 'credit-overall-progress',
  usersOverallProgress: 'users-overall-progress',
  notStartedLearners: 'not-started-learners',
  survey: 'tp-survey',
  cbcc: 'cbcc',
};
