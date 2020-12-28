/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */

import { STICKY_HEADER_HEIGHT, WINDOW_RESIZE } from 'layouts/learning/actions';

import { ON_SHOW_QUICK_VIEW } from 'layouts/learning/quickview/actions';

import { CONFIG_MENU_LEFT } from '../../actions/creators';

const commonState = {
  screenSize: {},
  bodyScreenSize: {},
  showQuickView: false,
};

const CommonState = (state = commonState, action) => {
  let newState = {};
  switch (action.type) {
    case WINDOW_RESIZE:
      newState = {
        ...state,
        screenSize: action.screenSize,
        bodyScreenSize: action.bodyScreenSize,
      };
      break;
    case ON_SHOW_QUICK_VIEW:
      newState = {
        ...state,
        showQuickView: action.showQuickView,
      };
      break;
    case CONFIG_MENU_LEFT: {
      newState = {
        ...state,
        leftMenuConfig: action.configs,
      };
      break;
    }
    case STICKY_HEADER_HEIGHT:
      newState = {
        ...state,
        stickyHeaderHeight: action.height,
      };
      break;
    default:
      return state;
  }
  return newState;
};
export default CommonState;
