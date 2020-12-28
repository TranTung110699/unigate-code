/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */
import { timetableV2 } from 'actions/timetable/TimetableV2';

const timetableInitialState = {
  timetables: [],
  sessionsOfCourse: {},
};

const timetable = (state = timetableInitialState, action) => {
  let newState = {};

  switch (action.type) {
    case timetableV2.STORE_TIMETABLES:
      const timetables = action.timetables || [];

      newState = {
        ...state,
        timetables: [...timetables],
        lastUpdateTimetable: new Date().getTime(),
      };
      break;
    case timetableV2.STORE_SESSIONS:
      const sessions = action.sessions;
      const courseIid = action.courseIid;

      newState = {
        ...state,
        sessionsOfCourse: {
          ...state.sessionsOfCourse,
          [courseIid]: [...sessions],
        },
      };
      break;
    default:
      return state;
  }
  return newState;
};
export default timetable;
