import { getLimitTimeThatUserCanSpendOnEachQuestion } from './core';

export const doExamUseLimitQuestionGroupTimeFlow = (info) =>
  Boolean(getLimitTimeThatUserCanSpendOnEachQuestion(info));
