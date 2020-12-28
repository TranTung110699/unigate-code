import qs, { parse, stringify } from 'query-string';
import { push } from 'react-router-redux';
import get from 'lodash.get';

export const getCurrentDirCode = (state) =>
  (state && state.fileManager && state.fileManager.currentDirCode) ||
  parse(window.location.search).dir ||
  null;

export const getViewMode = (state) =>
  state && state.fileManager && state.fileManager.viewMode;

export const shouldShowFileInfo = (state) =>
  state && state.fileManager && state.fileManager.showFileInfo;

export const getStagedItems = (state) =>
  state && state.fileManager && state.fileManager.stagedItems;

export const getDirCodeToSubmit = (dirCode, dispatch) => {
  const codeArr = dirCode.split(':');

  dispatch(
    push({
      search: stringify({
        dir: get(codeArr, codeArr.length - 1, ''),
      }),
    }),
  );
};
