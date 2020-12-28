export const timetableV2 = {
  GET_SESSIONS_OF_COURSE: 'GET_SESSIONS_OF_COURSE',
  GET_TIMETABLES: 'GET_TIMETABLES',
  STORE_TIMETABLES: 'STORE_TIMETABLES',
  STORE_SESSIONS: 'STORE_SESSIONS',
  UPSERT_TIME_TABLE: 'UPSERT_TIME_TABLE',
  REMOVE_TIME_TABLE: 'REMOVE_TIME_TABLE',
  REVOVE_DAY_OF_TIME_TABLE: 'REVOVE_DAY_OF_TIME_TABLE',
};

const timetableEndpoints = {
  upsert_entpoint: `/timetable-v2/upsert`,
  remove: `/timetable-v2/remove`,
  get_timetables: `/timetable-v2/get`,
  get_sessions: `/timetable-v2/get-sessions`,
  search_venus: `/venue/api/get-venue-by-parent`,
};

export default {
  getTimetables: (params, options) => {
    return {
      type: timetableV2.GET_TIMETABLES,
      url: timetableEndpoints.get_timetables,
      params,
      options,
    };
  },
  getSessions: (params, options) => {
    return {
      type: timetableV2.GET_SESSIONS_OF_COURSE,
      url: timetableEndpoints.get_sessions,
      params,
      options,
    };
  },
  storeTimetables: (timetables) => {
    return {
      type: timetableV2.STORE_TIMETABLES,
      timetables,
    };
  },
  storeSessions: (courseIid, sessions) => {
    return {
      type: timetableV2.STORE_SESSIONS,
      sessions,
      courseIid,
    };
  },
  upsertTimetable: (params, options) => {
    return {
      type: timetableV2.UPSERT_TIME_TABLE,
      url: timetableEndpoints.upsert_entpoint,
      params,
      options,
    };
  },
  removeTimetable: (params, options) => {
    return {
      type: timetableV2.REMOVE_TIME_TABLE,
      url: timetableEndpoints.remove,
      params,
      options,
    };
  },
};
