import lodashGet from 'lodash.get';

export const getDefaultValuesToPopulateSearchForm = (
  state,
  { defaultValues = {}, formid } = {},
) => {
  const valuesPersist = lodashGet(
    state,
    `valueFieldsToPopulateDefault.${formid}`,
    {},
  );
  return Object.assign({}, defaultValues, valuesPersist);
};
