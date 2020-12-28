import lodashGet from 'lodash.get';

export const getDataApiResultSelector = (state) => (key) =>
  lodashGet(state, ['dataApiResults', key]);
