/**
 * NOTE ON questionUniqueId:
 *  this is the unique id we use to identify a question in an exercise or exam
 *  right now it is question.iid,
 *  we call it unique id just in case there are 2 questions with the same iid in the an exercise, which should not happen
 */
import { createSelectorWithExtraParams } from 'utils/selector';
import {
  getLearnItemInfoSelector,
  getLearnItemQuestionInfoSelector,
  statuses as commonLearnStatuses,
} from 'common/learn';
import { getFormValues } from 'redux-form';
import {
  calculateResultForQuestions,
  getAudiosInfoByQuestionUniqueIdSelector,
  getQuestionAudios,
  getUserAnswersByQuestionUniqueIdSelector,
  getUserAnswersSelector,
  groupQuestions,
  isIntroSticky,
  isQuestionHaveContent,
} from 'common/learn/Question';
import { questionDisplayTemplates } from 'configs/constants';
import { canQuestionTypeHasAnswer, isQuestionDone } from 'common/question';
import { getNodeSelector, isNodeDataEnough } from 'components/admin/node/utils';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import { filterObjectKeys } from 'common/utils/object';
import { convertToBoolean } from 'common/normalizers';
import { t1 } from 'translate';
import get from 'lodash.get';
import { surveyAppliedItemTypes } from 'configs/constants/survey';
import { getContestReduxLog } from 'components/admin/contest/logger';
import { createSelector } from 'reselect';
import { parse } from 'query-string';
import {
  createListeningTrackingLinePart,
  createTrackingLinePart,
  findQuestionInExerciseTrackingLineThatMatchCondition,
  getBasicNavigateInfoOfExerciseByTrackingLine,
} from 'common/learn/exercise/trackingLine';
import { getLimitTimeThatUserCanSpendOnEachQuestion } from './core';

export const types = {
  EXERCISE: 'exercise',
  EXAM: 'exam',
  SURVEY: 'survey',
};

export const tags = {
  TOEIC_LISTENING: 'toeic-listening',
};

export const steps = {
  NOT_STARTED: 'not_started',
  NOT_CONTINUED: 'not_continued',
  RESULT: 'result',
  REVIEW: 'review',
  MAIN: 'main',
  FINISHED: 'finished',
};

export const statuses = Object.assign({}, commonLearnStatuses, {
  ESCAPE_FULL_SCREEN: 'ESCAPE_FULL_SCREEN',
  DOING: 'DOING',
});

export const modes = {
  NORMAL: 'normal',
  PREVIEW: 'preview',
  REVIEW: 'review',
  TRIAL: 'trial',
  PREVIEW_TEST: 'preview_test',
};

// When user submit exam but error (either by hitting "Finish" or Timed out
export const submitExamErrors = {
  OFFLINE: 'offline', // network is offline when user tries to submit
  FAILED: 'failed', // somehow server failed to respond
};

export const isToeicListeningExercise = (exercise) =>
  exercise &&
  Array.isArray(exercise.tags) &&
  exercise.tags.includes(tags.TOEIC_LISTENING);

export const isToeicTest = (info) =>
  info && info.options && info.options.is_toeic_test;

const buildTrackingLineByGroupForExercises = (exercises, info) =>
  Array.isArray(exercises) &&
  exercises
    .map((exercise) => {
      if (!exercise || !Array.isArray(exercise.children)) {
        return [];
      }

      const questionGroups = groupQuestions(exercise.children);
      return (
        Array.isArray(questionGroups) &&
        questionGroups
          .map((group) => {
            if (!Array.isArray(group)) {
              return null;
            }

            const introSticky = group.find(isIntroSticky);
            const allItems = group.map((question) => question.uniqueId);
            const items = introSticky
              ? allItems.filter(
                  (questionUniqueId) =>
                    questionUniqueId !== introSticky.uniqueId,
                )
              : allItems;
            const anchor = items[0];

            if (!anchor) return null;

            return createTrackingLinePart({
              anchor,
              introSticky: introSticky && introSticky.uniqueId,
              items,
              allItems,
            });
          })
          .filter((result) => !!result)
      );
    })
    .reduce(
      (result, arr) => (Array.isArray(arr) ? result.concat(arr) : result),
      [],
    )
    .filter((result) => !!result);

const buildListeningTrackingLineByGroupForExercises = (exercises, info) =>
  Array.isArray(exercises) &&
  exercises
    .map((exercise) => {
      if (!exercise || !Array.isArray(exercise.children)) {
        return [];
      }
      return (
        Array.isArray(exercise.children) &&
        exercise.children
          .map((question) => {
            if (isToeicTest(info) && !isToeicListeningExercise(exercise)) {
              return null;
            }
            const questionsAudios = getQuestionAudios(question);
            if (questionsAudios.length > 0) {
              return createListeningTrackingLinePart({
                anchor: question.uniqueId,
                audios: questionsAudios,
                items: [question.uniqueId],
                allItems: [question.uniqueId],
              });
            }
            return null;
          })
          .filter((item) => !!item)
      );
    })
    .reduce(
      (result, arr) => (Array.isArray(arr) ? result.concat(arr) : result),
      [],
    )
    .filter((result) => !!result);

export const buildExerciseStructureFromExercisesSelector = createSelectorWithExtraParams(
  getNodeSelector,
  3,
  (getNode) => (exercises, getQuestionUniqueId, info) => {
    if (!Array.isArray(exercises)) {
      return null;
    }

    const fullExercises = exercises
      .map((exercise) => {
        const fullExercise =
          typeof exercise === 'object' ? exercise : getNode(exercise, null, -1);

        return Object.assign({}, fullExercise, {
          children:
            fullExercise &&
            Array.isArray(fullExercise.children) &&
            fullExercise.children.map((question) => {
              const fullQuestions =
                typeof question === 'object'
                  ? question
                  : getNode(question, exercise.iid);

              return Object.assign({}, fullQuestions, {
                uniqueId: getQuestionUniqueId(fullQuestions),
              });
            }),
        });
      })
      .filter((exercise) => !!exercise);

    if (!fullExercises.every((exercise) => isNodeDataEnough(null, exercise))) {
      return null;
    }

    if (isToeicTest(info)) {
      const comparator = (exercise, anotherExercise) => {
        if (isToeicListeningExercise(exercise)) {
          return -1;
        } else if (isToeicListeningExercise(anotherExercise)) {
          return 1;
        }
        return 0;
      };
      fullExercises.sort(comparator);
    }

    const structure = fullExercises.map((exercise) => ({
      exerciseIid: exercise.iid,
      questions:
        Array.isArray(exercise.children) &&
        exercise.children.map((question) => ({
          uniqueId: question.uniqueId,
          iid: question.iid,
        })),
    }));

    const trackingLine = buildTrackingLineByGroupForExercises(
      fullExercises,
      info,
    );
    const listeningTrackingLine = buildListeningTrackingLineByGroupForExercises(
      fullExercises,
      info,
    );

    return {
      structure,
      trackingLine,
      listeningTrackingLine,
    };
  },
);

export const buildExerciseStructureFromExerciseSelector = createSelectorWithExtraParams(
  buildExerciseStructureFromExercisesSelector,
  3,
  (buildExerciseStructureFromExercises) => (
    exercise,
    getQuestionUniqueId,
    info,
  ) =>
    buildExerciseStructureFromExercises([exercise], getQuestionUniqueId, info),
);

const getExerciseStructureSelector = createSelectorWithExtraParams(
  getLearnItemInfoSelector,
  1,
  (getLearnItemInfo) => (itemIid) => {
    const info = getLearnItemInfo(itemIid);
    return info && info.structure;
  },
);

export const getFullExercisesWithQuestionInfoSelector = createSelectorWithExtraParams(
  (state) => state.tree,
  getLearnItemInfoSelector,
  getLearnItemQuestionInfoSelector,
  getUserAnswersByQuestionUniqueIdSelector,
  getAudiosInfoByQuestionUniqueIdSelector,
  getNodeSelector,
  (state) => state.trackerProgress,
  1,
  (
    nodes,
    getLearnItemInfo,
    getLearnItemQuestionInfo,
    getUserAnswersByQuestionUniqueId,
    getAudiosInfoByQuestionUniqueId,
    getNode,
    trackerProgress,
  ) => (itemIid) => {
    const info = getLearnItemInfo(itemIid);
    const structure = info && info.structure;
    if (!Array.isArray(structure)) {
      return null;
    }

    const questionDuration = getLimitTimeThatUserCanSpendOnEachQuestion(info);

    let questionNumber = 0;

    return structure
      .filter((item) => item)
      .map((item) => {
        const exerciseIid = item.exerciseIid;
        const exercise = getNode(item.exerciseIid);
        if (!exercise) return null;

        return Object.assign({}, exercise, {
          children:
            Array.isArray(item.questions) &&
            item.questions
              .filter((question) => question)
              .map(({ iid, uniqueId }) => {
                const question = getNode(iid, exerciseIid);
                const questionInfo =
                  getLearnItemQuestionInfo(itemIid, uniqueId) || {};
                const userAnswers =
                  getUserAnswersByQuestionUniqueId(itemIid, uniqueId) || {};
                const audiosInfo =
                  getAudiosInfoByQuestionUniqueId(itemIid, uniqueId) || {};
                const progress = trackerProgress && trackerProgress[iid];

                let isCorrect = userAnswers.isCorrect;
                if (
                  question &&
                  question.type === questionTypes.TYPE_API &&
                  progress &&
                  typeof progress.p !== 'undefined'
                ) {
                  isCorrect = !!progress.p;
                }

                let fullQuestion = Object.assign(
                  {},
                  question,
                  filterObjectKeys(questionInfo, [
                    'isTicked',
                    'isTouched',
                    'shouldDisplayCheckedResult',
                    'questionTimeLeftInSeconds',
                    'disabled',
                  ]),
                  filterObjectKeys(userAnswers, ['score', 'answer']),
                  {
                    uniqueId,
                    isCorrect,
                    audiosInfo,
                  },
                  questionDuration ? { duration: questionDuration } : {},
                );

                if (
                  fullQuestion &&
                  fullQuestion.type !== questionTypes.TYPE_INTRODUCTION
                ) {
                  questionNumber += 1;
                  fullQuestion = {
                    ...fullQuestion,
                    number: questionNumber,
                  };
                }

                if (isToeicTest(info) && isToeicListeningExercise(exercise)) {
                  fullQuestion = {
                    ...fullQuestion,
                    audiosReplacement: isQuestionHaveContent(fullQuestion, [
                      'audio',
                    ])
                      ? ''
                      : t1('listen_to_the_audio'),
                    is_toeic_listening: true,
                  };
                }

                return fullQuestion;
              }),
        });
      });
  },
);

export const getQuestionsWithFullInfoFromUniqueIdsInExercises = (
  exercises,
  questionUniqueIds = 'all',
  condition,
) => {
  const questionInExercises =
    (Array.isArray(exercises) &&
      exercises
        .map((exercise) => {
          const children = get(exercise, 'children');
          if (!children) {
            return [];
          }

          if (get(exercise, 'type') === 'exam') {
            const displayTemplate = get(exercise, 'question_display_template');
            if (
              displayTemplate ===
              questionDisplayTemplates.CONTENT_DISPLAYED_INSIDE_HEADER
            ) {
              return children.map((question) => ({
                ...question,
                display_template: displayTemplate,
              }));
            }
          }
          return children;
        })
        .filter((questions) => Array.isArray(questions))
        .reduce(
          (tmpQuestionInExercises, questions) =>
            tmpQuestionInExercises.concat(questions),
          [],
        )) ||
    [];

  let result = questionInExercises;

  if (questionUniqueIds !== 'all') {
    result =
      (Array.isArray(questionUniqueIds) &&
        questionInExercises.filter((question) =>
          questionUniqueIds.includes(question.uniqueId),
        )) ||
      [];
  }

  if (typeof condition === 'function') {
    result = result.filter(condition);
  }

  return result;
};

export const getQuestionsWithFullInfoFromUniqueIdsInExercisesSelector = createSelectorWithExtraParams(
  getFullExercisesWithQuestionInfoSelector,
  3,
  (getFullExercisesWithQuestionInfo) => (
    itemIid,
    questionUniqueIds,
    condition,
  ) => {
    const exercises = getFullExercisesWithQuestionInfo(itemIid);
    return getQuestionsWithFullInfoFromUniqueIdsInExercises(
      exercises,
      questionUniqueIds,
      condition,
    );
  },
);

export const checkShowControlFinishButton = (exercises) => {
  if (!exercises || !exercises.length) {
    return false;
  }
  let shouldShowControlFinishButton = true;
  exercises.forEach((exercise) => {
    if (exercise && exercise.children && exercise.children.length) {
      exercise.children.forEach((question) => {
        if (question && question.type === questionTypes.TYPE_API) {
          const { answer } = question;
          if (!answer || !answer.status || answer.status !== 'have_ordered') {
            shouldShowControlFinishButton = false;
          }
        }
      });
    }
  });
  return shouldShowControlFinishButton;
};

const convertIsCorrect = (take, reverse) => {
  const [oldKey, newKey] = !reverse
    ? ['isCorrect', 'is_correct']
    : ['is_correct', 'isCorrect'];
  const oldIsCorrect = take && take[oldKey];

  const newIsCorrect = convertToBoolean(oldIsCorrect);

  if (newIsCorrect !== undefined) {
    const modifiedTake = Object.assign({}, take, { [newKey]: newIsCorrect });
    delete modifiedTake[oldKey];
    return modifiedTake;
  }

  return take;
};

const convertStatus = (take, reverse) => {
  let modifiedTake = Object.assign({}, take);
  if (!reverse) {
    const answer = modifiedTake && modifiedTake.answer;
    const status = answer && answer.status;
    if (status) {
      modifiedTake.status = status;
    }
  } else if (modifiedTake.status) {
    const answer = (modifiedTake && modifiedTake.answer) || {};
    const answerWithStatus = { ...answer, status: modifiedTake.status };
    modifiedTake = { ...modifiedTake, answer: answerWithStatus };
  }
  return modifiedTake;
};

export const convertQuestionTakeBetweenClientAndServerVersion = (
  take,
  reverse,
) =>
  [convertIsCorrect, convertStatus].reduce(
    (result, func) => func(result, reverse),
    take,
  );

/**
 * get the question info with appropriate structure to save to server (take)
 */
const getQuestionInfosToSaveToTake = (
  questionUniqueIdsToSave,
  itemIid,
  getLearnItemQuestionInfo,
) => {
  const questionsInfo = {};
  (questionUniqueIdsToSave || []).forEach((questionUniqueId) => {
    const questionInfo = Object.assign(
      {},
      getLearnItemQuestionInfo(itemIid, questionUniqueId),
    );
    questionsInfo[questionUniqueId] = filterObjectKeys(
      questionInfo,
      ['answer'],
      false,
    );
  });
  return questionsInfo;
};

/**
 * convert the structure of answers we have in client to that of the server (take)
 * @param answers
 * @param questionUniqueIdsToSave
 */
const modifyAnswersToSaveToTake = (answers, questionUniqueIdsToSave = null) => {
  const modifiedAnswers = {};

  Object.keys(answers || {}).forEach((questionUniqueId) => {
    if (
      Array.isArray(questionUniqueIdsToSave) &&
      !questionUniqueIdsToSave.includes(questionUniqueId)
    ) {
      // do not include this in save take answers
      return;
    }

    let answer = answers[questionUniqueId];
    if (answer && answer.comments) {
      // because comments is added in separated logic
      answer = {
        ...answer,
        comments: null,
      };
    }

    const modifiedAnswer = convertQuestionTakeBetweenClientAndServerVersion(
      answer,
    );
    modifiedAnswers[questionUniqueId] = modifiedAnswer;
  });

  return modifiedAnswers;
};

// HOTFIX
export const getSaveSurveyTakeParamsSelector = createSelectorWithExtraParams(
  getLearnItemInfoSelector,
  getUserAnswersSelector,
  (state) => (itemIid) => getFormValues(itemIid)(state),
  (state) => state.learn.courseIid,
  1,
  (getLearnItemInfo, getUserAnswers, getValues, courseIid) => (itemIid) => {
    const info = getLearnItemInfo(itemIid);
    const answers = getUserAnswers(itemIid);
    const values = getValues(itemIid);

    if (!info) {
      return null;
    }

    const modifiedAnswers = modifyAnswersToSaveToTake(answers);

    const params = {
      survey_applied_item_relation_id: info.survey_applied_item_relation_id,
      answers: modifiedAnswers,
      rating: get(values, 'rating'),
      comment: get(values, 'comment'),
      survey_iid: get(info, 'iid'),
      item_iid: get(info, 'item_iid') || courseIid,
      type: get(info, 'item_type') || surveyAppliedItemTypes.COURSE,
    };

    return params;
  },
);

export const getSaveExerciseProgressParamsSelector = createSelectorWithExtraParams(
  getLearnItemInfoSelector,
  getExerciseStructureSelector,
  getUserAnswersSelector,
  (state) => state.learn.courseIid,
  (state) => state.learn.info,
  1,
  (getLearnItemInfo, getExerciseStructure, getUserAnswers, courseIid, info) => (
    itemIid,
  ) => {
    const structure = getExerciseStructure(itemIid);
    if (!Array.isArray(structure) || !structure[0]) {
      return null;
    }

    const exerciseIid = structure[0].exerciseIid;
    if (!exerciseIid) {
      return null;
    }

    const questionUniqueIdToQuestionIid = structure[0].questions;
    const questionUniqueIds =
      Array.isArray(questionUniqueIdToQuestionIid) &&
      questionUniqueIdToQuestionIid.map((item) => item && item.uniqueId);
    if (!Array.isArray(questionUniqueIds)) {
      return null;
    }

    const answers = getUserAnswers(itemIid, questionUniqueIds);

    const questionUniqueIdsThatNotCorrect = questionUniqueIds;
    let questionUniqueIdsThatNotUsed = questionUniqueIds;
    let progress = [];

    Object.keys(answers).forEach((key) => {
      const answer = answers[key];
      questionUniqueIdsThatNotUsed = questionUniqueIdsThatNotUsed.filter(
        (questionUniqueId) => questionUniqueId !== key,
      );

      if (answer) {
        const questionType = parseInt(answer.type);
        if (
          questionType != questionTypes.TYPE_OPEN_ENDED &&
          questionType != questionTypes.TYPE_API
        ) {
          progress = progress.concat([
            {
              tco_iid: answer.iid,
              p: answer.percent * 100,
            },
          ]);
        }
      }
      //   if (answer.isCorrect) {
      //     questionUniqueIdsThatNotCorrect =
      //       questionUniqueIdsThatNotCorrect
      //         .filter((questionUniqueId) => questionUniqueId !== key);
      //   }
      // }
    });

    // questionUniqueIdsThatNotUsed.forEach((uniqueId) => {
    //   const item = questionUniqueIdToQuestionIid.find((map) => map.uniqueId === uniqueId);
    //   if (item && item.iid) {
    //     progress = progress.concat([{
    //       tco_iid: item.iid,
    //       p: 0,
    //     }]);
    //   }
    // });

    if (info && info[itemIid] && info[itemIid].lastLearnTime) {
      let checkConcat = true;

      const timeSpent = parseInt(
        (Date.now() - info[itemIid].lastLearnTime) / 1000,
      );
      progress = progress.map((map) => {
        if (map && map.tco_iid === itemIid) {
          checkConcat = false;
          return { ...map, time_spent: timeSpent };
        }
        return map;
      });

      if (checkConcat) {
        progress = progress.concat([
          {
            tco_iid: itemIid,
            time_spent: timeSpent,
          },
        ]);
      }
    }

    return {
      progress,
      ciid: courseIid,
    };
  },
);

export const getNavigateInfoOfQuestionInExerciseSelector = createSelectorWithExtraParams(
  getLearnItemInfoSelector,
  3,
  (getLearnItemInfo) => (
    itemIid,
    questionUniqueId,
    shouldGetNewCurrentQuestionUniqueIdIfNeeded = true,
  ) => {
    const info = getLearnItemInfo(itemIid);
    const trackingLine = info && info.trackingLine;

    const basicReturnedValues = getBasicNavigateInfoOfExerciseByTrackingLine(
      trackingLine,
      questionUniqueId,
      shouldGetNewCurrentQuestionUniqueIdIfNeeded,
    );

    const { trackingLineInfoOfCurrentQuestion } = basicReturnedValues;

    const {
      items: uniqueIdsInQuestionGroup,
      introSticky: introStickyUniqueId,
    } = trackingLineInfoOfCurrentQuestion || {};

    return {
      ...basicReturnedValues,
      uniqueIdsInQuestionGroup,
      introStickyUniqueId,
    };
  },
);

export const getCurrentQuestionIdInExerciseInLearningScreen = () =>
  get(parse(get(window, 'location.search')), 'question_id') || '';

/**
 * call this function with (state)(itemIid)
 * will return {
 *   currentQuestionUniqueId: unique id of current question (see the comment at the top of this file),
 *   introStickyUniqueId: unique id of intro sticky question,
 *   uniqueIdsInQuestionGroup: unique ids of every questions in current group (right now, each group is display in one page)
 *   previousQuestionUniqueId: the uniqueId of the question that you get when click "back" (the first question of previous question group)
 *   nextQuestionUniqueId: the uniqueId of the question that you get when click "next" (the first question of next question group)
 * }
 */
export const getNavigateInfoOfExerciseSelector = createSelectorWithExtraParams(
  getNavigateInfoOfQuestionInExerciseSelector,
  1,
  (getNavigateInfoOfQuestionInExercise) => (itemIid) => {
    const currentQuestionUniqueId = getCurrentQuestionIdInExerciseInLearningScreen();
    const result = getNavigateInfoOfQuestionInExercise(
      itemIid,
      currentQuestionUniqueId,
      true,
    );
    // filter out unwanted keys, to avoid confusion
    return filterObjectKeys(result, [
      'currentQuestionUniqueId',
      'introStickyUniqueId',
      'uniqueIdsInQuestionGroup',
      'previousQuestionUniqueId',
      'nextQuestionUniqueId',
    ]);
  },
);

/**
 * @type {OutputSelector<unknown, unknown, (res: unknown) => unknown>}
 */
export const findOneQuestionUniqueIdInTrackingLineSelector = createSelectorWithExtraParams(
  getLearnItemInfoSelector,
  getQuestionsWithFullInfoFromUniqueIdsInExercisesSelector,
  2,
  (
    getLearnItemInfo,
    getQuestionsWithFullInfoFromUniqueIdsInExercisesFunction,
  ) => (itemIid, condition) => {
    const info = getLearnItemInfo(itemIid);
    const trackingLine = info && info.trackingLine;
    return findQuestionInExerciseTrackingLineThatMatchCondition(
      trackingLine,
      (questionUniqueId) => {
        const [
          fullQuestion,
        ] = getQuestionsWithFullInfoFromUniqueIdsInExercisesFunction(itemIid, [
          questionUniqueId,
        ]);

        return condition(fullQuestion);
      },
    );
  },
);

export const getListeningNavigateInfoOfQuestionInExerciseSelector = createSelectorWithExtraParams(
  getLearnItemInfoSelector,
  3,
  (getLearnItemInfo) => (
    itemIid,
    questionUniqueId,
    shouldGetNewCurrentQuestionUniqueIdIfNeeded = true,
  ) => {
    const info = getLearnItemInfo(itemIid);
    const listeningTrackingLine = info && info.listeningTrackingLine;

    const basicReturnedValues = getBasicNavigateInfoOfExerciseByTrackingLine(
      listeningTrackingLine,
      questionUniqueId,
      shouldGetNewCurrentQuestionUniqueIdIfNeeded,
    );

    const { trackingLineInfoOfCurrentQuestion } = basicReturnedValues;

    const { audios } = trackingLineInfoOfCurrentQuestion || {};

    return {
      ...basicReturnedValues,
      audios,
    };
  },
);

export const getListeningNavigateInfoOfExerciseSelector = createSelectorWithExtraParams(
  getLearnItemInfoSelector,
  getListeningNavigateInfoOfQuestionInExerciseSelector,
  1,
  (getLearnItemInfo, getListeningNavigateInfoOfQuestionInExercise) => (
    itemIid,
  ) => {
    const info = getLearnItemInfo(itemIid);
    const currentQuestionUniqueId =
      info && info.currentListeningQuestionUniqueId;

    /**
     * unlike getNavigateInfoOfExerciseSelector, if there are no currentListeningQuestionUniqueId
     * we will not try to get an alternative
     */
    if (!currentQuestionUniqueId) {
      return {};
    }

    return getListeningNavigateInfoOfQuestionInExercise(
      itemIid,
      currentQuestionUniqueId,
      true,
    );
  },
);

export const calculateExerciseResultSelector = createSelectorWithExtraParams(
  getUserAnswersSelector,
  getLearnItemInfoSelector,
  getNodeSelector,
  1,
  (getUserAnswers, getInfo, getNode) => (itemIid) => {
    const answers = getUserAnswers(itemIid);
    const info = getInfo(itemIid);
    const structure = info && info.structure;
    if (!Array.isArray(structure)) {
      return 0;
    }
    const questions = structure
      .reduce((res, item) => {
        if (!Array.isArray(item && item.questions)) {
          return res;
        }
        return res.concat(
          item.questions.map(
            (question) => question.iid && getNode(question.iid),
          ),
        );
      }, [])
      .filter((question) => !!question);
    return calculateResultForQuestions(questions, answers);
  },
);

export const getAllQuestionUniqueIdsInExerciseSelector = createSelectorWithExtraParams(
  getExerciseStructureSelector,
  1,
  (getExerciseStructure) => (itemIid) => {
    const structure = getExerciseStructure(itemIid);
    const questionUniqueIds =
      structure &&
      Array.isArray(structure) &&
      structure.reduce(
        (res, exercise) =>
          res.concat(
            (exercise &&
              Array.isArray(exercise.questions) &&
              exercise.questions.map((question) => question.uniqueId)) ||
              [],
          ),
        [],
      );
    return questionUniqueIds;
  },
);

export const isAllQuestionAnsweredSelector = createSelectorWithExtraParams(
  getAllQuestionUniqueIdsInExerciseSelector,
  getQuestionsWithFullInfoFromUniqueIdsInExercisesSelector,
  1,
  (
    getAllQuestionUniqueIdsInExercise,
    getQuestionsWithFullInfoFromUniqueIdsInExercisesFunction,
  ) => (itemIid) => {
    const questionIds = getAllQuestionUniqueIdsInExercise(itemIid);
    const questions = getQuestionsWithFullInfoFromUniqueIdsInExercisesFunction(
      itemIid,
      questionIds,
    );
    return (
      questions &&
      questions.every(
        (question) =>
          question &&
          (!canQuestionTypeHasAnswer(question.type) ||
            isQuestionDone(question.type, question.answer)),
      )
    );
  },
);

export const modifyQuestionsInfoOfTakeFromServer = (questionsInfo) => {
  const newQuestionsInfo = Object.assign({}, questionsInfo);
  Object.keys(newQuestionsInfo).forEach((questionUniqueId) => {
    let questionInfo = newQuestionsInfo[questionUniqueId] || {};
    questionInfo = {
      ...questionInfo,
      isTicked: questionInfo.isTicked === 'true',
      isTouched: questionInfo.isTouched === 'true',
    };
    newQuestionsInfo[questionUniqueId] = questionInfo;
  });
  return newQuestionsInfo;
};

export const getSaveTakeParamsSelector = createSelector(
  getLearnItemInfoSelector,
  getLearnItemQuestionInfoSelector,
  getUserAnswersSelector,
  (state) => state.learn.courseIid,
  (state) => state.learn.paperId,
  getAllQuestionUniqueIdsInExerciseSelector,
  (
    getLearnItemInfo,
    getLearnItemQuestionInfo,
    getUserAnswers,
    courseIid,
    paperId,
    getAllQuestionUniqueIdsInExercise,
  ) => (
    itemIid,
    isFinished,
    submitExamNth,
    questionUniqueIdsToSave = [], // what questions in take to send to server to save, if falsy, save everything
  ) => {
    const info = getLearnItemInfo(itemIid);
    const answers = getUserAnswers(itemIid);

    if (!info) {
      return null;
    }

    const { failToSaveTakeQuestions } = info;

    if (!questionUniqueIdsToSave) {
      questionUniqueIdsToSave = getAllQuestionUniqueIdsInExercise(itemIid);
    }

    if (!questionUniqueIdsToSave) {
      questionUniqueIdsToSave = [];
    }

    if (
      Array.isArray(failToSaveTakeQuestions) &&
      failToSaveTakeQuestions.length > 0
    ) {
      questionUniqueIdsToSave = questionUniqueIdsToSave.concat(
        failToSaveTakeQuestions,
      );
    }

    const questionsInfo = getQuestionInfosToSaveToTake(
      questionUniqueIdsToSave,
      itemIid,
      getLearnItemQuestionInfo,
    );
    const modifiedAnswers = modifyAnswersToSaveToTake(
      answers,
      questionUniqueIdsToSave,
    );

    const keys = [
      'id',
      'iid',
      'name',
      'type',
      'paperId',
      'exam_type',
      'exam_order',
      'description',
      'duration',
      'options',
    ];

    if (submitExamNth > 1) {
      keys.push('timeLeftAtSubmitTime');
      keys.push('timeLeftInSecondsAtSubmitTime');
    }

    const filteredInfo = info && filterObjectKeys(info, keys);

    const params = {
      exam: filteredInfo,
      answers: modifiedAnswers,
      questionsInfo,
      course_iid: courseIid,
      exam_finished: isFinished ? 1 : 0,
      paper_id: paperId,
    };

    // TODO: if exam_finished we'll add redux_log here
    if (isFinished) {
      // params.redux_log = localStorage.contest_log;
      params.redux_log = getContestReduxLog();
    }

    return params;
  },
);
