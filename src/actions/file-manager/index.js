export const DIR_SELECTED = 'FILE_MANAGER_DIR_SELECTED';
export const VIEW_MODE_SELECTED = 'FILE_MANAGER_VIEW_MODE_SELECTED';
export const SHOULD_SHOW_FILE_INFO_SELECTED = 'SHOULD_SHOW_FILE_INFO_SELECTED';
export const ITEMS_STAGED = 'ITEMS_STAGED';
export const ITEMS_UNSTAGED = 'ITEMS_UNSTAGED';

export const dirSelected = (dirCode) => ({
  type: DIR_SELECTED,
  dirCode,
});

export const viewModeSelected = (mode) => ({
  type: VIEW_MODE_SELECTED,
  mode,
});

export const shouldShowFileInfoSelected = (showFileInfo) => ({
  type: SHOULD_SHOW_FILE_INFO_SELECTED,
  showFileInfo,
});

export const itemsStaged = (items, reset = false) => ({
  type: ITEMS_STAGED,
  items,
  reset,
});

export const itemsUnstaged = (itemCodes) => ({
  type: ITEMS_UNSTAGED,
  itemCodes,
});
