const errorCodes = {
  syncChildFailed: 'syncChildFailed',

  TIMETABLE_DUPLICATE: 1001,

  // const serverErrorCodes = {
  /*
   * ERR code blocks must be sorted according to module's position in the project
   * ERR code must be incremental and cannot be duplicated for each module
   * should follow a module's allowed range
   * ERR codes should be configured in react frontend, exactly the same key
   */
  // system: range [1000-].
  ERR_SYSTEM_MONGODB_DOWN: 10001,

  // course
  ERR_COURSE_NOT_FOUND: 8,
  ERR_LOAD_DATA: 11,
  ERR_COURSE_NOT_YET_UNLOCKED: 14,
  ERR_USER_REGISTERED: 15,

  //course- register [520-540]
  ERR_COURSE_REGISTERED: 522,
  ERR_COURSE_FULL_STUDENT: 523,
  ERR_COURSE_LESS_TIME_REGISTER: 524,
  ERR_COURSE_TIME_OUT_REGISTER: 525,
  ERR_COURSE_NOT_REGISTERED: 526,
  ERR_COURSE_TIME_OUT_UNREGISTERABLE: 527,

  // course - duplicated
  ERR_ENROL_IN_COURSE: 13,
  ERR_FAVORITE_IN_COURSE: 13,

  ERR_COURSE_DEL: 9,
  ERR_UNENROL_FROM_COURSE: 9,

  // sinvite
  ERR_NOT_LOGGED_IN_USER: 1,
  ERR_SINVITE_INVALID: 2,
  ERR_SINVITE_EXPIRED: 3,
  ERR_ALREADY_ACCEPTED: 4,

  // site
  ERR_BK_THECAO_NOT_CONFIGURED: 11,

  //google authentiction [100-110]
  ERR_GA_REQUIRED: 100,
  ERR_GA_SETUP_REQUIRED: 101,
  ERR_GA_ALREADY_SETUP_CANNOT_REQUEST_QR_AGAIN: 102,

  // skill [20-30]
  ERR_SKILL_IN_RELATION: 21,
  ERR_SKILL_NOT_FOUND: 22,
  ERR_SKILL_RELATION_NOT_FOUND: 23,

  // user
  ERR_USER_PASS_LOGIN_FAILED: 3,
  ERR_USER_ALREADY_EXISTS: 4,
  ERR_USER_NOT_EXISTED: 5,
  ERR_CHANGE_PASS_CURRENT_PASS_WRONG: 6,
  ERR_USER_NOT_LOGGED_IN: 7,
  ERR_DUPLICATED_USER: 13,
  ERR_OVERED_CANDIDATE_LIMIT: 14,
  ERR_STUDENT_EXIST_IN_SCHOOL: 61,
  ERR_AUTHENTICATE_FAILED: 401,

  ERR_DUPLICATED_INVOICE: 68,
  LOCKED_PAYMENT_USER: 69,

  ERR_TIMETABLE_DUPLICATE: 1001,
  ERR_CONTRACT_DUPLICATE: 1002,

  //plan
  ERR_PLAN_CURRICULUM_NOTFOUND: 23,

  //work note
  ERR_WORK_NOTE_OBJECT_NOTFOUND: 18,
  ERR_WORK_NOTE_MESSAGE_NOTFOUND: 19,

  // school [600-700]
  ERR_SCHOOL_NOT_EXISTS: 601,

  // Learn permission [700-750]
  // moved into components/learn/errors/codes.js

  // ERR_LEARN_PERMISSION_INVALID_IP: 701,// your ip address is not in valid IP range
  // ERR_LEARN_PERMISSION_GUEST_CANNOT_LEARN: 702, // Guest cannot learn this item
  // ERR_LEARN_PERMISSION_END_DATE_OVER_TIME: 703,// you were late
  // ERR_LEARN_PERMISSION_NOT_INVITE: 704, // you have to be invited to learn it
  // ERR_LEARN_PERMISSION_INVITE_STATUS_DELETED_OR_REJECTED: 705,// your invite status is deleted or rejected
  // ERR_LEARN_PERMISSION_START_DATE_NOT_YET_STARTED: 707,

  // Allowed permission to insert data from share DB [751 - 800]
  ERR_INVALID_IP_TO_INSERT_DATA_FROM_SHARE_DB: 751, // your ip address is not in valid IP range

  // syllabus [410-420]
  ERROR_SYLLABUS_SCORM_FILE_IS_INVALID: 410,
  ERROR_SYLLABUS_ONLINE_ONLY_BUT_EMPTY_CONTENT: 411,
  ERROR_SYLLABUS_HAS_INVALID_SCORM_OFFSPRINT: 412,
};

export default errorCodes;
