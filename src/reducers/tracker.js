/**
 * Created by vohung on 22/05/2017.
 */

function trackerProgress(state = {}, action) {
  switch (action.type) {
    case 'SAVE_PROGRESS_MULTI': {
      const data = action.data || {};
      return Object.assign({}, state, data);
    }
    default:
      return state;
  }
}

export default trackerProgress;
