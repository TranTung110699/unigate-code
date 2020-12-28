import { types } from 'components/admin/question/schema/question-types';

export const isOnlyOnMobileQuestion = (question) => {
  return (
    [
      types.TYPE_WRITING,
      types.TYPE_SPEAKING,
      // types.TYPE_MATCHING_PAIRS,
    ].findIndex((type) => type == question.type) !== -1
  );
};
