/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */

import { LOGIN_SUCCESS_ACTION } from 'actions/auth';
import { CHANGE_USER_MONEY, CHANGE_USER_WORKING_MODE } from 'actions/user';

import { extractObject } from 'common/utils/Array';
import { SESSION_EXPIRED } from '../../actions/auth';

const userInitialState = {
  info: {},
  ga: {},
  sessionExpired: false,
};

const user = (state = userInitialState, action) => {
  let newState = {};
  const { ga } = state;

  switch (action.type) {
    case LOGIN_SUCCESS_ACTION: {
      const { userInfo, keyFilter } = action;
      let info = {};
      if (keyFilter) {
        info = Object.assign(
          info,
          state.info,
          extractObject(userInfo, keyFilter),
        );
      } else {
        info = userInfo;
      }
      newState = {
        ...state,
        info,
        ga: Object.assign({}, ga, {
          ga_enabled: info.ga_enabled,
        }),
        // TODO: ga: enabled, browserToken???
      };
      break;
    }
    case CHANGE_USER_MONEY: {
      if (!state.info) break;
      newState = Object.assign({}, state, {
        info: Object.assign({}, state.info, {
          counter: action.counter,
        }),
      });
      break;
    }
    case 'GA_UPDATE_TOKEN':
      // console.log('GA_UPDATE_TOKEN', action);
      newState = Object.assign({}, state, {
        ga: Object.assign({}, ga, action.payload),
      });
      break;

    case 'UNMASK_TEACHER':
      newState = action.payload;
      break;

    case 'CHANGE_USER_WIDGET': {
      const { widget } = action;
      const info = { ...state.info, widget };
      newState = { ...state, info };
      break;
    }

    case CHANGE_USER_WORKING_MODE: {
      const { workingMode } = action;
      const info = { ...state.info, working_mode: workingMode };
      newState = { ...state, info };
      break;
    }

    case SESSION_EXPIRED: {
      const { expired } = action;
      newState = { ...state, sessionExpired: expired };
      break;
    }

    default:
      return state;
  }
  return newState;
};
export default user;
