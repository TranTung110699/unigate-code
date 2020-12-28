/*
import sessionApiUrls from 'components/admin/session/endpoints';
 */
export default {
  join_class_by_session: '/session/api/join-virtual-class',
  get_session_recording: '/session/api/get-session-recording',
  search_sessions_in_course: '/session/search',
  session_update: '/session/update',
  delete_meeting: '/session/api/delete-meeting',

  sessions_search: '/session/api/get-sessions-in-time-interval',
  get_session_in_current_time: '/session/api/get-session-in-current-time',
  // get_sessions_for_user: '/session/api/get-sessions-for-user',
  get_session_api: '/session/api/get-detail',
  // get_session_info: '/session/detail',
  get_session_will_assigned_for_user:
    '/session/get-session-will-assigned-for-user',
  session_search_user: '/session/api/search-users',
};
