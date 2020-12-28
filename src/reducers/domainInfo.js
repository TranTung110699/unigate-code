/**
 * Created by vohung on 06/06/2017.
 */
function domainInformation(state = {}, action) {
  switch (action.type) {
    case 'SAVE_INFORMATION_BY_DOMAIN': {
      const data = action.data || {};
      return Object.assign({}, state, data);
    }
    default:
      return state;
  }
}

export default domainInformation;
