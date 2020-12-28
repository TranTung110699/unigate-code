/**
 * this file contains util functions to work with question in exercise flow
 * it will have some attributes that normal question do not have such as 'isTicked', 'isTouched', 'disabled'
 *
 * DO NOT USE THIS FUNCTION WITH NORMAL QUESTION
 */
import lodashGet from 'lodash.get';

export const isQuestionDisabled = (question) => {
  return lodashGet(question, 'disabled');
};

export const getQuestionDuration = (question) => {
  return lodashGet(question, 'duration');
};

export const getQuestionTimeLeft = (question) => {
  return lodashGet(question, 'questionTimeLeftInSeconds');
};
