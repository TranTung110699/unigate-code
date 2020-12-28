import lodashGet from 'lodash.get';

/**
 * NOTE ON questionUniqueId:
 *  this is the unique id we use to identify a question in an exercise or exam
 *  right now it is question.iid,
 *  we call it unique id just in case there are 2 questions with the same iid in the an exercise, which should not happen
 */
/**
 * tracking line is an array of tracking line parts
 * each part consist of
 *    - allItems: all question unique ids in this tracking line part,
 *    - items: all question unique ids in this part that user can navigate (not intro sticky, ...),
 *    - anchor: the question unique id that user will navigate to when move from one part to another (normally the first question of this part),
 *        for basic tracking line, this will be the answer that user navigate to when they click next
 *        for listening tracking line, this will be the first question that have audios in this part
 *
 *    - and other info
 * @return {{allItems: *, anchor: *, items: *}}
 */
const createTrackingLinePartCore = ({
  anchor,
  items,
  allItems,
  ...others
}) => ({
  anchor,
  items,
  allItems,
  ...others,
});

// basic tracking line
export const createTrackingLinePart = ({
  anchor,
  items,
  allItems,
  introSticky,
}) =>
  createTrackingLinePartCore({
    anchor,
    items,
    allItems,
    introSticky,
  });

// the tracking line used to auto navigate when user doing TOEIC test
export const createListeningTrackingLinePart = ({
  anchor,
  items,
  allItems,
  audios,
}) =>
  createTrackingLinePartCore({
    anchor,
    items,
    allItems,
    audios,
  });

const getQuestionPositionInTrackingLineByGroupForExercises = (
  trackingLine,
  questionUniqueId,
) =>
  !Array.isArray(trackingLine)
    ? -1
    : trackingLine.findIndex(
        (group) =>
          group &&
          Array.isArray(group.allItems) &&
          group.allItems.includes(questionUniqueId),
      );

const getQuestionUniqueIdWhenNavigateInTrackingLineByGroupForExercises = (
  trackingLine,
  currentQuestionUniqueId,
  direction = 'NEXT',
) => {
  let offset = 0;
  switch (direction) {
    case 'NEXT': {
      offset = 1;
      break;
    }
    case 'BACK': {
      offset = -1;
      break;
    }
    default: {
      break;
    }
  }
  const currentPosition = getQuestionPositionInTrackingLineByGroupForExercises(
    trackingLine,
    currentQuestionUniqueId,
  );
  const itemInTrackingLine =
    currentPosition !== -1 && trackingLine[currentPosition + offset];
  return itemInTrackingLine && itemInTrackingLine.anchor;
};

/**
 * @param trackingLine
 * @param currentQuestionUniqueId
 *    if (!currentQuestionUniqueId) return
 *
 * @param shouldGetNewCurrentQuestionUniqueIdIfNeeded
 * @return {{previousQuestionUniqueId: *, nextQuestionUniqueId: *, trackingLineInfoOfCurrentQuestion: *, currentQuestionUniqueId: *}}
 *    where
 *      - previousQuestionUniqueId: the uniqueId of the question that you get when click "back" (the first question of previous question group)
 *      - nextQuestionUniqueId: the uniqueId of the question that you get when click "next" (the first question of next question group)
 *      - trackingLineInfoOfCurrentQuestion:
 *      - currentQuestionUniqueId:
 */
export const getBasicNavigateInfoOfExerciseByTrackingLine = (
  trackingLine,
  currentQuestionUniqueId,
  shouldGetNewCurrentQuestionUniqueIdIfNeeded = true,
) => {
  let previousQuestionUniqueId = null;
  let nextQuestionUniqueId = null;
  let trackingLineInfoOfCurrentQuestion = null;
  let returnedCurrentQuestionUniqueId = currentQuestionUniqueId;

  if (Array.isArray(trackingLine)) {
    if (!returnedCurrentQuestionUniqueId) {
      if (shouldGetNewCurrentQuestionUniqueIdIfNeeded) {
        returnedCurrentQuestionUniqueId =
          trackingLine[0] &&
          Array.isArray(trackingLine[0].items) &&
          trackingLine[0].items[0];
      }
    }
    previousQuestionUniqueId = getQuestionUniqueIdWhenNavigateInTrackingLineByGroupForExercises(
      trackingLine,
      returnedCurrentQuestionUniqueId,
      'BACK',
    );
    nextQuestionUniqueId = getQuestionUniqueIdWhenNavigateInTrackingLineByGroupForExercises(
      trackingLine,
      returnedCurrentQuestionUniqueId,
      'NEXT',
    );

    const currentPositionInTrackingLine = getQuestionPositionInTrackingLineByGroupForExercises(
      trackingLine,
      returnedCurrentQuestionUniqueId,
    );
    trackingLineInfoOfCurrentQuestion =
      trackingLine[currentPositionInTrackingLine];
    if (
      trackingLineInfoOfCurrentQuestion &&
      Array.isArray(trackingLineInfoOfCurrentQuestion.items) &&
      !trackingLineInfoOfCurrentQuestion.items.includes(
        returnedCurrentQuestionUniqueId,
      ) &&
      shouldGetNewCurrentQuestionUniqueIdIfNeeded
    ) {
      returnedCurrentQuestionUniqueId =
        trackingLineInfoOfCurrentQuestion.items[0];
    }
  }

  return {
    currentQuestionUniqueId: returnedCurrentQuestionUniqueId,
    previousQuestionUniqueId,
    nextQuestionUniqueId,
    trackingLineInfoOfCurrentQuestion,
  };
};

export const findQuestionInExerciseTrackingLineThatMatchCondition = (
  trackingLine,
  condition,
) => {
  if (!Array.isArray(trackingLine) || trackingLine.length === 0) {
    return undefined;
  }

  for (let pIndex = 0; pIndex < trackingLine.length; pIndex += 1) {
    const part = trackingLine[pIndex];
    const matchedQuestionUniqueId = (lodashGet(part, 'items') || []).find(
      (questionUniqueId) => condition(questionUniqueId),
    );
    if (typeof matchedQuestionUniqueId !== 'undefined') {
      return matchedQuestionUniqueId;
    }
  }

  return undefined;
};
