/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */

import { SET_DETAIL_OF_SESSIONS_PANEL_STATUS } from 'actions/timetable';

const timetableInitialState = {
  sessionPanelStatus: false,
};

const timetable = (state = timetableInitialState, action) => {
  let newState = {};

  switch (action.type) {
    case SET_DETAIL_OF_SESSIONS_PANEL_STATUS:
      const status = action.status;

      newState = {
        ...state,
        sessionPanelStatus: status,
      };
      break;
    default:
      return state;
  }
  return newState;
};
export default timetable;
