export const SUGGEST_AUTO_COMPLETE = 'SUGGEST_AUTO_COMPLETE';

export const suggestAutoComplete = (params) => ({
  type: SUGGEST_AUTO_COMPLETE,
  params,
});
