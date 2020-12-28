import { preloadDataStatuses, preloadDataTypes } from 'configs/constants';

// export const getItemByIndex = (options, index) => {
//   let localItem = {};
//   options.forEach((optionIndex, i) => {
//     if (optionIndex === index) {
//       localItem = options[i];
//     }
//   });
//
//   return localItem;
// };

export const getValueOfItem = (item, index, valueKey) => {
  let itemValue;
  if (valueKey && valueKey === '@index') {
    itemValue = index;
  } else {
    itemValue = !valueKey ? item : item[valueKey];
  }

  return itemValue;
};

export const getHighlightsClass = (highlights, dataValue) => {
  if (!highlights) {
    return '';
  }

  let className = '';
  highlights.forEach((highlight) => {
    if (highlight.value === dataValue) {
      className = highlight.className;
    }
  });

  return className;
};

export const checkAnswer = (question, highlightsClass, userAnswers) => {
  const { answers, sw, mc_answers } = question;
  let { match, notMatch } = highlightsClass || {};

  const highlights = [];
  let totalCorrectAnswer = 0;

  match = match || 'default-match';
  notMatch = notMatch || 'default-not-match';

  const take = {
    type: question.type,
    is_ticked: false,
    answer: userAnswers,
  };

  if (!answers) {
    return highlights;
  }

  // TODO: Move 1 to QUESTION.TYPES.INLINE
  if (question.type === 1) {
    for (let i = 0; i < answers.length; i += 1) {
      let isCorrect = false;
      if (answers[i] === `${userAnswers[i]}`.trim()) {
        isCorrect = true;
        totalCorrectAnswer += 1;
      }

      highlights.push({
        value: i,
        className: isCorrect ? match : notMatch,
      });
    }
  } else {
    mc_answers.forEach((item, index) => {
      let isCorrect = false;

      if (userAnswers.indexOf(index) >= 0 && answers.indexOf(index) >= 0) {
        isCorrect = true;
        totalCorrectAnswer += 1;
      }

      highlights.push({
        value: index,
        className: isCorrect ? match : notMatch,
      });
    });
  }

  if (totalCorrectAnswer.length === answers.length) {
    take.score = sw;
  }

  // const questionResult = Object.assign({},
  //   ...question,
  //   take,
  // );

  return highlights;
};

export const getPreloadData = (preloadData = [], node) => {
  let mediaData = {};
  if (node.audio) {
    node.audio.forEach((audio) => {
      mediaData = {
        id: audio.id,
        name: audio.name,
        path: audio.path,
        status: preloadDataStatuses.INIT,
        type: preloadDataTypes.AUDIO,
      };

      preloadData.push(mediaData);
    });
  }

  if (node.avatar) {
    mediaData = {
      id: node.id,
      name: node.name,
      path: node.avatar,
      status: preloadDataStatuses.INIT,
      type: preloadDataTypes.IMAGE,
    };

    preloadData.push(mediaData);
  }

  if (node.mc_answers) {
    node.mc_answers.forEach((mcAnswer) => {
      if (mcAnswer.audio) {
        mediaData = {
          id: mcAnswer.id,
          name: mcAnswer.name,
          path: mcAnswer.audio,
          status: preloadDataStatuses.INIT,
          type: preloadDataTypes.AUDIO,
        };

        preloadData.push(mediaData);
      }

      if (mcAnswer.avatar) {
        mediaData = {
          id: mcAnswer.id,
          name: mcAnswer.name,
          path: mcAnswer.avatar,
          status: preloadDataStatuses.INIT,
          type: preloadDataTypes.IMAGE,
        };

        preloadData.push(mediaData);
      }
    });
  }

  // TODO: Add others preload data like youtube, pdf, ppt, vimeo

  if (node && node.children) {
    if (node.children !== null && typeof node.children === 'object') {
      Object.keys(node.children).map((objectKey) => {
        preloadData = getPreloadData(preloadData, node.children[objectKey]);
      });
    } else {
      node.children.forEach((childNode) => {
        preloadData = getPreloadData(preloadData, childNode);
      });
    }
  }

  return preloadData;
};
