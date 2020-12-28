import { t1, t3 } from 'translate';
import { convertListOfValuesIntoOptionsForFormElement } from 'common/utils/form.js';

export const types = {
  TYPE_END_INTRODUCTION: -1, // end intro_sticky
  TYPE_INTRODUCTION: 0, // reading passage
  TYPE_INLINE: 1, // inline
  TYPE_MC: 2, // multiple choice
  TYPE_REORDER: 3, // reorder
  TYPE_MATCHING_PAIRS: 4,
  TYPE_REPEAT_AFTER_ME: 5,
  TYPE_ROLEPLAY: 6, // const TYPE_VOCABULARY: 7;
  TYPE_CATEGORIZED: 8,
  TYPE_OPEN_ENDED: 9, // user can type answer openly. writing question for example.
  TYPE_DICTATION: 10,
  TYPE_SPEAKING: 11,
  TYPE_API: 12,
  TYPE_NUMBER: 13,
  TYPE_MC_OPEN_ENDED: 14,
  TYPE_WRITING: 15,
};

export const skillTypes = {
  FLASHCARD: 'flashcard',
  READ: 'read',
  LISTEN: 'listen',
  TRANSLATE: 'translate',
  SPEAK_GOOGLE: 'speakgoogle',
  SPELL: 'spell',
};

export const videoTypes = {
  VIMEO: 'vimeo',
  YOUTUBE: 'youtube',
};

export const templateTypes = {
  FLASHCARD: 'flashcard',
  MC: 'mc',
  INPUT: 'input',
  SPEAK_GOOGLE: 'speakgoogle',
  VIDEO: 'video',
};

export const vocabDisplayTypes = {
  NAME: 'name',
  VNAME: 'vname',
  AVATAR: 'avatar',
  PLAYER: 'player',
  PHONETICS: 'phonetics',
};

export const displayTypes = {
  AVATAR: 'avatar',
  CONTENT: 'content',
  AUDIO: 'audio',
};

export const answerTypes = {
  TEXT: 'text',
  AVATAR: 'avatar',
  AUDIO: 'audio',
};

export const vocabAnswerTypes = {
  VNAME: 'vname',
  AVATAR: 'avatar',
  NAME: 'name',
  PHONETICS: 'phonetics',
};

const questionTypesOptions = [
  {
    value: types.TYPE_MC, // 2
    label: t3('mc'),
    avatar: '/images/mc.png',
  },
  {
    value: types.TYPE_INLINE, // 1
    label: t1('inline'),
    avatar: '/images/inline.png',
  },
  {
    value: types.TYPE_REORDER, // 3
    label: t1('reorder'),
    avatar: '/images/reorder.png',
  },
  {
    value: types.TYPE_MATCHING_PAIRS, // 4
    label: t1('matching_pairs'),
    avatar: '/images/pairs.png',
  },
  // 5 repeat after me
  {
    value: types.TYPE_ROLEPLAY, // 6
    label: t1('roleplay'),
    avatar: '/images/speaking.png',
  },
  {
    value: types.TYPE_OPEN_ENDED, // 9
    label: t1('open_ended'),
    avatar: '/images/open-ended.png',
  },
  {
    value: types.TYPE_INTRODUCTION, // 0
    label: t1('introduction'),
    avatar: '/images/intro.png',
  },
  // 10: dictation
  {
    value: types.TYPE_SPEAKING, // 11
    label: t1('speaking'),
    avatar: '/images/speaking.png',
  },
  {
    value: types.TYPE_NUMBER, // 11
    label: t1('number'),
    avatar: '/images/number.png',
  },
  {
    value: types.TYPE_API, // 12
    label: t1('photoshop'),
    avatar: '/images/api.png',
  },
  {
    value: types.TYPE_MC_OPEN_ENDED, // 14
    label: t1('mc_open_ended'),
    avatar: '/images/mc.png',
  },
  {
    value: types.TYPE_WRITING, // 15
    label: t1('writing'),
    avatar: '/images/writing.png',
  },
];

export const mcSubTypes = {
  MC: 'MC',
  MMC: 'MMC',
};

export const mcSubTypeInText = (subType) => {
  const configs = {
    [mcSubTypes.MC]: t1('single_answer'), // end intro_sticky
    [mcSubTypes.MMC]: t1('multiple_answers'), // reading passage
  };
  return configs[subType] || '';
};

export const mcSubTypeOptions = (question) =>
  convertListOfValuesIntoOptionsForFormElement(
    question.type === types.TYPE_MC_OPEN_ENDED
      ? [mcSubTypes.MMC] // this is because we do not have time to implement all sub types for mc open ended question
      : Object.values(mcSubTypes),
    mcSubTypeInText,
  );

export const openEndedSubTypeOptions = () => [
  {
    value: 'normal',
    primaryText: t1('normal'),
    label: t1('normal'),
  },
  {
    value: 'advanced',
    primaryText: t1('submit_by_frame_template'),
    label: t1('submit_by_frame_template'),
  },
];

export const questionTypeInText = (type) => {
  const configs = {
    [types.TYPE_END_INTRODUCTION]: t1('intro_sticky'), // end intro_sticky
    [types.TYPE_INTRODUCTION]: t1('introduction'), // reading passage
    [types.TYPE_INLINE]: t1('inline'), // inline
    [types.TYPE_MC]: t1('multiple_choice'), // multiple choice
    [types.TYPE_REORDER]: t1('reorder'), // reorder
    [types.TYPE_MATCHING_PAIRS]: t1('matching_pairs'),
    [types.TYPE_REPEAT_AFTER_ME]: t1('repeat_after_me'),
    [types.TYPE_ROLEPLAY]: t1('role_play'), // const TYPE_VOCABULARY: 7;
    [types.TYPE_CATEGORIZED]: t1('categorized'),
    [types.TYPE_OPEN_ENDED]: t1('open_ended'), // user can type answer openly. writing question for example.
    [types.TYPE_DICTATION]: t1('xpeak_dictation'),
    [types.TYPE_SPEAKING]: t1('speaking'),
    [types.TYPE_WRITING]: t1('writing'),
    [types.TYPE_NUMBER]: t1('number'),
    [types.TYPE_MC_OPEN_ENDED]: t1('multiple_choice_open_ended'),
    [types.TYPE_API]: t1('api_question'),
  };
  return configs[type] || '';
};

export const questionTypeInTextAbbreviated = (question) => {
  const type = question && question.type;
  const mcSubType = question && question.sub_type;
  const configs = {
    [types.TYPE_END_INTRODUCTION]: 'I(s)', // end intro_sticky
    [types.TYPE_INTRODUCTION]: 'I', // reading passage
    [types.TYPE_INLINE]: 'IL', // inline
    [types.TYPE_MC]: 'MC', // multiple choice
    [types.TYPE_REORDER]: 'RO', //t1('reorder'), // reorder
    [types.TYPE_MATCHING_PAIRS]: 'MP', //t1('matching_pairs'),
    [types.TYPE_REPEAT_AFTER_ME]: 'RE', //t1('repeat_after_me'),
    [types.TYPE_ROLEPLAY]: 'ROLE', //t1('role_play'), // const TYPE_VOCABULARY: 7;
    [types.TYPE_CATEGORIZED]: t1('categorized'),
    [types.TYPE_OPEN_ENDED]: 'OE', //t1('open_ended'), // user can type answer openly. writing question for example.
    [types.TYPE_DICTATION]: 'DICTATION', // t1('xpeak_dictation'),
    [types.TYPE_SPEAKING]: 'SPEAKING', // t1('speaking'),
    [types.TYPE_NUMBER]: 'NUM', //t1('number'),
    [types.TYPE_MC_OPEN_ENDED]: 'MC_OE', //t1('number'),
    [types.TYPE_API]: 'API', // t1('api_question'),
  };

  return mcSubType || configs[type] || '';
};

export default questionTypesOptions;
