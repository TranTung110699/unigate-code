export const CREATE_NEW_TIMETABLE_REQUEST = 'CREATE_NEW_TIMETABLE_REQUEST';
export const UPDATE_TIMETABLE = 'UPDATE_TIMETABLE';
export const RESOLVE_CONFLICT_4_TIMETABLE = 'RESOLVE_CONFLICT_4_TIMETABLE';
export const DELETE_TIMETABLE = 'DELETE_TIMETABLE';
export const SET_DETAIL_OF_SESSIONS_PANEL_STATUS =
  'SET_DETAIL_OF_SESSIONS_PANEL_STATUS';

export const timetableActions = {
  createNewTimeTableRequest: (url, formid, timetable, options) => {
    return {
      type: 'CREATE_NEW_TIMETABLE_REQUEST',
      timetable,
      formid,
      url,
      options,
    };
  },
  setDetailOfSessionPanelStatus: (status) => {
    return {
      type: 'SET_DETAIL_OF_SESSIONS_PANEL_STATUS',
      status,
    };
  },
  updateTimeTableRequest: (url, formid, timetable, options) => {
    return {
      type: 'UPDATE_TIMETABLE',
      timetable,
      formid,
      url,
      options,
    };
  },
  updateDataOfTimeTableRequest: (
    url,
    formid,
    data,
    timetable,
    updateType,
    dayOfUpdateInTimeStamp,
    options,
    timetableIid,
  ) => {
    return {
      type: 'UPDATE_DATA_OF_TIMETABLE',
      url,
      formid,
      timetable,
      updateType,
      dayOfUpdateInTimeStamp,
      options,
      data,
    };
  },

  resolveConflict4TimeTableRequest: (url, formid, timetables) => {
    return {
      type: 'RESOLVE_CONFLICT_4_TIMETABLE',
      timetables,
      formid,
      url,
    };
  },
  deleteTimeTableRequest: (url, formid, timetable, options) => {
    return {
      type: 'DELETE_TIMETABLE',
      timetable,
      formid,
      url,
      options,
    };
  },
  onChooseTimeSlot: (chosenTime, itemIid) => {
    return {
      type: 'CHOOSE_TIME_SLOT',
      chosenTime,
      itemIid,
    };
  },
  addRoomsToClass: (url, class_iid, room_iids) => ({
    type: 'ADD_ROOMS_TO_CLASS',
    url,
    class_iid,
    room_iids,
  }),
  removeRoomFromClass: (url, class_iid, room_iid) => ({
    type: 'REMOVE_ROOMS_TO_CLASS',
    url,
    class_iid,
    room_iid,
  }),
};
