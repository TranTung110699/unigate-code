import { types as questionTypes } from 'components/admin/question/schema/question-types';
import { deepAssign } from 'common/utils/object';
import lodashGet from 'lodash.get';
import isEqual from 'lodash.isequal';

export const isQuestionDone = (type, userAnswers) => {
  switch (type) {
    case questionTypes.TYPE_API: {
      return userAnswers && userAnswers.status === 'have_ordered';
    }
    default: {
      return Array.isArray(userAnswers) && userAnswers.length > 0;
    }
  }
};

export const canQuestionTypeHasAnswer = (type) =>
  [
    questionTypes.TYPE_INLINE,
    questionTypes.TYPE_MC,
    questionTypes.TYPE_REORDER,
    questionTypes.TYPE_MATCHING_PAIRS,
    questionTypes.TYPE_API,
  ].includes(parseInt(type, 10));

const init = (question, userAnswers, highlightsClass) => {
  const highlights = [];
  const { match, notMatch } = highlightsClass || {};
  const totalCorrectAnswer = 0;
  const take = {
    iid: question.iid,
    type: question.type,
    answer: userAnswers,
    sw: question.sw,
  };
  const matchClass = match || 'default-match';
  const notMatchClass = notMatch || 'default-not-match';
  return {
    take,
    highlights,
    matchClass,
    notMatchClass,
    totalCorrectAnswer,
  };
};

export const getIntroAnswers = (question, userAnswers, highlightsClass) => {
  const { take, highlights, totalCorrectAnswer } = init(
    question,
    userAnswers,
    highlightsClass,
  );

  const { sw } = question;

  take.isCorrect = true;
  take.score = sw;
  take.percent = 100;

  return {
    take,
    totalCorrectAnswer,
    highlights,
  };
};

export const getMcAnswers = (
  question,
  userAnswers,
  highlightsClass,
  shouldShowKey,
) => {
  let {
    take,
    highlights,
    matchClass,
    notMatchClass,
    totalCorrectAnswer,
  } = init(question, userAnswers, highlightsClass);

  const { answers, mc_answers, sw } = question;
  if (!answers || !Array.isArray(answers) || !Array.isArray(userAnswers)) {
    return {
      take,
      highlights,
    };
  }

  let totalWrongAnswer = 0;

  mc_answers.forEach((item, index) => {
    let className = '';
    const selected = userAnswers.indexOf(index) >= 0;

    if (answers.indexOf(index) >= 0) {
      className = matchClass;
      if (selected) {
        totalCorrectAnswer += 1;
      }
    } else if (selected) {
      className = notMatchClass;
      totalWrongAnswer += 1;
    }

    highlights.push({
      value: index,
      selected,
      className,
    });
  });

  let correctPercent = 0;
  if (totalWrongAnswer > 0) {
    correctPercent = 0;
  } else {
    correctPercent = totalCorrectAnswer == answers.length ? 1 : 0;
  }

  const isCorrect =
    userAnswers &&
    totalCorrectAnswer === userAnswers.length &&
    totalCorrectAnswer === answers.length;

  if (!isCorrect && !shouldShowKey) {
    highlights = highlights
      .filter((hightlight) => hightlight && hightlight.selected)
      .map((highlight) =>
        Object.assign({}, highlight, { className: notMatchClass }),
      );
  }

  take.isCorrect = isCorrect;
  take.score = correctPercent * sw;

  take.percent = correctPercent;

  return {
    take,
    totalCorrectAnswer,
    highlights,
  };
};

export const getMcOpenEndedAnswers = (question, userAnswers) => {
  let { take, highlights } = init(question, userAnswers);

  // right now, this is only used for survey,
  // if in the future, there are actual logic where you need to mark mc open ended question, refactor this

  return {
    take,
    highlights,
  };
};

export const getInlineAnswers = (
  question,
  userAnswers,
  highlightsClass,
  shouldShowKey,
  getScoreByCorrectAnswers = true,
) => {
  let {
    take,
    highlights,
    matchClass,
    notMatchClass,
    totalCorrectAnswer,
  } = init(question, userAnswers, highlightsClass);

  const { answers, sw } = question;
  if (!answers) {
    return {
      take,
      highlights,
    };
  }

  if (answers.length > 0) {
    for (let i = 0; i < answers.length; i += 1) {
      let isAnswerCorrect = false;
      const userAnswer = userAnswers[i] || '';
      if (
        answers[i] &&
        answers[i].findIndex(
          (word) => word.toLowerCase() === userAnswer.trim().toLowerCase(),
        ) !== -1
      ) {
        isAnswerCorrect = true;
        totalCorrectAnswer += 1;
      }

      highlights.push({
        value: i,
        className: isAnswerCorrect ? matchClass : notMatchClass,
      });
    }
  }

  const isCorrect = totalCorrectAnswer === answers.length;

  if (!isCorrect && !shouldShowKey) {
    highlights = highlights.map((highlight) =>
      Object.assign({}, highlight, { className: notMatchClass }),
    );
  }

  take.isCorrect = isCorrect;

  if (getScoreByCorrectAnswers) {
    take.score = (totalCorrectAnswer / answers.length) * sw;
  } else {
    take.score = isCorrect ? sw : 0;
  }

  take.percent = totalCorrectAnswer / answers.length;

  return {
    take,
    totalCorrectAnswer,
    highlights,
  };
};

export const getReorderAnswers = (
  question,
  userAnswers,
  highlightsClass,
  shouldShowKey,
) => {
  let {
    take,
    highlights,
    matchClass,
    notMatchClass,
    totalCorrectAnswer,
  } = init(question, userAnswers, highlightsClass);
  const reorders = lodashGet(question, 'reorders');

  const { answers, sw } = question;
  if (!answers) {
    return {
      take,
      highlights,
    };
  }

  let fullUserAnswers = userAnswers || [];
  fullUserAnswers = fullUserAnswers.concat(
    Array(answers.length - fullUserAnswers.length).fill([]),
  );

  if (answers.length) {
    answers.forEach((answer, index) => {
      let isAnswerCorrect = false;
      const reordersAnswer = reorders.find(
        (reorder) => reorder.id === answer[0],
      );
      const reordersUserAnswer = reorders.find(
        (reorder) => reorder.id === fullUserAnswers[index][0],
      );

      if (
        answer[0] === fullUserAnswers[index][0] ||
        isEqual(
          lodashGet(reordersAnswer, 'content'),
          lodashGet(reordersUserAnswer, 'content'),
        )
      ) {
        isAnswerCorrect = true;
        totalCorrectAnswer += 1;
      }

      highlights = highlights.concat([
        {
          value: answer[0],
          className: isAnswerCorrect ? matchClass : notMatchClass,
        },
      ]);
    });
  }

  const isCorrect = totalCorrectAnswer === answers.length;

  if (!isCorrect && !shouldShowKey) {
    highlights = highlights.map((highlight) =>
      Object.assign({}, highlight, { className: notMatchClass }),
    );
  }

  take.isCorrect = isCorrect;
  take.score = isCorrect ? sw : 0;

  take.percent = totalCorrectAnswer / answers.length;

  return {
    take,
    totalCorrectAnswer,
    highlights,
  };
};

export const getMatchingPairAnswers = (
  question,
  userAnswers,
  highlightsClass,
  shouldShowKey,
) => {
  let {
    take,
    highlights,
    matchClass,
    notMatchClass,
    totalCorrectAnswer,
  } = init(question, userAnswers, highlightsClass);

  const { answers, sw } = question;
  if (!answers) {
    return {
      take,
      highlights,
    };
  }

  let fullUserAnswers = userAnswers || [];

  if (answers.length) {
    answers.forEach((answer, index) => {
      let isAnswerCorrect = false;

      if (fullUserAnswers[index] && answer[0] === fullUserAnswers[index][0]) {
        isAnswerCorrect = true;
        totalCorrectAnswer += 1;
      }

      highlights = highlights.concat([
        {
          value: answer[0],
          className: isAnswerCorrect ? matchClass : notMatchClass,
        },
      ]);
    });
  }

  const isCorrect = totalCorrectAnswer === answers.length;

  if (!isCorrect && !shouldShowKey) {
    highlights = highlights.map((highlight) =>
      Object.assign({}, highlight, { className: notMatchClass }),
    );
  }

  take.isCorrect = isCorrect;
  take.score = isCorrect ? sw : 0;

  take.percent = totalCorrectAnswer / answers.length;
  return {
    take,
    totalCorrectAnswer,
    highlights,
  };
};

export const getOpenEndedAnswers = (question, userAnswers) =>
  deepAssign(init(question, userAnswers), ['take'], {
    weighted: question.weighted,
    ts: Math.floor(new Date().getTime() / 1000),
  });

export const getQuestionAPIAnswer = (question, userAnswers) =>
  init(question, userAnswers);
