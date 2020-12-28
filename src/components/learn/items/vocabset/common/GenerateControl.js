export const SIGN_ON_END = 'overEnd';
export const SIGN_ON_START = 'overStart';

/**
 *
 * @param vocabQuestions
 *              {
 *                vocabIid: {
 *                            questions: []
 *                            vocab: {}
 *                          }
 *              }
 * @param currentTrackingLine
 */
export const getVocabQuestion = (vocabQuestions, currentTrackingLine) => {
  const trackingLineArr = currentTrackingLine.split('-');
  const questionIndex = trackingLineArr[2];
  const vocabQuestionIndex = trackingLineArr[1];
  const questions = vocabQuestions[vocabQuestionIndex].questions;
  return { ...questions[questionIndex], iid: currentTrackingLine };
};

export const getCurrentTrackingLineByIid = (trackingLine, trackingLineIid) => {
  if (!trackingLine || trackingLine.length === 0) {
    return SIGN_ON_END;
  }

  for (let i = 0; i < trackingLine.length; i += 1) {
    if (trackingLine[i].indexOf(trackingLineIid) !== -1) {
      return trackingLine[i];
    }
  }

  return SIGN_ON_END;
};

export const getPrevTrackingLine = (trackingLine, currentTrackingLine) => {
  for (let i = 0; i < trackingLine.length; i += 1) {
    if (trackingLine[i] !== currentTrackingLine) {
      continue;
    }
    if (i - 1 >= 0) {
      return trackingLine[i - 1];
    }
    return SIGN_ON_START;
  }
};

export const getNextTrackingLine = (trackingLine, currentTrackingLine) => {
  if (!trackingLine || trackingLine.length === 0) {
    return SIGN_ON_END;
  }

  if (currentTrackingLine === undefined) {
    currentTrackingLine = trackingLine[0];
  }

  for (let i = 0; i < trackingLine.length; i += 1) {
    if (trackingLine[i] !== currentTrackingLine) {
      continue;
    }
    if (i + 1 < trackingLine.length) {
      return trackingLine[i + 1];
    }
    return SIGN_ON_END;
  }
};

/**
 * Generate tracking lines for vocabset
 * @param vocabQuestions
 * @param skill
 * @returns [`vocabIid-vocabIidIndex-questionIndex`,]
 */
export const generateVocabTrackingLines = (vocabQuestions, skill) => {
  let trackingLines = [];
  const questionsResult = {};
  const controlQuestions = [];
  if (!vocabQuestions || vocabQuestions.length === 0) {
    return {
      trackingLines,
      questions: questionsResult,
      controlQuestions,
    };
  }

  let groupQuestionIndex = 0;
  for (let i = 0; i < vocabQuestions.length; i += 1) {
    if (!vocabQuestions[i] || !vocabQuestions[i].questions) {
      continue;
    }
    const questions = vocabQuestions[i].questions;
    const vocab = vocabQuestions[i].vocab;

    for (let j = 0; j < questions.length; j += 1) {
      const line = `${vocab.iid}-${i}-${j}`;
      const question = {
        ...questions[j],
        iid: line,
        group: groupQuestionIndex,
        uniqueId: line,
      };
      trackingLines.push(line);
      questionsResult[line] = question;
      groupQuestionIndex += 1;
      controlQuestions.push(question);
    }
  }

  if (skill !== 'dictation') {
    const question = {
      iid: 'VOCAB_LIST',
      group: 0,
      uniqueId: 'VOCAB_LIST',
    };

    trackingLines.unshift('VOCAB_LIST');
    controlQuestions.unshift(question);
    questionsResult.VOCAB_LIST = question;
  }

  return {
    trackingLines,
    questions: questionsResult,
    controlQuestions,
  };
};
