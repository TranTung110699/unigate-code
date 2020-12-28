import { SAVE_PRELOAD_DATA } from 'actions/creators';

function preloadData(state = {}, action) {
  switch (action.type) {
    case SAVE_PRELOAD_DATA: {
      const { itemIid, data } = action;

      return {
        ...state,
        [itemIid]: data,
      };
    }
    default:
      return state;
  }
}

export default preloadData;
