/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { convertListOfValuesIntoOptionsForFormElement } from 'common/utils/form';
import { t, t1, t2, t3, t4 } from 'translate/index';
import getLodash from 'lodash.get';
import memoize from 'fast-memoize';

Object.values = (obj) => Object.keys(obj).map((key) => obj[key]);

export const layouts = {
  XPEAK: 'xpeak',
  PIXELZ: 'pixelz',
  ETEC: 'etec',
  VIETED: 'vieted',
  LOTUS: 'lotus',
  UMS: 'ums',
  EVN: 'evn',
  SEABANK: 'sb',
  VT: 'vt',
  BLUE: 'blue',
  HPU2: 'hpu2',
  MSI: 'msi',
  GJ: 'gj',
};

export const learningItemTypeViewers = {
  LEARN: 'learn', // Chỉ định cho màn hình học các item
  PREVIEW_LEARN: 'p-learn', // Mode này giúp giáo viên có thể preview được khóa học
  REVIEW_LEARN: 'r-learn', // Sau khi học sinh hoàn thành khóa học được review lại các item đã học
  OVERVIEW: 'overview', // Chỉ định cho màn hình overview khóa học
  PREVIEW_OVERVIEW: 'p-overview',
  REVIEW_OVERVIEW: 'r-overview',
  SESSION_OFFLINE: 'session-offline', // Dùng để hỗ trợ học sinh xem trước các item trong một buổi học offline
};

export const notificationStatuses = {
  INIT: 'init',
  READ: 'read',
  SENT: 'sent',
  DONE: 'done',
};

export const hrmsTypes = {
  USER: 'users',
  ORGANIZATION: 'organizations',
  PHONGBAN: 'phongbans',
  POSITION: 'positions',
  EQUIVALENT_POSITION: 'equivalent-positions',
  TOP_EQUIVALENT_POSITION: 'top-equivalent-positions',
};

export const notificationRequireActions = {
  YES: 1,
  NO: 0,
};

export const schoolsOfTheme = {
  APC: 'apc',
  WU: 'wu',
};

export const nodeRoles = {
  ROOT: 'root',
  TEACHER: 'teacher',
  TUTOR: 'tutor',
  MARKER: 'marker',
  STAFF: 'staff',
};

export const ScoreLabelMapping = {
  1: 'Acceptable',
  2: 'Average',
  3: 'Good',
};

export const scoreScaleTypes = {
  '0_100': '0_100',
  '0_10': '0_10',
  '0_4': '0_4',
  abcdf: 'abcdf',
  pmd: 'pmd',
};

export const targetType = {
  USER: 'user',
  USER_GROUP: 'user_group',
};

export const YesNo = {
  YES: 'yes',
  NO: 'no',
};

export const addContractMethods = {
  NORMAL: 'normal',
  SIMPLE: 'simple',
};

export const invoiceStatuses = {
  INIT: 'init',
  DEPOSIT: 'deposit',
  PAID: 'paid',
  INVALID: 'invalid',
  CANCELLED: 'canceled',
};

export const invoiceTypes = {
  DEPOSIT: 'deposit',
  PAYMENT_BY_CASH: 'payment_by_cash',
  PAYMENT_BY_WALLET: 'payment_by_wallet',
  AUTOMATICALLY_PAYMENT_BY_WALLET: 'automatically_payment_by_wallet',
};

export const blogTypes = {
  BLOG: 'blog',
  PAGE: 'page',
  EVENT: 'event',
};

export const UsedFor = {
  LEARN: 'learn',
  EXAM: 'exam',
  SURVEY: 'survey',
  VIDEO: 'video',
};

export const FailedPassed = {
  FAILED: 'failed',
  PASSED: 'passed',
};

export const UiLibs = {
  MATERIAL_UI: 'material_ui',
  ANT: 'ant',
};

export const UsedForOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(Object.values(UsedFor), t1);

export const FailedPassedOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(Object.values(FailedPassed), t1);

export const userMajorStatus = {
  APPLIED: 'applied',
  QUALIFIED: 'qualified',
  STUDYING: 'studying',
  PASSED: 'passed',
  FAILED: 'failed',
  CERTIFIED: 'certified',
  ON_LEAVE: 'on-leave', // Bảo lưu
  SUSPENSION: 'suspension', // Đình chỉ
  CANCEL: 'cancel',
  STATUS_REJECTED: 'rejected',
  EXPULSION: 'expulsion', // Buộc thôi học
  DROP_OUT: 'drop-out', // Bỏ học
};

export const reqStatuses = {
  STATUS_SENT: 'sent',
  STATUS_PROCESSING: 'processing',
  STATUS_PROCESSED: 'processed',
  STATUS_REJECTED: 'rejected',
  STATUS_CANCEL: 'canceled',
};

export const requestStatus = {
  APPLIED: 'applied',
  ACCEPT: 'accept',
  REJECT: 'reject',
};

const requestStatusToText = (key) => {
  const map = {
    [requestStatus.APPLIED]: t1('applied'),
    [requestStatus.ACCEPT]: t1('accept'),
    [requestStatus.REJECT]: t1('reject'),
  };
  return map[key];
};

export const requestStatusOptions = () =>
  Object.values(requestStatus).map((status) => ({
    value: status,
    label: requestStatusToText(status),
    primaryText: requestStatusToText(status),
  }));

export const reqStatusOptions = () =>
  Object.values(reqStatuses).map((status) => ({
    value: status,
    label: t1(status),
    primaryText: t1(status),
  }));

export const reqTypesOptions = () =>
  Object.values(reqTypes).map((reqType) => ({
    value: reqType,
    label: t1(reqType),
    primaryText: t1(reqType),
  }));

export const examMethods = {
  FIXED_TIME_FULL_DURATION: 'fixed_time_full_duration',
  FIXED_TIME_STRICT_DURATION: 'fixed_time_strict_duration',
  FLEXIBLE_TIME_FULL_DURATION: 'flexible_time_full_duration',
  FLEXIBLE_TIME_STRICT_DURATION: 'flexible_time_strict_duration',
};

export const reqTypes = {
  CHANGE_CLASS: 'change_class',
  CHANGE_MAJOR: 'change_major',
  REGISTRATION_MAJOR: 'registration_major',
  CHANGE_SCHOOL: 'change_school',
  REQUEST_OTHER: 'another_request',
  POSTPONE_FEE_DEADLINE: 'postpone_fee_deadline',
  REGISTER_CREDIT_SYLLABUS: 'register_credit_syllabus',
  TYPE_LEAVE_OF_ABSENCE: 'leave_of_absence',
  LEAVE_OF_ABSENCE_BY_DATE: 'leave_of_absence_by_date',
};

export const attenStatus = {
  ATTENDANCE_ABSENTED_STATUS: 0, // Vắng mat
  ATTENDANCE_ATTENDED_STATUS: 1, // Có mặt | đi học đúng giờ
  ATTENDANCE_ALLOWED_LEAVE_STATUS: 2, // Nghỉ học có phép
  ATTENDANCE_DEBIT_STATUS: 3, // Nợ phí
  ATTENDANCE_LATE_STATUS: 4, // Đi học muộn
};

export const attendanceTypes = {
  ATTENDANCE_SESSION_FOR_ALL_USER_TYPE: 'session_for_all_user',
  ATTENDANCE_ALL_SESSION_FOR_USER_TYPE: 'all_session_of_user',
  ATTENDANCE_SESSION_FOR_USER_TYPE: 'session_for_user',
};

export const relationTypes = {
  USER_CATEGORY: 1,
  STAFF_CATEGORY: 6,
};

export const userGroupSubTypes = {
  NORMAL_USER_GROUP: 0,
  ASSIGNMENT_GROUP: 1,
  ENROLMENT_PLAN_GROUP: 2,
};

export const learningMethods = {
  ONLINE: 'online',
  ILT_PHYSICAL: 'ilt_physical',
  ILT_BBB: 'ilt_bbb',
};

export const supportedLearningMethods = [
  {
    value: learningMethods.ONLINE,
    label: t1('online'),
    primaryText: t1('online'),
  },
  {
    value: learningMethods.ILT_PHYSICAL,
    label: t1('ilt_physical'),
    primaryText: t1('ilt_physical'),
  },
  {
    value: learningMethods.ILT_BBB,
    label: t1('ilt_bbb'),
    primaryText: t1('ilt_bbb'),
  },
];
/**
 * 1 = on_time| 4 = late| 0 = absent|3 = on-leave
 * @returns {*[]}
 */
export const attendanceStatusOptions = () => [
  {
    value: attenStatus.ATTENDANCE_ATTENDED_STATUS,
    label: t1('on_time'),
    primaryText: t1('on_time'),
  },
  {
    value: attenStatus.ATTENDANCE_LATE_STATUS,
    label: t1('late'),
    primaryText: t1('late'),
  },
  {
    value: attenStatus.ATTENDANCE_ABSENTED_STATUS,
    label: t1('absent'),
    primaryText: t1('absent'),
  },
  {
    value: attenStatus.ATTENDANCE_ALLOWED_LEAVE_STATUS,
    label: t1('leave_allowed'),
    primaryText: t1('leave_allowed'),
  },
];

export const attendanceStatus = () => [
  {
    value: 'all',
    label: t1('all'),
    primaryText: t1('all'),
  },
  {
    value: 'studied',
    label: t1('attended'),
    primaryText: t1('attended'),
  },
  {
    value: 'cancelled',
    label: t1('absent'),
    primaryText: t1('absent'),
  },
];

export const eventTypes = {
  ONCE: 'once',
  RECURRING: 'recurring',
};

export const eventTypeToText = (type) =>
  ({
    [eventTypes.ONCE]: t1('once'),
    [eventTypes.RECURRING]: t1('recurring'),
  }[type]);

export const eventTypeOptions = convertListOfValuesIntoOptionsForFormElement(
  Object.values(eventTypes),
  eventTypeToText,
);

export const leariningShifts = [
  {
    value: 'all',
    label: t1('all'),
    primaryText: t1('all'),
  },
  {
    value: 'morning_shift',
    label: t1('morning_shift'),
    primaryText: t1('morning_shift'),
  },
  {
    value: 'afternoon_shift',
    label: t1('afternoon_shift'),
    primaryText: t1('afternoon_shift'),
  },
  {
    value: 'evening_shift',
    label: t1('evening_shift'),
    primaryText: t1('evening_shift'),
  },
];

// const options = [
//   {
//     value: 'attendance',
//     label: t1('attendance'),
//     primaryText: t1('attendance'),
//   },
//   {
//     value: 'test',
//     label: t1('test'),
//     primaryText: t1('test'),
//   },
//   {
//     value: 'academic_score',
//     label: t1('exam'),
//     primaryText: t1('exam'),
//   },
// ];
// if (!Array.isArray(enables)) {
//   return options;
// }
//
// return options.filter((item) => enables.includes(item.value));
// };

export const languages = [
  {
    value: 'en',
    label: 'English',
    primaryText: 'English',
  },
  {
    value: 'vn',
    label: 'Tiếng Việt',
    primaryText: 'Tiếng Việt',
  },
  {
    value: 'jp',
    label: '日本語',
    primaryText: '日本語',
  },
];

export const nationalities = () => [
  {
    value: 'vietnamese',
    primaryText: t1('vietnamese'),
  },
  {
    value: 'english',
    primaryText: t('english'),
  },
  {
    value: 'japanese',
    primaryText: t('japanese'),
  },
];

export const semesterTypes = () => [
  {
    value: 'semester',
    primaryText: t1('semester'),
    label: t1('semester'),
  },
  {
    value: 'school_year',
    primaryText: t1('school_year'),
    label: t1('school_year'),
  },
];
export const costType = () => [
  {
    value: 'budgetary',
    primaryText: t1('allocations_year'),
  },
  {
    value: 'cost',
    primaryText: t1('allocations_expense'),
  },
];
export const reportBy = () => [
  {
    value: 'month',
    primaryText: t1('month'),
  },
  {
    value: 'period',
    primaryText: t1('period'),
  },
];
export const reportByV2 = () => [
  {
    value: 'month',
    primaryText: t1('month'),
  },
];
export const year = (includeOptionAll = false, currentYearDefault = null) => {
  let currentYear;
  if (currentYearDefault) {
    currentYear = currentYearDefault;
  } else {
    const time = new Date();
    currentYear = time.getFullYear();
  }
  const array = [
    currentYear - 2,
    currentYear - 1,
    currentYear,
    currentYear + 1,
    currentYear + 2,
  ];

  let options = array.map((el) => ({
    value: el,
    primaryText: t1(`${el}`),
    label: t1(`${el}`),
  }));

  if (includeOptionAll) {
    options = [
      {
        value: '',
        primaryText: t1('all'),
        label: t1('all'),
      },
    ].concat(options);
  }

  return options;
};

export const monthOptions = () => {
  return [
    { value: 1, primaryText: t1('january'), label: t1('january') },
    { value: 2, primaryText: t1('february'), label: t1('february') },
    { value: 3, primaryText: t1('march'), label: t1('march') },
    { value: 4, primaryText: t1('april'), label: t1('april') },
    { value: 5, primaryText: t1('may'), label: t1('may') },
    { value: 6, primaryText: t1('june'), label: t1('june') },
    { value: 7, primaryText: t1('july'), label: t1('july') },
    { value: 8, primaryText: t1('august'), label: t1('august') },
    { value: 9, primaryText: t1('september'), label: t1('september') },
    { value: 10, primaryText: t1('october'), label: t1('october') },
    { value: 11, primaryText: t1('november'), label: t1('november') },
    { value: 12, primaryText: t1('december'), label: t1('december') },
  ];
};

export const customMonth = (year, unixTimeStamp) => {
  const time = new Date();
  const currentYear = time.getFullYear();
  const newYear = year || currentYear;
  const customMont = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return customMont.map((el) => {
    let tmp = new Date(newYear, el, 1, 10);
    tmp.setSeconds(0, 0);
    tmp = Date.parse(tmp);
    if (unixTimeStamp) {
      tmp = Math.floor(tmp / 1000);
    }
    return {
      value: tmp,
      primaryText: t1('tháng_%d_năm_%d ', [++el, newYear]),
    };
  });
};
export const studentLearnTypes = () => [
  {
    value: 'new',
    primaryText: t1('new'),
  },
  {
    value: 're-enroll',
    primaryText: t1('re-enroll'),
  },
  {
    value: 'improve-grades',
    primaryText: t1('improve_grades'),
  },
];

export const themeLayoutsAvailable = () => [
  {
    value: '',
    primaryText: t1('all'),
  },
  {
    value: 'ums',
    primaryText: t2('UMS'),
  },
  {
    value: 'xpeak',
    primaryText: t2('Xpeak'),
  },
  {
    value: 'pixelz',
    primaryText: t2('Pixelz'),
  },
  {
    value: 'lotus',
    primaryText: t2('LotusLMS'),
  },
  {
    value: 'vieted',
    primaryText: t2('VietED'),
  },
  {
    value: 'sb',
    primaryText: t2('SeABank'),
  },
  {
    value: 'msi',
    primaryText: t2('MSI'),
  },
  {
    value: 'evn',
    primaryText: t2('EVN'),
  },
  {
    value: 'vt',
    primaryText: t2('vt'),
  },
  {
    value: layouts.BLUE,
    primaryText: t2(layouts.BLUE),
  },
  {
    value: layouts.HPU2,
    primaryText: t2(layouts.HPU2),
  },
  {
    value: 'etec',
    primaryText: t2('english_testing_center'),
  },
  {
    value: layouts.GJ,
    primaryText: 'Go Japan',
  },
];

export const themeColorPalettesAvailable = () => [
  {
    value: 'dark',
    primaryText: t2('dark'),
  },
  {
    value: 'light',
    primaryText: t2('light'),
  },
];

export const configs = {
  CODENAME: 'edx',
  COOKIE_PREFIX: '_sand_',
  DOMAIN: 'xpeak.vn',
  DEFAULT_AVATAR: 'http://assets.vieted.com/images/avatar.gif',
  DEFAULT_BG: 'http://assets.xpeak.vn/xpeak/img/b-bg.png',
  APPLICATION_ENV: 'development.vlms',
  YOUTUBE_URL: 'https://www.youtube.com',
  VIMEO_URL: 'https://vimeo.com',
  VIMEO_API_ENDPOINT: 'https://api.vimeo.com',
  VIMEO_CLIENT_ID: '25ba183aa046afedb1572773df6ce53dbc203afc',
  VIMEO_CLIENT_SECRET:
    'n4HIHDmF0ZikoW7fvj7ksyoRtfvN2gDo8uz/OXYNIrfLghtEoD3It0w2Rh1w/SkQp6LfDe7+GZ444u2RQm/7Yn4b5Jcj+Gp6njwkQXmVlurWoAo3T157WzkzjnMQlY0o',
  VIMEO_ACCESS_TOKEN: 'a445be63ffc2a06bb9590d174ef11ba0',
  iconLib: 'fa', // themeva',
  LANGUAGE: 'en',
  autoload_plugins: true,
  TEMPLATE_STRING: '__template__',
  WEB_APP_ID: 'id_domain',
  WEB_APP_NAME: 'name_domain',
  media_items_per_page: 10,
  show_chat_system: 0,
};

export const ntype = {
  PATH: 'path',
  PROGRAM: 'program',
  PROGRAM_MODULE: 'program-module',
  SPECIALIZATION_PROGRAM: 'specialization-program',
  CLASS_GROUP: 'classgroup',
  SUBJECT_GROUP: 'subjectgroup',
  COURSE: 'course',
  SYLLABUS: 'syllabus',
  CREDIT: 'credit',
  VIDEO: 'video',
  SCO: 'sco',
  PAPER: 'paper',
  SKILL: 'skill',
  EXERCISE: 'exercise',
  VOCABSET: 'vocabset',
  VOCAB: 'vocab',
  QUESTION: 'question',
  END_INTRO_STICKY: 'end_intro_sticky',
  GOAL: 'goal',
  ZM: 'zm',
  SURVEY: 'survey',
  ENROLMENT_PLAN: 'enrolment_plan',
};

export const programSubTypes = {
  ENROLMENT_PLAN: 'enrolment_plan',
};

export const lectureType = {
  VIDEO: 'video',
  TEXT: 'text',
  PDF: 'pdf',
};

export const skillType = {
  SKILL: 'skill',
  RUBRIC: 'rubric',
  PMD_RUBRIC: 'pmd_rubric',
};

export const courseLearningTypes = {
  ONLINE: 'online',
  ILT: 'ilt',
};

export const courseLearningTypeToText = (type) => {
  const map = {
    [courseLearningTypes.ONLINE]: t1('online'),
    [courseLearningTypes.ILT]: t1('ilt'),
  };
  return map[type];
};

export const inviteStatus = {
  INVITED: 0,
  MUST_LEARN: 1,
  ACCEPTED: 2,
  ACCEPTED_AUTOMATICALLY: 3,
  REJECTED: 4,
  DELETED: 5,
  COMPLETED: 6,
};
export const VenueTypeValue = {
  REVENUE: 'venue',
  FLOOR: 'floor',
  ROOM: 'room',
};
export const AssetStatusValue = {
  NOT_IN_USE: 'not_in_use',
  IN_USE: 'in_use',
  EXPIRED: 'expired',
  UNUSABLE: 'unusable',
};
export const importDataStatuses = {
  START: 'start',
  IMPORTING: 'importing',
  DONE: 'done',
  FAILED: 'failed',
};

export const loadingStatuses = {
  LOADING: 'loading',
  FINISHED: 'finished',
};

export const preloadDataStatuses = {
  INIT: 'init',
  LOADING: 'loading',
  LOADED: 'finished',
};

export const preloadDataTypes = {
  AUDIO: 'audio',
  YOUTUBE: 'youtube',
  VIMEO: 'vimeo',
  IMAGE: 'image',
  PDF: 'pdf',
};

export const scorePeriods = {
  BAD: 10,
  IMPROVEMENT: 50,
  FINISH: 100,
};

export const exercisePassingScheme = {
  AVERAGE_QUESTION_SCORE: 'average_question_score',
  NUMBER_OF_FAILED_QUESTIONS: 'number_of_failed_questions',
  PERCENT_OF_FAILED_QUESTIONS: 'percent_of_failed_questions',
};

export const vocabsetPassingScheme = {
  AVERAGE_QUESTION_SCORE: 'average_question_score',
};

export const questionPassingScheme = {
  AVERAGE_QUESTION_SCORE: 'average_question_score',
};

export const exerciseRuleTypes = {
  PRACTICE: 'practice',
  PRACTICE_SINGLE: 'practice_single',
  EXAM: 'exam',
};

export const sinviteStatuses = {
  STATUS_INVITED: 0,
  STATUS_MUST_LEARN: 1,
  STATUS_ACCEPTED: 2,
  STATUS_ACCEPTED_AUTOMATICALLY: 3,
  STATUS_REJECTED: 4,
  STATUS_DELETED: 5,
  STATUS_COMPLETED: 6,
  STATUS_REGISTERED: 7,
};

export const inviteActions = {
  ACTION_ACCEPT: 'accept',
  ACTION_REJECT: 'reject',
  ACTION_DELETE: 'delete',
};

export const courseModes = {
  MODE_REJECTED: 'rejected',
  MODE_DELETED: 'deleted',
  MODE_ASSIGNED: 'assigned',
  MODE_COMPLETED: 'completed',
  MODE_FAILED: 'failed',
  MODE_IN_PROGRESS: 'in-progress',
  MODE_COMPULSORY: 'compulsory',
  MODE_PUBLIC: 'public',
};

export const courseCompletedModes = [
  courseModes.MODE_COMPLETED,
  courseModes.MODE_FAILED,
];

export const exerciseRuleTypesConfig = {
  practice: {
    instant_key: 1,
  },
  practice_single: {
    instant_key: 1,
    question_sequence: 1,
  },
  exam: {
    question_sequence: 1,
  },
};

export const degreeKeys = () => [
  {
    value: 'full_name',
    primaryText: t1('full_name'),
  },
  {
    value: 'comment',
    primaryText: t('comment'),
  },
  {
    value: 'birthday',
    primaryText: t('birthday'),
  },
  {
    value: 'datetime',
    primaryText: t('datetime'),
  },
];

export const learnNavMenuTemplate = () => [
  {
    primaryText: t1('default'),
    value: 'default',
  },
  {
    primaryText: t1('sco_accordion'),
    value: 'sco_accordion',
  },
];

export const CURRENCY_VND = {
  primaryText: t('VND'),
  value: 'VND',
};
export const CURRENCY_USD = {
  primaryText: t('USD'),
  value: 'USD',
};
export const CURRENCY_JPY = {
  primaryText: t('JPY'),
  value: 'JPY',
};
export const CURRENCY_PERCENT = {
  primaryText: t('%'),
  value: '%',
};

export const DEPOSIT_TO_ACCOUNT = {
  primaryText: t('deposit_to_account'),
  value: 'deposit_to_account',
};

export const feesTemplateTypes = {
  TUITION_FEE_BY_SUBJECT: 'fee_by_subject',
  TUITION_FEE_BY_CREDIT: 'fee_by_credit',
  TUITION_FEE_BY_SEMESTER: 'fee_by_ico_semester',
  EXAMINATION_FEES: 'fee_for_resiting_final_exam',
  OTHER_FEES: 'fee_other',
};

export const feesTypeApplied = {
  TUITION_FEE: 'tuition_fee',
  EXAMINATION_FEES: 'fee_for_resiting_final_exam',
  DEPOSIT_TO_ACCOUNT: 'deposit_to_account',
  OTHER_FEES: 'fee_other',
};

export const appliedScope = {
  user: 'user',
  major: 'major',
};

export const depositToAccountType = {
  TUITION_FEE_BY_SEMESTER: 'fee_by_ico_semester',
  FREEDOM_FEE: 'freedom_fee',
};

export const difficulties = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export const targetItems = {
  ANOTHER_FEE_TARGET_ITEM_DYNAMIC_FEE: 'dynamic_fee',
  ANOTHER_FEE_TARGET_ITEM_INSURANCE: 'in_insurance',
};

export const feeTemplateTypeOptions = () => [
  {
    primaryText: t1(feesTemplateTypes.TUITION_FEE_BY_SUBJECT),
    label: t1(feesTemplateTypes.TUITION_FEE_BY_SUBJECT),
    value: feesTemplateTypes.TUITION_FEE_BY_SUBJECT,
  },
  {
    primaryText: t1(feesTemplateTypes.TUITION_FEE_BY_CREDIT),
    label: t1(feesTemplateTypes.TUITION_FEE_BY_CREDIT),
    value: feesTemplateTypes.TUITION_FEE_BY_CREDIT,
  },
  {
    primaryText: t1(feesTemplateTypes.TUITION_FEE_BY_SEMESTER),
    label: t1(feesTemplateTypes.TUITION_FEE_BY_SEMESTER),
    value: feesTemplateTypes.TUITION_FEE_BY_SEMESTER,
  },
  {
    primaryText: t1(feesTemplateTypes.EXAMINATION_FEES),
    label: t1(feesTemplateTypes.EXAMINATION_FEES),
    value: feesTemplateTypes.EXAMINATION_FEES,
  },
  {
    primaryText: t1(feesTemplateTypes.OTHER_FEES),
    label: t1(feesTemplateTypes.OTHER_FEES),
    value: feesTemplateTypes.OTHER_FEES,
  },
];

export const communicationMethods = Object.freeze({
  MAIL: 'mail',
  SMS: 'sms',
  NOTIFY: 'notify',
  WEB: 'web',
});

export const messageTemplateStatuses = Object.freeze({
  APPROVED: 'approved',
  QUEUED: 'queued',
});

export const constants = {
  modules: [
    'syllabus',
    'category',
    'course',
    'conf',
    'venue',
    'page',
    'user',
    'room',
    'blog',
    'sco',
    'role',
    'collaborator',
    'users',
    'user_learn',
    'organization',
    'contest',
    'exam_round',
    'video',
    'exercise',
    'question',
    'roles_menu',
    'vocabset',
    'vocab',
    'school',
    'xpeak_vip',
    'skill',
    'skill_relation',
    'take',
    'template',
    'path',
    'group',
    'invite',
    'communication',
    'unlock_support',
    'chat',
    'paper',
    'translate',
    'new_package',
    'search_card_package',
    'card',
    'redis',
    'school',
    'contract',
    'credit',
    'teaching_experience',
    'bank',
    'faq',
    'feedback',
    'degree',
    'rubric',
    'event',
    'exam_template',
    'major',
    'timetable',
    'passdef',
    'finance_template',
    'log',
    'school_role',
  ],
  leaves: ['vocab', 'question', 'video'],
  nonLeaves: ['sco', 'exercise', 'survey', 'program'],
  allNtypesOnUrl: [
    'question',
    'vocab',
    'vocabset',
    'video',
    'sco',
    'exercise',
    'syllabus',
    'credit',
    'program',
    'program-module',
    'course',
    'path',
    'survey',

    'academic-category',
    'skill',
    'rubric',
    'classgroup',
    'subjects-ingroup',
    'user-goal',
    'training-plan',
    'enrolment-plan',
    'major',
    'fee-category',
    'job-position',
    'organization',
    'top-equivalent-position',
    'student',
    'user',
    'teacher',
    'parent',
    'group',
    'contest',
    'exam-round',
    'goal',
    'exam-template',
    'question-bank',
    'venue',
    'fcp',
    'session',
    'event',

    'semester',
    'bus',
    'sales-package',
    'sales-order',
  ],

  scoreRoundingDigits: () => [
    {
      value: '0.0',
      primaryText: t1('round_to_integers'),
    },
    {
      value: '0.5',
      primaryText: '0.5',
    },
    {
      value: '0.25',
      primaryText: '0.25',
    },
  ],
  scoreRoundingAlgo: () => [
    {
      value: 'round',
      primaryText: t1('standard_rounding'),
    },
    {
      value: 'ceiling',
      primaryText: t1('ceiling_rounding'),
    },
    {
      value: 'floor',
      primaryText: t1('floor_rounding'),
    },
  ],
  advancingCriteria: () => [
    {
      value: 'top',
      primaryText: t1('take_top_contestants'),
    },
    {
      value: 'score',
      primaryText: t1('score_based'),
    },
  ],
  examFormats: () => [
    {
      value: '',
      primaryText: t1('normal_exam'),
    },
    {
      value: 'toeic',
      primaryText: 'TOEIC',
    },
    {
      value: 'toeic_reading',
      primaryText: 'TOEIC READING',
    },
    {
      value: 'toeic_listening',
      primaryText: 'TOEIC LISTENING',
    },
  ],
  sexOptions: () => [
    {
      value: '0',
      label: t1('female'),
    },
    {
      value: '1',
      label: t1('male'),
    },
  ],
  externalTypesOptions: () => [
    {
      value: 1,
      label: t1('external'),
    },
    {
      value: 0,
      label: t1('internal'),
    },
  ],
  StatusOptions: () => [
    {
      name: 'approved',
      value: 'approved',
      label: t1('approved'),
      primaryText: t1('approved'),
    },
    {
      name: 'queued',
      value: 'queued',
      label: t1('queued'),
      primaryText: t1('queued'),
    },
    {
      name: 'deleted',
      value: 'deleted',
      label: t1('deleted'),
      primaryText: t1('deleted'),
    },
  ],
  PaperStatusOptions: () => [
    {
      name: 'approved',
      value: 'approved',
      label: t1('approved'),
      primaryText: t1('approved'),
    },
    {
      name: 'deleted',
      value: 'deleted',
      label: t1('deleted'),
      primaryText: t1('deleted'),
    },
  ],
  actionStatusOptions: () => [
    {
      name: 'active',
      value: 'active',
      label: t1('active'),
      primaryText: t1('active'),
    },
    {
      name: 'inactive',
      value: 'inactive',
      label: t1('inactive'),
      primaryText: t1('inactive'),
    },
  ],
  transcriptStatusOptions: () => [
    {
      name: 'approved',
      value: 'approved',
      label: t1('approved'),
      primaryText: t1('approved'),
    },
    {
      name: 'queued',
      value: 'queued',
      label: t1('queued'),
      primaryText: t1('queued'),
    },
  ],
  timetableStatusOptions: () => [
    {
      name: 'no-timetable',
      value: 'no-timetable',
      label: t1('not_scheduled'),
      primaryText: t1('not_scheduled'),
    },
    {
      name: 'scheduling',
      value: 'scheduling',
      label: t1('scheduling'),
      primaryText: t1('scheduling'),
    },
    {
      name: 'scheduled',
      value: 'scheduled',
      label: t1('scheduled'),
      primaryText: t1('scheduled'),
    },
  ],
  messageTemplateStatusOptions: () => [
    {
      name: 'approved',
      value: messageTemplateStatuses.APPROVED,
      label: t1('approved'),
      primaryText: t1('approved'),
    },
    {
      name: 'queued',
      value: messageTemplateStatuses.QUEUED,
      label: t1('queued'),
      primaryText: t1('queued'),
    },
  ],
  attachResultFilesStatusOptions: () => [
    {
      name: 'yes',
      value: 'yes',
      label: t1('yes'),
      primaryText: t1('yes'),
    },
    {
      name: 'no',
      value: 'no',
      label: t1('no'),
      primaryText: t1('no'),
    },
  ],
  userStatusOptions: () => [
    {
      name: 'activated',
      value: 'activated',
      label: t1('activated'),
      primaryText: t1('activated'),
      checked: true,
    },
    {
      name: 'unactivated',
      value: 'unactivated',
      label: t1('unactivated'),
      checked: true,
      primaryText: t1('unactivated'),
    },
    {
      name: 'deleted',
      value: 'deleted',
      label: t1('deleted'),
      primaryText: t1('deleted'),
    },
  ],
  ContractTypesOptions: () => [
    {
      name: 'tutor', // giảng viên thỉnh giảng
      value: 'tutor',
      label: t1('tutor'),
      primaryText: t1('tutor'),
    },
    {
      name: 'lecturer', // giảng viên cơ hữu
      value: 'lecturer',
      label: t1('lecturer'),
      primaryText: t1('lecturer'),
    },
  ],
  StatusTeacherOptions: () => [
    {
      name: 'unactivated',
      value: 'unactivated',
      label: t1('unactivated'),
    },
    {
      name: 'activated',
      value: 'activated',
      label: t1('activated'),
    },
    {
      name: 'banned',
      value: 'banned',
      label: t1('banned'),
    },
    {
      name: 'deleted',
      value: 'deleted',
      label: t1('deleted'),
    },
  ],
  FinishingSeniorStatusesOptions: () => [
    {
      name: 'accepted',
      value: 1,
      label: t1('accepted'),
    },
    {
      name: 'not_accepted',
      value: 0,
      label: t1('not_accepted'),
    },
  ],
  GraduatingSeniorOptions: () => [
    {
      name: 'not_received',
      value: 0,
      label: t1('not_received'),
    },
    {
      name: 'partially_received',
      value: 2,
      label: t1('partially_received'),
    },
    {
      name: 'received',
      value: 1,
      label: t1('received'),
    },
  ],
  StatusReportOptions: () => [
    {
      value: '',
      primaryText: t1('all'),
    },
    {
      value: 'accepted',
      primaryText: t1('accepted'),
    },
    {
      value: 'rejected',
      primaryText: t1('rejected'),
    },
    {
      value: 'completed',
      primaryText: t1('completed'),
    },
    {
      value: 'invited',
      primaryText: t1('invited'),
    },
  ],
  BeingOptions: () => [
    {
      value: '',
      primaryText: t1('all'),
    },
    {
      value: '$lt',
      primaryText: t1('close_to'),
    },
    {
      value: '$eq',
      primaryText: t1('equal'),
    },
    {
      value: '$gt',
      primaryText: t1('better_than'),
    },
  ],
  communicationMethodsOptions: () => [
    {
      name: communicationMethods.MAIL,
      value: communicationMethods.MAIL,
      label: t1(communicationMethods.MAIL),
      primaryText: t1(communicationMethods.MAIL),
    },
    {
      name: communicationMethods.SMS,
      value: communicationMethods.SMS,
      label: t3(communicationMethods.SMS),
      primaryText: t3(communicationMethods.SMS),
    },
    {
      name: communicationMethods.NOTIFY,
      value: communicationMethods.NOTIFY,
      label: t1(communicationMethods.NOTIFY),
      primaryText: t1(communicationMethods.NOTIFY),
    },
    {
      name: communicationMethods.WEB,
      value: communicationMethods.WEB,
      label: t1(communicationMethods.WEB),
      primaryText: t1(communicationMethods.WEB),
    },
  ],
  BlogTypeOptions: () => [
    {
      value: '',
      primaryText: t1('all'),
    },
    {
      value: blogTypes.BLOG,
      primaryText: t1('blog_type'),
    },
    {
      value: blogTypes.PAGE,
      primaryText: t1('page_type'),
    },
    {
      value: blogTypes.EVENT,
      primaryText: t1('event_type'),
    },
  ],
  VenueTypeValue: {
    REVENUE: VenueTypeValue.REVENUE,
    FLOOR: VenueTypeValue.FLOOR,
    ROOM: VenueTypeValue.ROOM,
  },
  VenueTypeOptions: () => [
    {
      value: '',
      primaryText: t1('select a type'),
    },
    {
      value: VenueTypeValue.REVENUE,
      primaryText: t1('venue_type'),
    },
    {
      value: VenueTypeValue.FLOOR,
      primaryText: t1('floor_type'),
    },
    {
      value: VenueTypeValue.ROOM,
      primaryText: t1('room_type'),
    },
  ],
  AssetStatusValue: {
    NOT_IN_USE: AssetStatusValue.NOT_IN_USE,
    IN_USE: AssetStatusValue.IN_USE,
    EXPIRED: AssetStatusValue.EXPIRED,
    UNUSABLE: AssetStatusValue.UNUSABLE,
  },
  AssetStatusOptions: () => [
    {
      value: '',
      primaryText: t1('all_statuses'),
    },
    {
      value: AssetStatusValue.NOT_IN_USE,
      primaryText: t1('not_in_use'),
    },
    {
      value: AssetStatusValue.IN_USE,
      primaryText: t1('in_use'),
    },
    {
      value: AssetStatusValue.EXPIRED,
      primaryText: t1('expired'),
    },
    {
      value: AssetStatusValue.UNUSABLE,
      primaryText: t1('unusable'),
    },
  ],
  RoomTypeOptions: () => [
    {
      value: '',
      primaryText: t1('select a type'),
    },
    {
      value: 'theory',
      primaryText: t1('study_room'),
    },
    {
      value: 'practice',
      primaryText: t1('practice_room'),
    },
  ],
  IsFeaturedOptions: () => [
    {
      value: '',
      primaryText: t1('all'),
    },
    {
      value: '1',
      primaryText: t1('hot'),
    },
    {
      value: '0',
      primaryText: t1('not_hot'),
    },
  ],
  QuestionBankStatusOptions: () => [
    {
      value: 'queued',
      label: t1('queued'),
      primaryText: t1('queued'),
    },
    {
      value: 'approved',
      label: t1('approved'),
      primaryText: t1('approved'),
    },
    // {
    //   value: 'featured',
    //   label: 'Featured',
    //   primaryText: 'Featured',
    // },
  ],
  SkillStatusOptions: () => [
    {
      value: 'queued',
      label: t1('queued'),
      primaryText: t1('queued'),
    },
    {
      value: 'approved',
      label: t1('approved'),
      primaryText: t1('approved'),
    },
    // {
    //   value: 'featured',
    //   label: 'Featured',
    //   primaryText: 'Featured',
    // },
  ],
  RoleStatusOptions: () => [
    {
      value: '',
      label: t1('select_statuses'),
      primaryText: '',
    },
    {
      value: 'approved',
      label: t1('approved'),
      primaryText: t1('approved'),
    },
    {
      value: 'unapproved',
      label: t1('unapproved'),
      primaryText: t1('unapproved'),
    },
  ],
  YesNoOptions: () => [
    {
      value: 'yes',
      primaryText: t1('yes'),
    },
    {
      value: 'no',
      primaryText: t1('no'),
    },
  ],
  statusOptions: () => [
    {
      value: '',
      primaryText: t1('select_statuses'),
    },
    {
      value: 0,
      primaryText: t1('no'),
    },
    {
      value: 1,
      primaryText: t1('yes'),
    },
  ],

  StatusSearchCard: () => [
    {
      name: 'added',
      value: 'added',
      label: t1('added'),
    },
    {
      name: 'available',
      value: 'available',
      label: t1('available'),
    },
    {
      name: 'used',
      value: 'used',
      label: t1('used'),
    },
    {
      name: 'cancel',
      value: 'cancel',
      label: t1('cancel'),
    },
  ],
  isPassedType: () => [
    {
      name: 'is_passed',
      value: 1,
      label: t1('passed'),
    },
    {
      name: 'is_passed',
      value: 0,
      label: t1('not_passed'),
    },
  ],
  levelXpeakVips: () => [
    {
      value: '',
      label: 'Chọn gói học',
      primaryText: 'Chọn gói học',
    },
    {
      value: 'xpeak_standard',
      label: 'Xpeak Standard',
      primaryText: 'Xpeak Standard',
    },
    {
      value: 'xpeak_silver',
      label: 'Xpeak Silver',
      primaryText: 'Xpeak Silver',
    },
    {
      value: 'xpeak_gold',
      label: 'Xpeak Gold',
      primaryText: 'Xpeak Gold',
    },
    {
      value: 'xpeak_vip',
      label: 'Xpeak Vip',
      primaryText: 'Xpeak Vip',
    },
  ],
  speakingType: () => [
    {
      value: '',
      primaryText: t1('question_exercise'),
    },
    {
      value: 'dictation',
      primaryText: t1('dictation_exercise'),
    },
    {
      value: 'roleplay',
      primaryText: t1('roleplay_exercise'),
    },
  ],
  exerciseTypeOptions: () => [
    {
      value: '',
      primaryText: t1('normal_exercise_(for_practicing)'),
      label: t1('normal_exercise_(for_practicing)'),
    },
    {
      value: 'exam',
      primaryText: t1(
        'exam_exercise_(where_time_will_be_strict_and_number_of_times_user_can_do_is_usually_limited)',
      ),
      label: t1(
        'exam_exercise_(where_time_will_be_strict_and_number_of_times_user_can_do_is_usually_limited)',
      ),
    },
  ],
  ageOptions: () => [
    {
      value: '',
      label: t1('your_age_range'),
      primaryText: t1('your_age_range'),
    },
    {
      value: 'less than 18',
      label: t1('smaller_than_%s', [18]),
      primaryText: t1('smaller_than_%s', [18]),
    },
    {
      value: '18-25',
      label: '18-25',
      primaryText: '18-25',
    },
    {
      value: '25-30',
      label: '25-30',
      primaryText: '25-30',
    },
    {
      value: '30-40',
      label: '30-40',
      primaryText: '30-40',
    },
    {
      value: 'more than 40',
      label: t1('older_than_%s', [40]),
      primaryText: t1('older_than_%s', [40]),
    },
  ],
  exerciseRuleTypesOptions: () => [
    {
      value: exerciseRuleTypes.PRACTICE,
      primaryText: t1('normal_practice'),
    },
    {
      value: exerciseRuleTypes.PRACTICE_SINGLE,
      primaryText: t1('practice_questions_one_by_one'),
    },
    {
      value: exerciseRuleTypes.EXAM,
      primaryText: t1('exam'),
    },
  ],
  exercisePassingSchemeOptions: () => [
    {
      value: exercisePassingScheme.AVERAGE_QUESTION_SCORE,
      primaryText: t1(
        'pass_by_average_score_of_all_questions_(x%)_(not_taking_the_pass/fail_status_of_each_questions_into_account)',
      ),
    },
    {
      value: exercisePassingScheme.NUMBER_OF_FAILED_QUESTIONS,
      primaryText: `${t1('pass_by_maximum_number_of_failed_questions')} (${t1(
        '5_means_user_cannot_have_more_than_5_failed_questions',
      )})`,
    },
    {
      value: exercisePassingScheme.PERCENT_OF_FAILED_QUESTIONS,
      primaryText: `${t1(
        'pass_by_maximum_percentage_of_failed_questions',
      )} (${t1(
        '5_means_user_cannot_have_more_than_5_percent_of_questions_failed',
      )})`,
    },
  ],
  vocabsetPassingSchemeOptions: () => [
    {
      value: vocabsetPassingScheme.AVERAGE_QUESTION_SCORE,
      primaryText: t1(
        'pass_by_average_score_of_all_questions_(x%)_(not_taking_the_pass/fail_status_of_each_questions_into_account)',
      ),
    },
  ],
  questionPassingSchemeOptions: () => [
    {
      value: questionPassingScheme.AVERAGE_QUESTION_SCORE,
      primaryText: t1('pass_by_percentage_of_score._(x%)'),
    },
  ],
  syllabusSequentialLearningTypeOptions: () => [
    {
      value: '',
      primaryText: t1('no_sequential_learning'),
    },
    {
      value: 'sco',
      primaryText: t1('by_sco'),
    },
    {
      value: 'item',
      primaryText: t1('by_item'),
    },
  ],
  syllabusWeightSchemes: () => [
    {
      value: 'percent',
      primaryText: t1('percent'),
    },
    {
      value: 'absolute',
      primaryText: t1('absolute'),
    },
  ],
  userStatuses: () => [
    {
      primaryText: t1('all'),
      value: '',
    },
    {
      primaryText: t1('activated'),
      value: 'activated',
    },
    {
      primaryText: t1('unactivated'),
      value: 'unactivated',
    },
    {
      primaryText: t1('banned'),
      value: 'banned',
    },
    {
      primaryText: t1('deleted'),
      value: 'deleted',
    },
  ],
  creditStatuses: () => [
    {
      primaryText: t1('activated'),
      value: 'activated',
    },
    {
      primaryText: t1('closed'),
      value: 'closed',
    },
  ],
  feeTemplateTypes: () => [
    {
      value: 'fee_by_ico_semester',
      label: t1('fee_by_ico_semester'),
      primaryText: t1('fee_by_ico_semester'),
    },
    {
      primaryText: t1('fee_by_subject'),
      label: t1('fee_by_subject'),
      value: 'fee_by_subject',
    },
    {
      primaryText: t1('fee_by_credit_in_subject'),
      label: t1('fee_by_credit_in_subject'),
      value: 'fee_by_credit',
    },
    {
      primaryText: t1('fee_for_resiting_final_exam'),
      label: t1('fee_for_resiting_final_exam'),
      value: 'fee_for_resiting_final_exam',
    },
    {
      value: 'fee_other',
      label: t1('fee_other'),
      primaryText: t1('fee_other'),
    },
  ],
  benefitCurrencies: [
    CURRENCY_PERCENT,
    CURRENCY_VND,
    CURRENCY_USD,
    CURRENCY_JPY,
  ],
  feeCurrencies: [CURRENCY_VND, CURRENCY_USD, CURRENCY_JPY],
  feeRecurringTypes: () => [
    {
      primaryText: t1('once'),
      value: 'once',
    },
    {
      primaryText: t1('recurring'),
      value: 'recurring',
    },
  ],
  feeRecurringUnits: () => [
    {
      primaryText: t1('day'),
      value: 'day',
    },
    {
      primaryText: t1('week'),
      value: 'week',
    },
    {
      primaryText: t1('month'),
      value: 'month',
    },
    {
      primaryText: t1('year'),
      value: 'year',
    },
    {
      primaryText: t1('quarter'),
      value: 'quarter',
    },
    {
      primaryText: t1('semester'),
      value: 'semester',
    },
    {
      primaryText: t1('school_year'),
      value: 'school_year',
    },
  ],
  feeTemplateStatusOptions: () => [
    {
      value: 'approved',
      label: t1('approved'),
      primaryText: t1('approved'),
    },
    {
      value: 'queued',
      label: t1('queued'),
      primaryText: t1('queued'),
    },
  ],
  invoiceStatusOptions: () => [
    {
      value: invoiceStatuses.INIT,
      label: t1(invoiceStatuses.INIT),
      primaryText: t1(invoiceStatuses.INIT),
    },
    {
      value: invoiceStatuses.PAID,
      label: t1(invoiceStatuses.PAID),
      primaryText: t1(invoiceStatuses.PAID),
    },
    {
      value: invoiceStatuses.INVALID,
      label: t1(invoiceStatuses.INVALID),
      primaryText: t1(invoiceStatuses.INVALID),
    },
  ],
  userMajorStatusOptions: Object.values(userMajorStatus).map((status) => ({
    value: status,
    label: t1(status),
    primaryText: t1(status),
  })),
  benefitTypes: () => [
    {
      value: 'discount',
      label: t1('discount'),
      primaryText: t1('discount'),
    },
    {
      value: 'discount_for_student_type',
      label: t1('student_with_some_specific_types'),
      primaryText: t1('student_with_some_specific_types'),
    },
    {
      value: 'discount_for_repeating_subject',
      label: t1('discount_for_repeating_subject'),
      primaryText: t1('discount_for_repeating_subject'),
    },
    {
      value: 'discount_for_credit_transfert',
      label: t1('discount_for_credit_transfert'),
      primaryText: t1('discount_for_credit_transfert'),
    },
  ],
  invoiceTypesOptions: () => [
    {
      value: invoiceTypes.PAYMENT_BY_CASH,
      label: t1('payment_by_cash'),
      primaryText: t1('payment_by_cash'),
    },
    {
      value: invoiceTypes.PAYMENT_BY_WALLET,
      label: t1('payment_by_wallet'),
      primaryText: t1('payment_by_wallet'),
    },
  ],
  // This could also be applied to exam shift
  contestOptions: () => [
    {
      name: 'ongoing',
      value: 'ongoing',
      label: t1('ongoing'),
      primaryText: t1('ongoing'),
    },
    {
      name: 'finished',
      value: 'finished',
      label: t1('finished'),
      primaryText: t1('finished'),
    },
    {
      name: 'approved',
      value: 'approved',
      label: t1('approved'),
      primaryText: t1('approved'),
    },
    {
      name: 'queued',
      value: 'queued',
      label: t1('queued'),
      primaryText: t1('queued'),
    },
    {
      name: 'deleted',
      value: 'deleted',
      label: t1('deleted'),
      primaryText: t1('deleted'),
    },
  ],
  importStatusesOptions: () => [
    {
      name: 'available',
      value: 'available',
      label: t1('available'),
      primaryText: t1('available'),
    },
    {
      name: 'error',
      value: 'error',
      label: t1('error'),
      primaryText: t1('error'),
    },
    /*{
      name: 'completed',
      value: 'completed',
      label: t1('completed'),
      primaryText: t1('completed'),
    },*/
  ],
  paymentTypes: () => [
    {
      name: 'BANK',
      value: 'BANK',
      primaryText: t1('banking'),
      label: t1('banking'),
    },
    {
      name: 'CARD',
      value: 'CARD',
      label: t1('gojapan_card'),
    },
  ],
};

export const cardStatuses = {
  added: 'added',
  printing: 'printing',
  printed: 'printed',
  contributed: 'contributed',
};

export const NodeShape = {
  iid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
};

export const defaultOptionsPropertiesLogin = () => ({
  bodyStyle: { fontSize: '15px', background: 'transparent' },
  contentStyle: { width: '406px', height: '430px' },
  className: 'etec-login-form-wrapper',
  contentClassName: 'content-dialog',
});

export const getOptionsPropertiesLogin = (layout) => {
  // TODO: Remove window.APP_THEME to themeConfig.layout
  switch (layout || window.APP_THEME) {
    case layouts.ETEC:
    case layouts.LOTUS:
    case layouts.VIETED:
    case layouts.EVN: {
      return defaultOptionsPropertiesLogin();
    }
    default:
      return {};
  }
};

export const roleUrl = {
  all: '/admin/dashboard/all',
  root: '/admin/dashboard/school',
  staff: '/admin/dashboard/staff',
  lecturer: '/admin/dashboard/lecturer',
  student: '/dashboard',
  profile: '/profile/update-info',
  headmaster: '/admin/dashboard/headmaster',
  admin: '/admin/dashboard/admin',
  teacher: '/admin/dashboard/teacher',
  support: '/admin/dashboard/support',
};

export const schoolTypes = {
  SIS: 'sis',
  ENTERPRISE: 'enterprise',
  // MOOC: 'mooc',
  // TESTING: 'testing',
};

// see php: School_Model_School::$types;
export const schoolTypeOptions = () => [
  {
    value: 'enterprise',
    primaryText: t1('enterprise - Enterprise LMS'),
  },
  {
    value: 'sis',
    primaryText: t1('sis - University Management System'),
  },
  // {
  //   value: 'mooc',
  //   primaryText: t1('MOOC '),
  // },
  // {
  //   value: 'testing',
  //   primaryText: t1('Online Testing System'),
  // },
];

export const capacityTypesOptions = () => [
  {
    value: '',
    primaryText: t1('choose_way_calculate_rooms_capacity'),
  },
  {
    value: '24',
    primaryText: t1('by_day'),
  },
  {
    value: '6.75', // total hours of time slots
    primaryText: t1('by_time_slots'),
  },
];

export const categoryRelationTypes = {
  USER_GROUP: 'user_group',
  STUDENT_TYPE: 'student_type',
  INSURANCE_CATEGORY: 'insurance_category',
  SCHOLARSHIP_CATEGORY: 'scholarship_category',
  FINISHING_SENIOR: 'finishing_senior',
  GRADUATING_SENIOR: 'graduating_senior',
  CATEGORY_USER_BUS_GROUP: 'bus_group',
  ADMISSION: 'admission_group',
  STUDENT_RECOGNITION: 'student_recognition_group',
  EXPULSION_GROUP: 'expulsion_group',
};

export const categoryTypeMapping = {
  group: categoryRelationTypes.USER_GROUP,
  'user-group-category': 'user_group_categories',
  'finishing-senior': 'finishing_senior',
  'graduating-senior': 'graduating_senior',
  'student-recognition': categoryRelationTypes.STUDENT_RECOGNITION,
  admission: categoryRelationTypes.ADMISSION,
  'expulsion-group': categoryRelationTypes.EXPULSION_GROUP,
};

export const socialFunctionGroups = {
  STUDENT_TYPE: categoryRelationTypes.STUDENT_TYPE,
  SCHOLARSHIP_CATEGORY: categoryRelationTypes.SCHOLARSHIP_CATEGORY,
  INSURANCE_CATEGORY: categoryRelationTypes.INSURANCE_CATEGORY,
};

export const levelSocialFunctionGroups = {
  NORMAL: 0,
  SEMESTER: 1,
};

export const targetsApplyForCategory = {
  MAJOR: 'major',
  ICO: 'ico',
  SEMESTER: 'semester',
};

export const truantTypes = {
  PERCENT: 'percent',
  NUMBER: 'number',
};

export const truantUnits = {
  HOUR: 'hour',
  SESSION: 'session',
};

export const truantTypesOptions = () => [
  {
    value: truantTypes.PERCENT,
    primaryText: t1('percent'),
  },
  {
    value: truantTypes.NUMBER,
    primaryText: t1('number'),
  },
];

export const truantUnitsOptions = () => [
  {
    value: truantUnits.HOUR,
    primaryText: t1('hour'),
  },
  {
    value: truantUnits.SESSION,
    primaryText: t1('session'),
  },
];

export const getTruantTypeUnitOptions = (truantValue, delimiter = '__') => {
  let options = [];

  Object.values(truantUnits).forEach((unit) => {
    Object.values(truantTypes).forEach((type) => {
      let option = {
        value: `${type}${delimiter}${unit}`,
      };

      let primaryText = '';

      if (type === truantTypes.PERCENT) {
        let unitIdentifier = '';
        switch (unit) {
          case truantUnits.SESSION:
            unitIdentifier = t1('sessions');
            break;
          case truantUnits.HOUR:
            unitIdentifier = t1('hours');
            break;
          default:
        }
        primaryText = `${t1('%')} ${t1('_of_%s', [unitIdentifier])}`;
      }

      if (type === truantTypes.NUMBER) {
        let unitIdentifier = '';
        switch (unit) {
          case truantUnits.SESSION:
            unitIdentifier = truantValue <= 1 ? t1('session') : t1('sessions');
            break;
          case truantUnits.HOUR:
            unitIdentifier = truantValue <= 1 ? t1('hour') : t1('hours');
            break;
          default:
        }
        primaryText = unitIdentifier;
      }

      option = {
        ...option,
        primaryText,
      };

      options = options.concat([option]);
    });
  });
  return options;
};

export const examSubTypes = {
  FINAL: 'FINAL',
  FINAL_RESIT: 'FINAL_RESIT',
  ENTERING_SCORES: 'ENTERING_SCORES',
};

const examSubTypeToText = (key) => {
  const map = {
    FINAL: t1('final_exam'),
    FINAL_RESIT: t1('final_exam_resit'),
    ENTERING_SCORES: t1('entering_scores'),
  };
  return map[key];
};

export const examSubTypeOptions = () =>
  Object.keys(examSubTypes).map((key) => ({
    value: key,
    primaryText: examSubTypeToText(key),
    label: examSubTypeToText(key),
  }));

export const categoryTypes = {
  CATEGORY_USER_GROUP: 'user_group',
  CATEGORY_STUDENT_TYPE: 'student_type',
  CATEGORY_INSURANCE: 'insurance_category',
  CATEGORY_SCHOLARSHIP: 'scholarship_category',
  CATEGORY_FINISHING_SENIOR: 'finishing_senior',
  CATEGORY_GRADUATING_SENIOR: 'graduating_senior',
  CATEGORY_ACADEMIC: 'academic',
  CATEGORY_ORGANIZATION: 'organization',
  // CATEGORY_JOB_POSITION: 'job_position',
  CATEGORY_FEE: 'fee',
  // CATEGORY_COURSE: 'course',
  CATEGORY_BLOG: 'blog',
  CATEGORY_MAJOR: 'major',
};

export const pdsType = 'provinces_districts';
export const abacRoleTypes = {
  ABSTRACT: 'abstract',
  ACADEMIC_CATEGORY: 'academic_category',
  SCHOOL: 'school',
  GROUP: 'group',
  CONTEST: 'contest',
  COURSE: 'course',
  SYLLABUS: 'syllabus',
};

export const abacRoleAppliedScopes = {
  ACADEMIC_CATEGORY: 'academic_category',
  SCHOOL: 'school',
  GROUP: 'group',
  CONTEST: 'contest',
  COURSE: 'course',
  SYLLABUS: 'syllabus',
};

export const abacRoleAppliedScopeToText = (key) => {
  const map = {
    [abacRoleAppliedScopes.ACADEMIC_CATEGORY]: t1('academic_category'),
    [abacRoleAppliedScopes.SCHOOL]: `${t1('school')} (${t1('organization')})`,
    [abacRoleAppliedScopes.GROUP]: t1('group'),
    [abacRoleAppliedScopes.CONTEST]: t1('contest'),
    [abacRoleAppliedScopes.COURSE]: t1('course'),
    [abacRoleAppliedScopes.SYLLABUS]: t1('syllabus'),
  };
  return map[key];
};

export const abacRoleAppliedScopeOptions = () =>
  Object.keys(abacRoleAppliedScopes).map((key) => {
    const value = abacRoleAppliedScopes[key];
    return {
      value,
      primaryText: abacRoleAppliedScopeToText(value),
      label: abacRoleAppliedScopeToText(value),
    };
  });

export const displayStatusInvited = (status) => {
  switch (status) {
    case sinviteStatuses.STATUS_INVITED:
      return t1('invited');
    case sinviteStatuses.STATUS_MUST_LEARN:
      return t1('compulsory');
    case sinviteStatuses.STATUS_ACCEPTED:
      return t1('accepted');
    case sinviteStatuses.STATUS_REJECTED:
      return t1('rejected');
    case sinviteStatuses.STATUS_DELETED:
    case 'delete':
      return t1('deleted');
    case sinviteStatuses.STATUS_COMPLETED:
      return t1('completed');
    case sinviteStatuses.STATUS_REGISTERED:
      return t1('registered');
    default:
      return t1('available');
  }
};

export const syllabusSubTypes = {
  SYLLABUS_NORMAL: 'syllabus_normal',
  SYLLABUS_SCORM: 'syllabus_scorm',
};

export const syllabusSubTypeToText = (key) => {
  const map = {
    [syllabusSubTypes.SYLLABUS_NORMAL]: t1('normal', 1),
    [syllabusSubTypes.SYLLABUS_SCORM]: t1('scorm', 1),
  };
  return map[key];
};

export const syllabusSubTypeOptions = () =>
  Object.values(syllabusSubTypes).map((value) => ({
    value,
    primaryText: syllabusSubTypeToText(value),
    label: syllabusSubTypeToText(value),
  }));

export const reorderTypes = {
  COMPLEX: 'complex',
  WORD: 'word',
};

const reorderTypeToText = (key) => {
  const map = {
    [reorderTypes.COMPLEX]: t1('complex_data_ordering', 1),
    [reorderTypes.WORD]: t1('order_words_to_form_a_sentence', 1),
  };
  return map[key];
};

export const reorderTypeOptions = () =>
  Object.values(reorderTypes).map((value) => ({
    value,
    primaryText: reorderTypeToText(value),
    label: reorderTypeToText(value),
  }));

export const numberQuestionTypes = {
  NUMBER_QUESTION_TYPE_RADIO: 'radio',
  NUMBER_QUESTION_TYPE_TEXT: 'text',
};

export const questionDisplayTemplates = {
  DEFAULT: 'default',
  CONTENT_DISPLAYED_INSIDE_HEADER: 'content_displayed_inside_header',
};

/**
 * this is used in both places:
 *  1. when editing each question, it is of imgSelect type
 *  2. side bar control for setting question template for WHOLE exercise, then it is a radio, for now
 *
 * @returns {*[]}
 */
export const questionDisplayTemplateOptions = () => [
  {
    value: questionDisplayTemplates.DEFAULT,
    imgTitle: t1('default'),
    primaryText: t1('default'),
    label: t1('default'),
    avatar: '/images/question-display-templates/default.png',
  },
  {
    value: questionDisplayTemplates.CONTENT_DISPLAYED_INSIDE_HEADER,
    imgTitle: t1('content_displayed_inside_header'),
    primary: t1('content_displayed_inside_header'),
    label: t1('content_displayed_inside_header'),
    avatar: '/images/question-display-templates/inside_header.png',
  },
];

export const numberQuestionTypeToText = (type) => {
  const map = {
    [numberQuestionTypes.NUMBER_QUESTION_TYPE_RADIO]: t1(
      'number_question_type_radio',
    ),
    [numberQuestionTypes.NUMBER_QUESTION_TYPE_TEXT]: t1(
      'number_question_type_text',
    ),
  };
  return map[type];
};

export const numberQuestionTypeOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    Object.values(numberQuestionTypes),
    numberQuestionTypeToText,
  );

export const feeStatuses = {
  NEW: 'new',
  PAID: 'paid',
  POSTPONE_DEADLINE: 'postpone-deadline',
  PARTIAL: 'partial',
  OUTSTANDING: 'outstanding',
  CANCELLED: 'cancelled',
};

export const getDisplayInfoOfFeeStatus = (status, feeEndDate = Infinity) => {
  switch (status) {
    case feeStatuses.NEW: {
      return { text: t1('not_paid'), color: 'red' };
    }
    case feeStatuses.PAID: {
      return { text: t1('paid'), color: 'green' };
    }
    case feeStatuses.POSTPONE_DEADLINE: {
      const now = new Date().getTime();
      if (now <= feeEndDate) {
        return { text: t1('postponed'), color: 'green' };
      }
      return { text: t1('not_paid'), color: 'red' };
    }
    case feeStatuses.CANCELLED: {
      return { text: t1('cancelled'), color: 'red' };
    }
    default: {
      return { text: t3('n/a'), color: 'red' };
    }
  }
};

export const feeStatusOptions = () =>
  Object.values(feeStatuses).map((value) => ({
    value,
    primaryText: getDisplayInfoOfFeeStatus(value).text,
    label: getDisplayInfoOfFeeStatus(value).text,
  }));

export const feeStatusFilters = {
  ALL_FEES_CLEARED: 'all_fees_cleared',
  HAVE_PENDING_FEES: 'have_pending_fees',
  FEE_CANCELLATION: 'fee_cancellation',
  ALL: '',
};

const feeStatusFilterToText = (key) => {
  const map = {
    [feeStatusFilters.ALL_FEES_CLEARED]: t1('all_fees_cleared'),
    [feeStatusFilters.HAVE_PENDING_FEES]: t1('have_pending_fees'),
    [feeStatusFilters.FEE_CANCELLATION]: t1(feeStatusFilters.FEE_CANCELLATION),
    [feeStatusFilters.ALL]: t1('all'),
  };

  return map[key];
};

export const feeStatusFilterOptions = (statusFilter) =>
  Object.values(feeStatusFilters)
    .filter(
      (status) =>
        !(Array.isArray(statusFilter) && statusFilter.includes(status)),
    )
    .map((value) => ({
      value,
      primaryText: feeStatusFilterToText(value),
      label: feeStatusFilterToText(value),
    }));

export const filterOrgTypesByType = (allOrgTypes, type = 'has_perm') => {
  return (
    allOrgTypes &&
    allOrgTypes.filter((orgType) => {
      switch (type) {
        case 'has_perm':
          return orgType.has_perm;
        case 'phongban':
          return orgType.is_phongban;
        case '*':
          return true;
        default:
          return false;
      }
    })
  );
};

/**
 * this is a part of getOrgTypes function,
 * However, we put it in a separate function so that we can memoize the returned value to improve performance
 */
const computeOrgTypesFromConfig = memoize((orgTypesFromConfig, type) => {
  const allOrgTypesAfterFilter = filterOrgTypesByType(orgTypesFromConfig, type);

  return (allOrgTypesAfterFilter || []).map((orgType) => ({
    has_pem: !!orgType.has_perm,
    phongban: !!orgType.phongban,
    name: t1(orgType.name),
    value: Number.parseInt(orgType.type, 10),
    label: t1(orgType.name),
    primaryText: t1(orgType.name),
  }));
});

export const getOrgTypes = (state, type = 'has_perm') => {
  const orgTypesFromConfig = getLodash(state, 'domainInfo.school.org_types');

  return computeOrgTypesFromConfig(orgTypesFromConfig, type);
};

export const reportProgressMasterGroupTypeOptions = () => [
  {
    value: 'user.ancestor_organizations',
    label: t1('user_organizations'),
    primaryText: t1('user_organizations'),
  },
  {
    value: 'user.ancestor_equivalent_phongbans',
    label: t1('user_equivalent_phongbans'),
    primaryText: t1('user_equivalent_phongbans'),
  },
  {
    value: 'credit_syllabus.ancestor_organizations',
    label: t1('credit_syllabus_organizations'),
    primaryText: t1('credit_syllabus_organizations'),
  },
  {
    value: 'credit_syllabus.ancestor_academic_categories',
    label: t1('credit_syllabus_academic_categories'),
    primaryText: t1('credit_syllabus_academic_categories'),
  },
];

export const classHourOptions = [
  {
    value: 1,
    label: t4('1_class_hour'),
  },
  {
    value: 2,
    label: t4('2_class_hour'),
  },
  {
    value: 3,
    label: t4('3_class_hour'),
  },
  {
    value: 4,
    label: t4('4_class_hour'),
  },
  {
    value: 5,
    label: t4('5_class_hour'),
  },
  {
    value: 6,
    label: t4('6_class_hour'),
  },
];

export const approvalStatus = {
  QUEUED: 'queued',
  DONE_EDITING: 'done_editing',
  APPROVAL_STEP1: 'approval_step1',
  APPROVAL_STEP2: 'approval_step2',
  APPROVED: 'approved',
};

export const REVIEW_SYLLABUS_ABSTRACT_CODE = 'REVIEW-SYLLABUS';

export const approvalFlowDefault = {
  queued: {
    approval: approvalStatus.DONE_EDITING,
    reject: '',
  },
  done_editing: {
    approval: approvalStatus.APPROVAL_STEP1,
    reject: approvalStatus.QUEUED,
  },
  approval_step1: {
    approval: approvalStatus.APPROVAL_STEP2,
    reject: approvalStatus.DONE_EDITING,
  },
  approval_step2: {
    approval: approvalStatus.APPROVED,
    reject: approvalStatus.APPROVAL_STEP1,
  },
  approved: {
    approval: '',
    reject: approvalStatus.APPROVAL_STEP2,
  },
};

export const approvalFlowDefault1 = {
  queued: {
    approval: approvalStatus.DONE_EDITING,
    reject: '',
  },
  done_editing: {
    approval: approvalStatus.APPROVED,
    reject: approvalStatus.QUEUED,
  },
  approved: {
    approval: '',
    reject: approvalStatus.DONE_EDITING,
  },
};

export const syllabusStatuses = () => {
  const statuses = Object.values(approvalStatus);

  return statuses.map((status) => ({ value: status, primaryText: status }));
};

export const layoutOrientations = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

export const chartColors = {
  RED: '#D62728',
  ORANGE: '#FF7F0E',
  YELLOW: '#BCBD22',
  GREEN: '#2CA02C',
  BLUE: '#1F77B4',
  GREY: '#7F7F7F',
  PURPLE: '#9467BD',
  BROWN: '#8C564B',
  PINK: '#E377C2',
  LIGHT_BLUE: '#17BECF',
};

export const chartColorsPallete = {
  ALL: [
    chartColors.RED,
    chartColors.ORANGE,
    chartColors.YELLOW,
    chartColors.GREEN,
    chartColors.BLUE,
    chartColors.GREY,
    chartColors.PURPLE,
    chartColors.BROWN,
    chartColors.PINK,
    chartColors.LIGHT_BLUE,
  ],
  LEARNING_PROGRESS: [chartColors.RED, chartColors.YELLOW, chartColors.BLUE],
  PASSED_FAILED: [chartColors.BLUE, chartColors.RED],
  RATING_STARS: [
    chartColors.RED,
    chartColors.ORANGE,
    chartColors.YELLOW,
    chartColors.GREEN,
    chartColors.BLUE,
  ],
  AVERAGE_TIME_SPENT: [chartColors.PURPLE, chartColors.BROWN],
  NO_OF_CREDIT_SYLLABUSES: [chartColors.LIGHT_BLUE],
  TOTAL_CONTESTANTS: [chartColors.LIGHT_BLUE],
};

export const leftMenuStates = {
  OPENED: true,
  CLOSED: false,
};

export const skillsAttachingTypes = {
  DIRECT: 1,
  PROGRAM: 2,
};

export const skillsAttachingOptions = () => [
  {
    value: skillsAttachingTypes.DIRECT,
    label: t1('direct'),
  },
  {
    value: skillsAttachingTypes.PROGRAM,
    label: t1('program'),
  },
];

export const programTypeOptions = () => [
  {
    value: ntype.PROGRAM,
    label: t1('program'),
  },
  {
    value: ntype.PROGRAM_MODULE,
    label: t1('module'),
  },
  // {
  //   value: ntype.SPECIALIZATION_PROGRAM,
  //   label: t1('specialization_program'),
  // },
];

const DAYS_TO_START_ALERT_ABOUT_COURSE_DEADLINE = 2;
export const SECONDS_TO_START_ALERT_ABOUT_COURSE_DEADLINE =
  DAYS_TO_START_ALERT_ABOUT_COURSE_DEADLINE * 24 * 60 * 60;

export const hashType = '#!';

export const ACADEMIC_CATEGORY = 'academic_category';

export const taphuanSubTypes = {
  TAPHUAN_SUBTYPE_TIEUHOC: 5,
  TAPHUAN_SUBTYPE_THCS: 6,
  TAPHUAN_SUBTYPE_THPT: 7,
};

export const websiteUrl = 'https://gojapan.vn/';
