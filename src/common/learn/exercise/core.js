import lodashGet from 'lodash.get';

export const getLimitTimeThatUserCanSpendOnEachQuestion = (info) => {
  const options = lodashGet(info, 'options');
  return lodashGet(options, 'limit_time_that_user_can_spend_on_each_question');
};
