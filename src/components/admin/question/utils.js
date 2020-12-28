import { questionTemplateTypes } from 'components/admin/question/schema/question-template-types';
import { displayTypes, answerTypes } from './schema/question-types';

export const checkConditionToShowQuestionFieldBaseOnTemplateType = (
  questionField,
  templateType,
  displayOrAnswer = 'display',
) => {
  switch (templateType) {
    case questionTemplateTypes.MC_ANSWER_TEXT: {
      if (displayOrAnswer === 'display') {
        return (
          [
            displayTypes.AUDIO,
            displayTypes.AVATAR,
            displayTypes.CONTENT,
          ].indexOf(questionField) !== -1
        );
      } else {
        return [answerTypes.TEXT].indexOf(questionField) !== -1;
      }
    }
    case questionTemplateTypes.MC_ANSWER_AVATAR: {
      if (displayOrAnswer === 'display') {
        return (
          [displayTypes.AUDIO, displayTypes.CONTENT].indexOf(questionField) !==
          -1
        );
      } else {
        return [answerTypes.AVATAR].indexOf(questionField) !== -1;
      }
    }
    case questionTemplateTypes.MC_ANSWER_AVATAR_TEXT: {
      if (displayOrAnswer === 'display') {
        return (
          [displayTypes.AUDIO, displayTypes.CONTENT].indexOf(questionField) !==
          -1
        );
      } else {
        return (
          [answerTypes.AVATAR, answerTypes.TEXT].indexOf(questionField) !== -1
        );
      }
    }
    case questionTemplateTypes.MC_ANSWERS_TEXT_AUDIO: {
      if (displayOrAnswer === 'display') {
        return (
          [displayTypes.AVATAR, displayTypes.CONTENT].indexOf(questionField) !==
          -1
        );
      } else {
        return (
          [answerTypes.AUDIO, answerTypes.TEXT].indexOf(questionField) !== -1
        );
      }
    }
    case questionTemplateTypes.MMC_ANSWER_TEXT: {
      if (displayOrAnswer === 'display') {
        return (
          [
            displayTypes.AUDIO,
            displayTypes.AVATAR,
            displayTypes.CONTENT,
          ].indexOf(questionField) !== -1
        );
      } else {
        return [answerTypes.TEXT].indexOf(questionField) !== -1;
      }
    }
    case questionTemplateTypes.MMC_ANSWER_AVATAR: {
      if (displayOrAnswer === 'display') {
        return (
          [displayTypes.AUDIO, displayTypes.CONTENT].indexOf(questionField) !==
          -1
        );
      } else {
        return [answerTypes.AVATAR].indexOf(questionField) !== -1;
      }
    }
    case questionTemplateTypes.MMC_ANSWER_AVATAR_TEXT: {
      if (displayOrAnswer === 'display') {
        return (
          [displayTypes.AUDIO, displayTypes.CONTENT].indexOf(questionField) !==
          -1
        );
      } else {
        return (
          [answerTypes.AVATAR, answerTypes.TEXT].indexOf(questionField) !== -1
        );
      }
    }
    case questionTemplateTypes.MMC_ANSWERS_TEXT_AUDIO: {
      if (displayOrAnswer === 'display') {
        return (
          [displayTypes.AVATAR, displayTypes.CONTENT].indexOf(questionField) !==
          -1
        );
      } else {
        return (
          [answerTypes.AUDIO, answerTypes.TEXT].indexOf(questionField) !== -1
        );
      }
    }
  }

  return true;
};
