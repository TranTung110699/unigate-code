import actions from './url-actions';
export default {
  score_dashboard: (node) => `/admin/course/${node.iid}/${actions.SCORE}`,
  score_by_rubric: (node) =>
    `/admin/course/${node.iid}/${actions.SCORE}/${subActions.BY_RUBRIC}`,
  score_online: (node) =>
    `/admin/course/${node.iid}/${actions.SCORE}/${subActions.ONLINE}`,
  score_marking_open_ended_questions: (node) =>
    `/admin/course/${node.iid}/${actions.SCORE}/${
      subActions.MARKING_OPEN_ENDED_QUESTIONS
    }`,
};

export const subActions = {
  BY_RUBRIC: 'by-rubric',
  ONLINE: 'online',
  MARKING_OPEN_ENDED_QUESTIONS: 'marking-open-ended-questions',
};
