import Utils from 'common/vocabset/Utils';

let numberSequence = 0;
export const getRecognitionPlayerId = (id) => {
  numberSequence += 1;
  return `${id}-recognition`;
};
export const getAudioPlayerId = (id) => {
  numberSequence += 1;
  return `${id}-${numberSequence}-audio`;
};
export const getMediaPlayerId = (id) => {
  numberSequence += 1;
  return `${id}-${numberSequence}-video`;
};

export const getWebSpeechRecognition = () =>
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const webRecognitionIsSupported = () => getWebSpeechRecognition();

export const textIsExistedInString = (text, targetText) => {
  text = replaceSpecificationData(text).toUpperCase();
  targetText = replaceSpecificationData(targetText).toUpperCase();

  if (targetText.indexOf(text) !== -1) {
    return true;
  }
  return false;
};

export const replaceSpecificationData = (text) => {
  for (const property in replaceData) {
    if (replaceData.hasOwnProperty(property)) {
      text = text.replace(property, replaceData[property]);
    }
  }
  return text;
};

const replaceData = {
  _: ' ', // '\'s': ' is| has', '\'re' : ' are',  '\'ve' : ' have',
  '?': '',
  '!': '',
  '@': '',
  '#': '',
  $: '',
  '%': '',
  '^': '',
  '&': '',
  '*': '',
  '(': '',
  ')': '',
  '-': ' ',
  '=': '',
  '+': '',
  '~': '',
  '`': '',
  ',': '',
  '.': '',
  '/': '',
  '\\': '',
  ':': '',
  ';': '',
  '"': '',
  "'": '',
};
// str.replace

export const getCorrectSpeakingByName = (vocabsetName, result) => {
  const vocabNames = vocabsetName.split(' ');
  const vocabNameData = [];
  for (let i = 0; i < vocabNames.length; i++) {
    const vocab = {
      name: vocabNames[i],
      isCorrect: textIsExistedInString(vocabNames[i], result),
    };
    vocabNameData.push(vocab);
  }
  return vocabNameData;
};

export const calculateRecognitionResult = (vocabList, result, lang) => {
  if (!vocabList || vocabList.length === 0 || !result || result.length === 0) {
    return {
      voiceResult: vocabList,
      percent: 0,
    };
  }
  let totalTrue = 0;

  const output = vocabList.map((vocab, i) => {
    vocab = Utils.formatVocabsetToDisplay(vocab, lang);
    const isCorrect = textIsExistedInString(vocab.name, result);
    if (isCorrect) {
      totalTrue++;
    }
    vocab.isCorrect = isCorrect;
    return vocab;
  });

  return {
    voiceResult: output,
    percent: Math.floor((totalTrue * 100) / vocabList.length),
  };
};

export const stringIsExistedInArray = (text, arrayText) => {
  text = replaceSpecificationData(text);
  for (let i = 0; i < arrayText.length; i++) {
    if (arrayText[i].toUpperCase() === text.toUpperCase()) {
      return true;
    }
  }
  return false;
};
