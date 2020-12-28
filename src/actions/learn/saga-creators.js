export const GET_TCOS_PRICE_REQUEST = 'GET_TCOS_PRICE_REQUEST';
export const PAY_FOR_LEARNING_PATH = 'PAY_FOR_LEARNING_PATH';
export const GET_PHONETIC_DIFF_REQUEST = 'GET_PHONETIC_DIFF_REQUEST';
export const SAVE_TAKE_REQUEST = 'SAVE_TAKE_REQUEST';
export const HANDLE_INVITE_COURSE = 'HANDLE_INVITE_COURSE';
export const SAVE_VIOLATION_REQUEST = 'SAVE_VIOLATION_REQUEST';
export const SAVE_SURVEY_TAKE_REQUEST = 'SAVE_SURVEY_TAKE_REQUEST';

export const getTcosPriceRequest = (params) => ({
  type: GET_TCOS_PRICE_REQUEST,
  params,
});

export const payForLearningPathRequest = (params, executeOnSuccess) => ({
  type: PAY_FOR_LEARNING_PATH,
  params,
  executeOnSuccess,
});

export const getPhoneticDiffRequest = (vid, position, word, wrongWord) => ({
  type: GET_PHONETIC_DIFF_REQUEST,
  vid,
  position,
  word,
  wrongWord,
});

export const saveTakeRequest = (itemIid, params, displayMessageAfterSave) => ({
  type: SAVE_TAKE_REQUEST,
  itemIid,
  params,
  displayMessageAfterSave,
});

export const handleInviteCourseRequest = (
  params,
  handleInviteCourseSuccessful,
  message,
) => ({
  type: HANDLE_INVITE_COURSE,
  params,
  handleInviteCourseSuccessful,
  message,
});

export const saveViolationRequest = (params, options) => ({
  type: SAVE_VIOLATION_REQUEST,
  params,
  options,
});

export const saveSurveyTakeRequest = (itemIid, params) => ({
  type: SAVE_SURVEY_TAKE_REQUEST,
  itemIid,
  params,
});
