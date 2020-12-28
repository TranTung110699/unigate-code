export const INIT_EXERCISE = 'INIT_EXERCISE';
export const START_EXERCISE = 'START_EXERCISE';
export const RESUME_EXERCISE = 'RESUME_EXERCISE';
export const FINISH_EXERCISE = 'FINISH_EXERCISE';
export const REDO_EXERCISE = 'REDO_EXERCISE';
export const REVIEW_EXERCISE = 'REVIEW_EXERCISE';
export const SET_CURRENT_QUESTION_IN_EXERCISE =
  'SET_CURRENT_QUESTION_IN_EXERCISE';
export const SET_CURRENT_QUESTION_IN_EXERCISE_FINISHED =
  'SET_CURRENT_QUESTION_IN_EXERCISE_FINISHED';
export const EXERCISE_INTRO_STICKY_MEDIA_FINISH_PLAYING =
  'EXERCISE_INTRO_STICKY_MEDIA_FINISH_PLAYING';

export const INIT_EXAM = 'INIT_EXAM';
export const RETRY_SUBMIT_EXAM = 'RETRY_SUBMIT_EXAM';
export const SUBMIT_EXAM_SUCCESSFUL = 'SUBMIT_EXAM_SUCCESSFUL';

export const START_PREVIEW_TAKE = 'START_PREVIEW_TAKE';
export const START_PREVIEW_PAPER = 'START_PREVIEW_PAPER';

export const INIT_SURVEY = 'INIT_SURVEY';
export const SUBMIT_SURVEY = 'SUBMIT_SURVEY';

export const SHOW_SAVE_QUESTION_ONLY = 'SHOW_SAVE_QUESTION_ONLY';

export const initExercise = (itemIid, info) => ({
  type: INIT_EXERCISE,
  itemIid,
  info,
});
export const startExercise = (itemIid) => ({ type: START_EXERCISE, itemIid });
export const resumeExercise = (itemIid) => ({
  type: RESUME_EXERCISE,
  itemIid,
});

export const finishExercise = (itemIid) => ({ type: FINISH_EXERCISE, itemIid });
export const retrySubmitExam = (itemIid, info) => ({
  type: RETRY_SUBMIT_EXAM,
  itemIid,
  info,
});

export const redoExercise = (
  itemIid,
  info,
  questionUniqueId,
  wrongQuestionOnly,
) => ({
  type: REDO_EXERCISE,
  itemIid,
  info,
  questionUniqueId,
  wrongQuestionOnly,
});
export const reviewExercise = (itemIid, info) => ({
  type: REVIEW_EXERCISE,
  itemIid,
  info,
});
export const setCurrentQuestionInExercise = (
  itemIid,
  questionUniqueId,
  shouldDisplayCurrentQuestionAtTop,
) => ({
  type: SET_CURRENT_QUESTION_IN_EXERCISE,
  itemIid,
  questionUniqueId,
  shouldDisplayCurrentQuestionAtTop,
});

export const setCurrentQuestionInExerciseFinished = (
  itemIid,
  questionUniqueId,
) => ({
  type: SET_CURRENT_QUESTION_IN_EXERCISE_FINISHED,
  itemIid,
  questionUniqueId,
});

export const exerciseIntroStickyMediaFinishPlaying = (itemIid) => ({
  type: EXERCISE_INTRO_STICKY_MEDIA_FINISH_PLAYING,
  itemIid,
});

/**
 * isFirstTime = true when user click to 'Take exam' button
 * @param itemIid
 * @param info
 * @param isFirstTime
 * @returns {{type: string, itemIid: *, info: *, isFirstTime: *}}
 */
export const initExam = (itemIid, info, isFirstTime, onFinish) => ({
  type: INIT_EXAM,
  itemIid,
  info,
  isFirstTime,
  onFinish,
});

export const startPreviewTake = (takeId, examIid, paperId) => ({
  type: START_PREVIEW_TAKE,
  takeId,
});

export const startPreviewPaper = (examIid, paperId) => ({
  type: START_PREVIEW_PAPER,
  examIid,
  paperId,
});

export const initSurvey = (itemIid, info) => ({
  type: INIT_SURVEY,
  itemIid,
  info,
});

export const submitSurvey = (itemIid) => ({
  type: SUBMIT_SURVEY,
  itemIid,
});

export const showSaveQuestionOnly = (isShowSaveQuestionOnly) => ({
  type: SHOW_SAVE_QUESTION_ONLY,
  isShowSaveQuestionOnly,
});
