import lodashGet from 'lodash.get';

const resultFromStoreSelector = (state) => (searchResultKey) =>
  lodashGet(state, `searchResults.${searchResultKey}`);

export const searchValuesSelector = (state) => (searchResultKey) =>
  lodashGet(resultFromStoreSelector(state)(searchResultKey), 'searchValues');

export const searchResultsSelector = (state) => (searchResultKey) =>
  lodashGet(resultFromStoreSelector(state)(searchResultKey), 'result');

export const searchResultObjectsSelector = (state) => (searchResultKey) =>
  lodashGet(resultFromStoreSelector(state)(searchResultKey), 'objects');

export const searchResultIdSelector = (state) => (searchResultKey) =>
  lodashGet(resultFromStoreSelector(state)(searchResultKey), 'resultId');

export const searchResultTotalSelector = (state) => (searchResultKey) => {
  const resultFromStore = resultFromStoreSelector(state)(searchResultKey);
  return (
    lodashGet(resultFromStore, 'objects.total') ||
    lodashGet(resultFromStore, 'total')
  );
};

export const hasAnySearchResultSelector = (state) => (searchResultKey) =>
  typeof resultFromStoreSelector(state)(searchResultKey) !== 'undefined';
