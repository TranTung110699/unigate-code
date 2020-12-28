/**
 * Created by vohung on 07/06/2017.
 */

function configTopMenu(state = {}, action) {
  switch (action.type) {
    case 'SET_ELEMENT_TOP_MENU': {
      const element = action.element || {};
      return Object.assign({}, state, element);
    }
    default:
      return state;
  }
}

export default configTopMenu;
