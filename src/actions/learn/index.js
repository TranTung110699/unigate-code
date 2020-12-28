export const CURRENT_LEARN_ELEMENT = 'CURRENT_LEARN_ELEMENT';
export const INIT_LEARN_VIEW_LIST = 'INIT_LEARN_VIEW_LIST';
export const ACTIVE_ITEMS_IN_VIEW = 'ACTIVE_ITEMS_IN_VIEW';
export const DISPLAY_QUESTIONS_CHECKED_RESULT =
  'DISPLAY_QUESTIONS_CHECKED_RESULT';
export const STOP_DISPLAY_QUESTIONS_CHECKED_RESULT =
  'STOP_DISPLAY_QUESTIONS_CHECKED_RESULT';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const SET_USER_ANSWER = 'SET_USER_ANSWER';
export const CLEAR_ANSWERS = 'CLEAR_ANSWERS';
export const SAVE_TCOS_PRICE_TO_STORE = 'SAVE_TCOS_PRICE_TO_STORE';
export const ADD_PHONETIC_DIFF = 'ADD_PHONETIC_DIFF';
export const CLEAN_PHONETIC_DIFF = 'CLEAN_PHONETIC_DIFF';
export const SAVE_ITEM_INFO = 'SAVE_ITEM_INFO';
export const SAVE_ITEM_COUNT_DOWN_TIME = 'SAVE_ITEM_COUNT_DOWN_TIME';
export const SAVE_ITEM_QUESTION_INFO = 'SAVE_ITEM_QUESTION_INFO';
export const SAVE_ITEM_QUESTION_AUDIO_STATUS =
  'SAVE_ITEM_QUESTION_AUDIO_STATUS';
export const SET_PAPER_ID = 'SET_PAPER_ID';
export const SET_POSITION_OF_NOW_PLAYING_ITEM_ON_NAV =
  'SET_POSITION_OF_NOW_PLAYING_ITEM_ON_NAV';
export const DISPLAY_CONFIGURATION_COURSE = 'DISPLAY_CONFIGURATION_COURSE';
export const SET_ANSWERS_LOG = 'SET_ANSWERS_LOG';
export const SAVE_TAKE_REQUEST_SUCCESS = 'SAVE_TAKE_REQUEST_SUCCESS';
export const SAVE_TAKE_REQUEST_FAIL = 'SAVE_TAKE_REQUEST_FAIL';
export const SHOW_SYLLABUS_IN_EP = 'SHOW_SYLLABUS_IN_EP';
export const CLOSE_NAV_DRAWER = 'CLOSE_NAV_DRAWER';

export const setPositionOfNowPlayingItemOnNav = (data) => ({
  type: SET_POSITION_OF_NOW_PLAYING_ITEM_ON_NAV,
  data,
});

export const initLearnViewList = (iid, items) => ({
  type: INIT_LEARN_VIEW_LIST,
  iid,
  items,
});

export const activeItemsInView = (iid, activeItems) => ({
  type: ACTIVE_ITEMS_IN_VIEW,
  iid,
  activeItems,
});

export const displayQuestionsCheckedResult = (itemIid, questionIndexes) => ({
  type: DISPLAY_QUESTIONS_CHECKED_RESULT,
  itemIid,
  questionIndexes,
});

export const setAnswersLogAndUserAnswers = (itemIid, answersLog) => ({
  type: SET_ANSWERS_LOG,
  itemIid,
  answersLog,
});

export const stopDisplayQuestionsCheckedResult = (
  itemIid,
  questionIndexes,
) => ({
  type: STOP_DISPLAY_QUESTIONS_CHECKED_RESULT,
  itemIid,
  questionIndexes,
});

export const setCurrentLearningElement = (data) => ({
  type: CURRENT_LEARN_ELEMENT,
  data,
});

export const saveAnswer = (itemIid, questionIndex, answer) => ({
  type: SAVE_ANSWER,
  itemIid,
  questionIndex,
  answer,
});

export const setUserAnswers = (itemIid, userAnswers) => ({
  type: SET_USER_ANSWER,
  itemIid,
  userAnswers,
});

export const clearAnswers = (itemIid) => ({ type: CLEAR_ANSWERS, itemIid });

export const saveTcosPriceToStore = (data) => ({
  type: SAVE_TCOS_PRICE_TO_STORE,
  data,
});

export const addPhoneticDiff = (vid, position, phoneticDiff) => ({
  type: ADD_PHONETIC_DIFF,
  vid,
  position,
  phoneticDiff,
});

export const cleanPhoneticDiff = (vid) => ({ type: CLEAN_PHONETIC_DIFF, vid });

export const saveItemInfo = (itemIid, info, shouldUpdate = true) => ({
  type: SAVE_ITEM_INFO,
  itemIid,
  info,
  shouldUpdate,
});

export const saveTakeRequestSuccess = (itemIid, info) => ({
  type: SAVE_TAKE_REQUEST_SUCCESS,
  itemIid,
  info,
});

export const saveTakeRequestFail = (itemIid, info) => ({
  type: SAVE_TAKE_REQUEST_FAIL,
  itemIid,
  info,
});

export const saveItemCountDownTimeToStore = (itemIid, timeLeftInSeconds) => ({
  type: SAVE_ITEM_COUNT_DOWN_TIME,
  itemIid,
  timeLeftInSeconds,
});

export const setPaperId = (paperId) => ({ type: SET_PAPER_ID, paperId });

export const saveItemQuestionInfo = (
  itemIid,
  questionUniqueId,
  info,
  shouldUpdate = true,
) => ({
  type: SAVE_ITEM_QUESTION_INFO,
  itemIid,
  questionUniqueId,
  info,
  shouldUpdate,
});

export const displayConfigurationCourse = (display = false) => ({
  type: DISPLAY_CONFIGURATION_COURSE,
  display,
});

export const saveItemQuestionAudioStatus = (
  itemIid,
  questionUniqueId,
  audioIndex,
  status,
) => ({
  type: SAVE_ITEM_QUESTION_AUDIO_STATUS,
  itemIid,
  questionUniqueId,
  audioIndex,
  status,
});

export const showChildrenInEP = (EPItemIid) => ({
  type: SHOW_SYLLABUS_IN_EP,
  EPItemIid,
});

export const closeNavDrawer = (showDrawer) => ({
  type: CLOSE_NAV_DRAWER,
  showDrawer,
});
