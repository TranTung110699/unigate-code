import routes from 'routes';

export const inviteContestantUrl = (contest) =>
  `/admin/contest/${contest.iid}/invite`;

export const arrangeShiftUrl = (contest, round) => {
  return round && Object.keys(round).length
    ? `/admin/contest/${contest.iid}/exam-round/${
        round.iid
      }/exam-shifts/arrange`
    : `/admin/contest/${contest.iid}/exam-shifts/arrange`;
};

export const examShiftsUrl = (contest, round) => {
  return round && Object.keys(round).length && round.iid
    ? `/admin/contest/${contest.iid}/exam-round/${round.iid}/exam-shifts`
    : `/admin/contest/${contest.iid}/exam-shifts`;
};

export const newContestRole = (contest) =>
  `/admin/contest/${contest && contest.iid}/information/roles/new`;

export const reportUrl = (contest, reportName) => {
  return `/admin/contest/${contest.iid}/reports/${reportName}`;
};

export const examRoundUrl = (contestIid, examRound, mode) => {
  if (
    mode === examRoundActions.information ||
    mode === examRoundActions.paper ||
    mode === 'contestants' ||
    mode === examRoundActions.invalidQuestions
  )
    return `/admin/contest/${contestIid}/exam-round/${examRound.iid}/${mode}`;
  else if (mode === examRoundActions.examStore)
    return `/admin/contest/${contestIid}/exam-round/${examRound.iid}/syllabus/${
      examRound.syllabus
    }/children`;
};

export const editUrl = (contestIid) => `/admin/contest/${contestIid}/dashboard`;

export const takeOverview = (contestIid, takeId) =>
  `/admin/contest/${contestIid}/exam-result/${takeId}`;
export const examResults = (contestIid) =>
  `/admin/contest/${contestIid}/exam-result`;

export const examRoundActions = {
  information: 'information',
  paper: 'paper',
  examStore: 'exam-store',
  invalidQuestions: 'invalid-questions',
};
