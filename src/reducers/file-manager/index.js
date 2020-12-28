import {
  DIR_SELECTED,
  ITEMS_STAGED,
  ITEMS_UNSTAGED,
  SHOULD_SHOW_FILE_INFO_SELECTED,
  VIEW_MODE_SELECTED,
} from 'actions/file-manager';
import { filterDuplicate } from 'common/utils/Array';

const initialState = {
  currentDirCode: '',
  viewMode: 'list',
  showFileInfo: true,
  stagedItems: [],
};

const fileManager = (state = initialState, action) => {
  switch (action.type) {
    case DIR_SELECTED: {
      const { dirCode } = action;
      return {
        ...state,
        currentDirCode: dirCode,
        stagedItems: [],
      };
    }
    case VIEW_MODE_SELECTED: {
      const { mode } = action;
      return {
        ...state,
        viewMode: mode,
      };
    }
    case SHOULD_SHOW_FILE_INFO_SELECTED: {
      const { showFileInfo } = action;
      return {
        ...state,
        showFileInfo,
      };
    }
    case ITEMS_STAGED: {
      const { items, reset } = action;
      if (!Array.isArray(items)) {
        return state;
      }
      let { stagedItems } = state;
      if (!Array.isArray(stagedItems)) {
        stagedItems = [];
      }
      stagedItems = reset ? items : stagedItems.concat(items);
      stagedItems = stagedItems.filter(Boolean);
      stagedItems = filterDuplicate(stagedItems, (item) => item.code);
      return {
        ...state,
        stagedItems,
      };
    }
    case ITEMS_UNSTAGED: {
      const { itemCodes } = action;
      if (!Array.isArray(itemCodes)) {
        return state;
      }
      let { stagedItems } = state;
      if (!Array.isArray(stagedItems)) {
        stagedItems = [];
      }
      return {
        ...state,
        stagedItems: stagedItems
          .filter(Boolean)
          .filter((item) => !itemCodes.includes(item.code)),
      };
    }
    default: {
      return state;
    }
  }
};

export default fileManager;
