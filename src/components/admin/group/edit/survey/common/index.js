import lodashGet from 'lodash.get';

export const getIdOfFormSearchBatchSurveyInserts = (group) =>
  `feedback_users_of_group_${lodashGet(group, 'iid')}`;
