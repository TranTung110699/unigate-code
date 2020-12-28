import trim from 'lodash.trim';
import { getLearnItemInfoSelector } from 'common/learn';
import { createSelectorWithExtraParams } from 'utils/selector';
import { sum } from 'common/utils/Array';
import { types as questionTypes } from 'components/admin/question/schema/question-types';

export const audioStatuses = {
  PLAYED: 'PLAYED',
  FINISHED: 'FINISHED',
};

export const inputId = (i, node) =>
  node && node.iid ? `${node.iid}-input-${i}` : `input-${i}`;

const getOptions = (e) => {
  let f = e;
  f = f.replace('[', '').replace(']', '');

  let options;
  if (f.indexOf('|') !== -1) {
    options = f.split('|');
  } else {
    options = f.split(',');
  }

  const beforeSorted = options.map((val, i) => ({
    text: trim(val),
    isAnswer: i === 0,
  }));

  // shuffle the options
  const getValue = (text) => {
    if (typeof text !== 'string') {
      return 0;
    }
    let total = 0;
    for (let i = 0; i < text.length; i += 1) {
      total += text.charCodeAt(i) * (i % 2 ? 1 : -1);
    }
    return total;
  };

  const compareFunction = (op, anotherOp) =>
    op && anotherOp && getValue(op.text) > getValue(anotherOp.text);

  return beforeSorted.sort(compareFunction);
};

export const parseInlineQuestionRawText = (content, node) => {
  // console.log(content);
  // Combine 2 regexes
  // [a,b,c,d] or __input__
  const regex = /(\[[^\[]*\]|__[^_]*__)/g;
  const matches = content.match(regex);
  if (!matches) {
    return [content];
  }

  let rawQuestion = '';
  const questionAfterSplitByRegex = content.split(regex);
  const correctAnswers = [];
  const correctAnswersAsArray = [];
  let f;

  let i = -1;
  questionAfterSplitByRegex.forEach((e) => {
    if (e && e.match(regex)) {
      if (e.charAt(0) === '[') {
        // [a,b,c,d]
        const options = getOptions(e);

        correctAnswers.push({
          type: 'select',
          answer: options,
        });

        correctAnswersAsArray.push(
          options
            .filter((answer) => answer.isAnswer)
            .map((filtered) => filtered.text),
        );
      } else {
        // __input__
        f = trim(e)
          .replace('__', '')
          .replace('__', '');

        if (f.indexOf('/') !== -1) {
          f = f.split('/');
        } else {
          f = [f];
        }

        correctAnswers.push({
          type: 'input',
          answer: f,
        });

        correctAnswersAsArray.push(f);
      }
      i += 1;
      rawQuestion += `<span id='${inputId(i, node)}'></span>`;
    } else {
      rawQuestion += e;
    }
  });

  return {
    content,
    correctAnswers,
    correctAnswersAsArray,
    rawQuestion,
  };
};

export const isIntro = (question) =>
  !!(
    question &&
    question.ntype === 'question' &&
    question.type === questionTypes.TYPE_INTRODUCTION
  );

export const isIntroSticky = (question) =>
  !!(isIntro(question) && question.intro_sticky);

export const groupQuestions = (questions) => {
  if (!questions) return [];
  return questions.reduce(
    ({ groups, lastGroupId }, question) => {
      if (lastGroupId === null) {
        return {
          groups: [[question]],
          lastGroupId: question.group,
        };
      }
      if (lastGroupId === question.group) {
        const previousGroups = groups.slice(0, groups.length - 1);
        const lastGroup = groups[groups.length - 1];
        return {
          groups: previousGroups.concat([lastGroup.concat([question])]),
          lastGroupId,
        };
      }
      return {
        groups: groups.concat([[question]]),
        lastGroupId: question.group,
      };
    },
    { groups: [], lastGroupId: null },
  ).groups;
};

export const getUserAnswersByQuestionUniqueIdSelector = createSelectorWithExtraParams(
  (state) => state.learn.info,
  2,
  (info) => (itemIid, questionUniqueId) =>
    info &&
    info[itemIid] &&
    info[itemIid].questions &&
    info[itemIid].questions[questionUniqueId] &&
    info[itemIid].questions[questionUniqueId].answer,
);

export const getAudiosInfoByQuestionUniqueIdSelector = createSelectorWithExtraParams(
  (state) => state.learn.info,
  2,
  (info) => (itemIid, questionUniqueId) =>
    info &&
    info[itemIid] &&
    info[itemIid].questions &&
    info[itemIid].questions[questionUniqueId] &&
    info[itemIid].questions[questionUniqueId].audiosInfo,
);

export const getShouldDisplayCheckedResultSelector = createSelectorWithExtraParams(
  (state) => state.learn.info,
  1,
  (info) => (itemIid) =>
    info &&
    info[itemIid] &&
    info[itemIid].questions &&
    Object.keys(info[itemIid].questions).reduce((result, key) => {
      const value = info[itemIid].questions[key];
      if (value && value.shouldDisplayCheckedResult) {
        return result.concat([key]);
      }
      return result;
    }, []),
);

export const getUserAnswersSelector = createSelectorWithExtraParams(
  (state) => state.learn.itemIid,
  getLearnItemInfoSelector,
  1,
  (learnItemIid, getLearnItemInfo) => (itemIid, questionUniqueIds) => {
    const localItemIid = itemIid || learnItemIid;
    const learnItemInfo = getLearnItemInfo(localItemIid);
    return (
      (learnItemInfo &&
        learnItemInfo.questions &&
        Object.keys(learnItemInfo.questions).reduce((result, key) => {
          if (
            Array.isArray(questionUniqueIds) &&
            !questionUniqueIds.includes(key)
          ) {
            return result;
          }
          const value = learnItemInfo.questions[key];
          return { ...result, [key]: value && value.answer };
        }, {})) ||
      {}
    );
  },
);

export const getQuestionPositionInExercise = (
  exercise,
  questionUniqueId,
  getQuestionUniqueId = (q) => q && q.uniqueId,
) => {
  const defaultResult = {
    groupIndex: -1,
    questionIndex: -1,
  };

  if (!exercise || !questionUniqueId) return defaultResult;

  let questionIndex = -1;

  const questionGroups =
    Array.isArray(exercise.children) && groupQuestions(exercise.children);

  if (!Array.isArray(questionGroups)) return defaultResult;

  const groupIndex = questionGroups.findIndex((group) => {
    questionIndex =
      Array.isArray(group) &&
      group.findIndex(
        (questionInGroup) =>
          questionInGroup &&
          getQuestionUniqueId(questionInGroup) === questionUniqueId,
      );
    return questionIndex !== -1;
  });

  return {
    groupIndex,
    questionIndex,
  };
};

export const getQuestionPositionInExercises = (
  exercises,
  questionUniqueId,
  getQuestionUniqueId,
) => {
  const defaultResult = {
    exerciseIndex: -1,
    groupIndex: -1,
    questionIndex: -1,
  };

  if (!questionUniqueId || !Array.isArray(exercises)) return defaultResult;

  let groupIndex = -1;
  let questionIndex = -1;

  const exerciseIndex = exercises.findIndex((exercise) => {
    const positionInExercise = getQuestionPositionInExercise(
      exercise,
      questionUniqueId,
      getQuestionUniqueId,
    );
    groupIndex = positionInExercise.groupIndex;
    questionIndex = positionInExercise.questionIndex;
    return groupIndex !== -1 && questionIndex !== -1;
  });

  return {
    exerciseIndex,
    groupIndex,
    questionIndex,
  };
};

export const getQuestionFromPositionInExercise = (
  exercise,
  groupIndex,
  questionIndex,
) => {
  if (!exercise || !Array.isArray(exercise.children)) {
    return {};
  }
  const questions = exercise.children;
  const questionGroups = groupQuestions(questions);
  const questionsToDisplay = questionGroups[groupIndex] || [];
  const questionToDisplay = questionsToDisplay[questionIndex];
  return {
    questions: questionsToDisplay,
    question: questionToDisplay,
  };
};

export const getQuestionFromPositionInExercises = (
  exercises,
  exerciseIndex,
  groupIndex,
  questionIndex,
) => {
  if (!Array.isArray(exercises)) {
    return {};
  }
  const exercise = exercises[exerciseIndex];
  return getQuestionFromPositionInExercise(exercise, groupIndex, questionIndex);
};

const getResultForAverageScoreScheme = (questions, answers) => {
  let totalScoreOfAllQuestions = 0;
  if (questions) {
    totalScoreOfAllQuestions = sum(
      questions,
      (question) => (question && question.sw) || 0,
    );
  }

  let totalScoreOfAnswers = 0;
  if (answers) {
    totalScoreOfAnswers = sum(
      Object.values(answers),
      (answer) => (answer && answer.score) || 0,
    );
  }

  const result = totalScoreOfAnswers / totalScoreOfAllQuestions;
  return !isNaN(result) ? Math.round(result * 100) : 0;
};

export const calculateResultForQuestions = (questions, answers) =>
  getResultForAverageScoreScheme(questions, answers);

export const getQuestionAudios = (question) => {
  if (!question) {
    return [];
  }
  if (Array.isArray(question.audio)) {
    return question.audio.map((audio) => audio.path);
  }
  if (question.audio) {
    return [question.audio];
  }
  return [];
};

export const isQuestionHaveContent = (
  question,
  typesOfContentToNotIncluded,
) => {
  const haveAudios = getQuestionAudios(question).length > 0;
  const haveVideo = question.vid;
  const haveAvatar = question.avatar;
  const haveQuestionBody =
    question.type !== questionTypes.TYPE_INLINE && question.content;

  const criteria = {
    audio: haveAudios,
    video: haveVideo,
    avatar: haveAvatar,
    questionBody: haveQuestionBody,
  };

  if (Array.isArray(typesOfContentToNotIncluded)) {
    typesOfContentToNotIncluded.forEach((criterion) => {
      delete criteria[criterion];
    });
  }

  return Object.values(criteria).some((value) => !!value);
};

export const doesQuestionAverageScoreMeaningful = (question) => {
  return (
    question && String(question.type) === String(questionTypes.TYPE_NUMBER)
  );
};
