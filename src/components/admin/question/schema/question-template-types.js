import { t1 } from 'translate';
import { mcSubTypes } from './question-types';
import { types } from 'components/admin/question/schema/question-types';

export const questionTemplateTypes = {
  MC_ANSWER_TEXT: 'mc_answer_text',
  MC_ANSWER_AVATAR: 'mc_answer_avatar',
  MC_ANSWER_AVATAR_TEXT: 'mc_answer_avatar_text',
  MC_ANSWERS_TEXT_AUDIO: 'mc_answers_text_audio',
  MMC_ANSWER_TEXT: 'mmc_answer_text',
  MMC_ANSWER_AVATAR: 'mmc_answer_avatar',
  MMC_ANSWER_AVATAR_TEXT: 'mmc_answer_avatar_text',
  MMC_ANSWERS_TEXT_AUDIO: 'mmc_answers_text_audio',
  SELECT: 'select',
  TYPING: 'typing',
};

export const mmcTemplateTypes = [
  questionTemplateTypes.MMC_ANSWER_TEXT,
  questionTemplateTypes.MMC_ANSWER_AVATAR,
  questionTemplateTypes.MMC_ANSWER_AVATAR_TEXT,
  questionTemplateTypes.MMC_ANSWERS_TEXT_AUDIO,
];

export const mcTemplateTypes = [
  questionTemplateTypes.MC_ANSWER_TEXT,
  questionTemplateTypes.MC_ANSWER_AVATAR,
  questionTemplateTypes.MC_ANSWER_AVATAR_TEXT,
  questionTemplateTypes.MC_ANSWERS_TEXT_AUDIO,
];

export const questionTemplateTypesOptions = (mcSubType, type) => {
  let optionsBySubType = [];

  if (mcSubType === mcSubTypes.MMC) {
    optionsBySubType = [
      {
        value: questionTemplateTypes.MMC_ANSWER_TEXT,
        imgTitle: t1('display_audio_text_answer_text_mmc'),
        avatar: '/images/mc-answers/mmc1.png',
      },
      {
        value: questionTemplateTypes.MMC_ANSWER_AVATAR,
        imgTitle: t1('display_audio_text_answer_avatar_mmc'),
        avatar: '/images/mc-answers/mmc2.png',
      },
      {
        value: questionTemplateTypes.MMC_ANSWER_AVATAR_TEXT,
        imgTitle: t1('Display_audio_text_answer_avatar_text_mmc'),
        avatar: '/images/mc-answers/mmc3.png',
      },
      {
        value: questionTemplateTypes.MMC_ANSWERS_TEXT_AUDIO,
        imgTitle: t1('display_avatar_text_answer_text_audio_mmc'),
        avatar: '/images/mc-answers/mmc4.png',
      },
    ];
  } else {
    optionsBySubType = [
      {
        value: questionTemplateTypes.MC_ANSWER_TEXT,
        imgTitle: t1('display_audio_avatar_text_answer_text_mc'),
        avatar: '/images/mc-answers/mc1.png',
      },
      {
        value: questionTemplateTypes.MC_ANSWER_AVATAR,
        imgTitle: t1('display_audio_text_answer_avatar_mc'),
        avatar: '/images/mc-answers/mc2.png',
      },
      {
        value: questionTemplateTypes.MC_ANSWER_AVATAR_TEXT,
        imgTitle: t1('display_audio_text_answer_avatar_text_mc'),
        avatar: '/images/mc-answers/mc3.png',
      },
      {
        value: questionTemplateTypes.MC_ANSWERS_TEXT_AUDIO,
        imgTitle: t1('display_avatar_text_answer_text_audio_mc'),
        avatar: '/images/mc-answers/mc4.png',
      },
    ];
  }

  let result = optionsBySubType;
  if (type === types.TYPE_MC_OPEN_ENDED) {
    // this is because we do not have time to implement this question type with all templates
    result = result.filter((opt) => {
      return [questionTemplateTypes.MMC_ANSWER_TEXT].includes(opt.value);
    });
  }

  return result;
};
