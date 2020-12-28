/*
  bankDialogNType: ['sco','question'...] or empty
    if empty: the bankDialog will be hidden
    bankDialog is the dialog that display ['Add new $ntype', 'Choose from bank']
    dialog when adding a new item
  item: object which is the item we're currently editing
    for example when we're at
    http://vlms.dev/syllabus/12/sco/23/video/45
    then video #45 is the item

 */
function editing(state = {}, action) {
  switch (action.type) {
    case 'EDITING_ITEM': {
      const { data } = action;
      return {
        ...state,
        ...data,
      };
    }
    case 'BANK_DIALOG_NODE_TYPE': {
      const bankDialogNtype = action.ntype;
      const bankDialogNodeSubtype = action.subType;
      const editingItemIid = action.editingItemIid;
      const fieldEdit = action.fieldEdit || '';
      const pSubtype = action.pSubtype;
      const options = action.options;
      return {
        ...state,
        bankDialogNtype,
        bankDialogNodeSubtype,
        editingItemIid,
        fieldEdit,
        pSubtype,
        options,
      };
    }
    case 'EDIT_METADATA_SET_MAX_DEPTH': {
      return {
        ...state,
        metadataMaximumDepth: action.depth || 1,
      };
    }
    case 'EDIT_METADATA_INCREASE_MAX_DEPTH': {
      const depth = state.metadataMaximumDepth || 0;
      return {
        ...state,
        metadataMaximumDepth: depth + 1,
        visualTreeDepth: 0, // also reset visualTreeDepth
      };
    }
    case 'EDIT_METADATA_DECREASE_MAX_DEPTH': {
      const depth = state.metadataMaximumDepth || 0;
      return {
        ...state,
        metadataMaximumDepth: depth - 1,
        visualTreeDepth: 0,
      };
    }
    case 'EDIT_LIST_ITEM_IID_RENDERER': {
      const newState = Object.assign({}, state);
      const { itemIid, reset } = action;
      let itemIidsRenderer = newState.itemIidsRenderer || [];

      if (reset) {
        itemIidsRenderer = [];
      } else if (!itemIidsRenderer.includes(itemIid.toString())) {
        itemIidsRenderer.push(itemIid.toString());
      }

      return { ...newState, itemIidsRenderer };
    }
    case 'EDIT_METADATA_FILTER_ADD_NTYPE': {
      const metadataFilters = state.metadataFilters
        ? Object.assign({}, state.metadataFilters)
        : {};
      // console.log(action);
      action.ntype.forEach((ntype) => {
        metadataFilters[ntype] = true;
      });

      return { ...state, metadataFilters };
    }
    case 'EDIT_METADATA_FILTER_REMOVE_NTYPE': {
      const metadataFilters = state.metadataFilters
        ? Object.assign({}, state.metadataFilters)
        : {};
      // console.log(action);
      action.ntype.forEach((ntype) => {
        metadataFilters[ntype] = false;
      });

      return { ...state, metadataFilters };
    }
    case 'EDIT_METADATA_SET_FILTER': {
      return {
        ...state,
        metadataFilters: action.metadataFilters,
      };
    }
    case 'EDIT_METADATA_AVAILABLE_NTYPE_FILTERS': {
      return {
        ...state,
        availableNtypeFilters: action.availableNtypeFilters,
      };
    }
    case 'EDIT_METADATA_SET_VISUAL_TREE_DEPTH': {
      // console.log('EDIT_METADATA_SET_VISUAL_TREE_DEPTH', action);
      const depth = state.visualTreeDepth || 0;
      if (action.depth > depth || action.force)
        return {
          ...state,
          visualTreeDepth: action.depth,
        };
      return state;
    }
    default:
      return state;
  }
}

export default editing;
