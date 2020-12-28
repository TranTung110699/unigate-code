import lodashGet from 'lodash.get';

export const getQuestions = (lecture, { sortByTime } = {}) => {
  let questions = lodashGet(lecture, 'questions');
  if (!Array.isArray(questions)) {
    return questions;
  }

  if (sortByTime) {
    questions = questions.map((q, index) =>
      Object.assign({}, q, {
        // the original index of this question in array
        // so that we can trace back to its original state
        originalIndex: index,
      }),
    );

    questions = questions.sort(
      (q1, q2) => lodashGet(q1, 'time') - lodashGet(q2, 'time'),
    );
  }

  return questions;
};

export const getQuestionsInTimeFrame = (
  lecture,
  startTime,
  endTime,
  { sortByTime, startTimeExclusive, endTimeExclusive } = {},
) => {
  const questions = getQuestions(lecture, {
    sortByTime,
  });

  if (!Array.isArray(questions)) {
    return questions;
  }

  return questions.filter((q) => {
    const qTime = lodashGet(q, 'time');
    return (
      (startTimeExclusive ? startTime < qTime : startTime <= qTime) &&
      (endTimeExclusive ? qTime < endTime : qTime <= endTime)
    );
  });
};

export const checkIfMustAnswerLectureQuestionsCorrectly = (lecture) => {
  return Boolean(
    lodashGet(
      lecture,
      'cannot_continue_learning_if_answer_question_incorrectly',
    ),
  );
};

/**
 * node has 2 questions starting 01:00 and 02:00
 * if call this function for question 2 -> return 60
 * if call this function for question 1 -> return 0

 */
export const getQuestionPreviousSegmentStartTime = (node, currentQuestion) => {
  const allQuestions =
    getQuestions(node, {
      sortByTime: true,
    }) || [];
  const questionToDoIndex = allQuestions.findIndex(
    (q) => lodashGet(q, 'id') == lodashGet(currentQuestion, 'id'),
  );

  const previousQuestion = allQuestions[questionToDoIndex - 1];
  const t = lodashGet(previousQuestion, 'time') | 0;
  return t + 1; // seconds
};
