import {
  skillTypes,
  templateTypes,
  types,
  videoTypes,
  vocabAnswerTypes,
  vocabDisplayTypes,
} from 'components/admin/question/schema/question-types';
import { questionTemplateTypes } from 'components/admin/question/schema/question-template-types';

import QuestionTemplate from './QuestionTemplate';
import Utils from './Utils';

export const TRACKER_MODE = ['basic', 'advanced', 'speak', 'complete'];

const totalOfVocabsetQuestions = 15;
const totalAnswerForEachQuestion = 4;

export const getSkillsByTrackingMode = (mode) => {
  switch (mode) {
    case 'basic':
      return [skillTypes.READ, skillTypes.LISTEN, skillTypes.TRANSLATE];
    case 'advanced':
      return [skillTypes.READ, skillTypes.LISTEN, skillTypes.TRANSLATE];
    case 'speak':
      return [skillTypes.SPEAK_GOOGLE];
    case 'complete':
      return [
        skillTypes.READ,
        skillTypes.LISTEN,
        skillTypes.TRANSLATE,
        skillTypes.SPEAK_GOOGLE,
      ];
    default:
      return [];
  }
};

export const getSkillsDetailByTrackingMode = (mode) => {
  switch (mode) {
    case 'basic':
      return {
        p0: skillTypes.FLASHCARD,
        p1: skillTypes.READ,
        p2: skillTypes.LISTEN,
        p3: skillTypes.TRANSLATE,
      };
    case 'advanced':
      return {
        p0: skillTypes.FLASHCARD,
        p1: skillTypes.READ,
        p2: skillTypes.LISTEN,
        p3: skillTypes.TRANSLATE,
        p4: skillTypes.SPELL,
      };
    case 'speak':
      return {
        p0: skillTypes.FLASHCARD,
        p5: skillTypes.SPEAK_GOOGLE,
      };
    case 'complete':
      return {
        p0: skillTypes.FLASHCARD,
        p1: skillTypes.READ,
        p2: skillTypes.LISTEN,
        p3: skillTypes.TRANSLATE,
        p4: skillTypes.SPELL,
        p5: skillTypes.SPEAK_GOOGLE,
      };
    default:
      return {};
  }
};

/**
 * 'p0' : 'flashcard' : 17
 * 'p1' : 'read' : 1,2
 * 'p2' : 'listen' : 5,6,7
 * 'p3' : 'translate' : 3,4
 * 'p4' : 'spell' : 11,12
 * 'p5' : 'speakgoogle' : 18
 */
export const getQuestionTemplatesByTrackingMode = (mode) => {
  const questionTemplateIds = [];
  switch (mode) {
    case 'basic':
      questionTemplateIds.push(1, 2, 3, 4, 5, 6, 7, 17);
      break;
    case 'advanced':
      questionTemplateIds.push(1, 2, 3, 4, 5, 6, 7, 11, 12, 17);
      break;
    case 'speak':
      questionTemplateIds.push(17, 18);
      break;
    case 'dictation':
      questionTemplateIds.push(18);
      break;
    case 'complete':
      questionTemplateIds.push(1, 2, 3, 4, 5, 6, 7, 11, 12, 17, 18);
      break;
    default:
      questionTemplateIds.push(1, 2, 3, 4, 5, 6, 7, 11, 12, 17);
      break;
  }
  const questionTemplates = [];
  const skillList = {};
  for (let i = 0; i < questionTemplateIds.length; i += 1) {
    const questionTemp = QuestionTemplate[questionTemplateIds[i]];
    questionTemplates.push(questionTemp);
    if (questionTemp.skill) {
      const skills = questionTemp.skill.split(',');
      skills.forEach((skill, index) => {
        const questionsInSkill = skillList[skill] || [];
        questionsInSkill.push(questionTemplateIds[i]);
      });
    }
  }
  return {
    questionTemplates,
    skillList,
  };
};

/**
 * generate random data from array
 * @param arr
 * @returns {*}
 */
const getRandomDataInArray = (arr) => {
  if (!arr || arr.length === 0) {
    return { arrResult: [] };
  }
  if (arr.length === 1) {
    return {
      result: arr[0],
      arrResult: [],
    };
  }
  let i = 0;
  while (i < 10) {
    // hit 10 times, if still return undefined ==> return;
    const randomIndex = Math.floor(Math.random() * arr.length);
    const result = arr[randomIndex];
    if (result) {
      arr.splice(randomIndex, 1);
      return {
        result,
        arrResult: arr,
      };
    }
    i += 1;
  }
  return { arrResult: [] };
};

/**
 * get all answers data from another vocabset to generate random answer
 *
 * @param vocab
 * @param vocabList
 * @param vocabTemplateAnswer
 * @param totalAnswer
 * @returns {Array}
 */
const getAnswersFromAnotherVocabset = (
  vocab,
  vocabList,
  vocabTemplateAnswer,
  totalAnswer,
) => {
  const result = [];
  vocabList.forEach((vocabItem, index) => {
    let propData = vocabItem[vocabTemplateAnswer];
    if (totalAnswer - 1 === result.length) {
      return result;
    }
    if (vocabItem.iid !== vocab.iid && propData) {
      if (Array.isArray(propData)) {
        propData = getRandomDataInArray(propData);
        if (propData.result) {
          result.push(propData.result);
        }
      } else {
        result.push(propData);
      }
    }
  });

  return result;
};

/**
 * Return data that can use to generate question
 *
 * @param vocab
 * @param vocabSet
 * @param vocabTemplateAnswer
 * @param totalAnswer
 * @param template
 * @returns [
 *            {
 *              value: 'the value',
 *              is_answer: true or false,
 *            }
 *          ]
 */
const generateAnswersForVocab = (
  vocab,
  vocabSet,
  vocabTemplateAnswer,
  totalAnswer,
  template,
) => {
  if (!vocab[vocabTemplateAnswer]) {
    return undefined;
  }
  if (!totalAnswer || totalAnswer === 1) {
    return [vocab[vocabTemplateAnswer]];
  }
  let dataForRandom = getAnswersFromAnotherVocabset(
    vocab,
    vocabSet,
    vocabTemplateAnswer,
    totalAnswer,
  );
  if (
    !dataForRandom ||
    dataForRandom.length <= 0 ||
    dataForRandom.length < totalAnswer - 1
  ) {
    return undefined;
  }
  let answerList = [vocab[vocabTemplateAnswer]];
  for (let i = 0; i < totalAnswer - 1; i += 1) {
    const random = getRandomDataInArray(dataForRandom);
    answerList.push(random.result);
    dataForRandom = [...random.arrResult];
  }

  const result = [];
  let correctPosition = 0;
  for (let i = 0; i < totalAnswer; i += 1) {
    const random1 = getRandomDataInArray(answerList);
    const item = {
      value: random1.result,
      text: random1.result,
      is_answer: vocab[vocabTemplateAnswer] === random1.result,
    };

    if (template.answer === vocabAnswerTypes.AVATAR) {
      item.avatar = window.APP_STATIC_CDN + random1.result;
      delete item.text;
    }

    result.push(item);
    if (item.value === vocab[vocabTemplateAnswer]) {
      correctPosition = i;
    }

    answerList = [...random1.arrResult];
  }

  return {
    mc_answers: result,
    answers:
      template.type === templateTypes.MC
        ? [correctPosition]
        : [[vocab[vocabTemplateAnswer]]],
    correctPosition,
  };
};

const getVideoItemFromVocab = (vocab) => {
  let videoId = vocab.svid || vocab.vid_us || vocab.vid_gb;
  let videoType = videoTypes.YOUTUBE;
  if (!videoId) {
    videoId = vocab.vimeo_vid_us || vocab.vimeo_vid_gb;
    videoType = videoTypes.VIMEO;
  }
  if (videoId) {
    return {
      iid: vocab.iid,
      type: 'video',
      vocabTemplateType: 'video',
      tpl_type: 'video',
      videoId,
      videoType,
    };
  }
  return undefined;
};

const getQuestionTypeFromVocabTemplate = (template) => {
  let questionType = types.TYPE_MC;

  if (template.type === templateTypes.INPUT) {
    questionType = types.TYPE_INLINE;
  }

  return questionType;
};

const getTemplateTypeFromVocabTemplate = (template) => {
  let templateType = questionTemplateTypes.MC_ANSWER_TEXT;

  if (template.type === templateTypes.INPUT) {
    templateType = questionTemplateTypes.TYPING;
  } else if (template.answer === vocabAnswerTypes.AVATAR) {
    templateType = questionTemplateTypes.MC_ANSWER_AVATAR_TEXT;
  }

  return templateType;
};

const formatQuestionDisplay = (vocab, template) => {
  let questionDisplay = vocab[template.display];

  if (
    template.display === vocabDisplayTypes.AVATAR &&
    vocab[template.display]
  ) {
    questionDisplay = window.APP_STATIC_CDN + vocab[template.display];
  }

  return questionDisplay;
};

const generateQuestionByVocab = (
  vocab,
  vocabList,
  skillsAndQuestionTemplate,
  skill,
) => {
  const result = [];
  const videoItem = getVideoItemFromVocab(vocab);
  if (videoItem) {
    result.push(videoItem);
  }
  let questionTemplates = [...skillsAndQuestionTemplate.questionTemplates];

  if (!questionTemplates || questionTemplates.length <= 0) {
    return result;
  }
  let numberOfQuestions =
    Math.ceil(totalOfVocabsetQuestions / vocabList.length) + 1;
  if (skill === 'dictation') {
    numberOfQuestions = 10;
  }
  for (let i = 0; i < numberOfQuestions; i += 1) {
    const randomTemplate = getRandomDataInArray(questionTemplates);
    questionTemplates = randomTemplate.arrResult;

    if (randomTemplate.result) {
      const template = randomTemplate.result;
      if (
        template.type === templateTypes.FLASHCARD ||
        template.type === templateTypes.SPEAK_GOOGLE
      ) {
        result.push({
          vocabTemplateType: template.type,
          tpl_type: template.tpl_type,
          help_text: template.help_text,
          template,
          vid: vocab.iid,
        });
      } else {
        const answers = generateAnswersForVocab(
          vocab,
          vocabList,
          template.answer,
          totalAnswerForEachQuestion,
          template,
        );
        if (answers) {
          const question = {
            ...answers,
            iid: vocab.iid,
            help_text: template.help_text,
            type: getQuestionTypeFromVocabTemplate(template),
            tpl_type: getTemplateTypeFromVocabTemplate(template),
            vocabTemplateType: template.type,
            skill: template.skill,
            isVocabQuestion: true,
            template,
          };

          question[template.questionDisplay] = formatQuestionDisplay(
            vocab,
            template,
          );

          if (template.type === templateTypes.INPUT) {
            question.content = `__${vocab[template.answer]}__`;
            if (template.display !== vocabDisplayTypes.PLAYER) {
              question.inlineText = vocab[template.display];
            }
          }

          if (question[template.questionDisplay]) {
            // TODO: Validate question display before push to vocabQuestions
            result.push(question);
          }
        }
      }
    }
  }

  return result;
};

/**
 * generate question for vocabset
 *
 * @param vocabset
 * @returns {undefined}
 */
export const generateQuestionsByVocabset = (vocabset, skill) => {
  if (!vocabset || vocabset === 0) {
    return undefined;
  }
  const totalQuestionWillGenerated = vocabset.length;
  let localSkill = skill;
  if (!localSkill) {
    localSkill = Utils.getVocabsetSkill(vocabset);
  }

  const skillsAndQuestionTemplate = getQuestionTemplatesByTrackingMode(
    localSkill,
  );
  const result = [];
  for (let i = 0; i < totalQuestionWillGenerated; i += 1) {
    const vocab = vocabset[i];
    let questions = generateQuestionByVocab(
      vocab,
      vocabset,
      skillsAndQuestionTemplate,
      skill,
    );
    questions = questions || [];
    result.push({
      vocab,
      questions,
    });
  }

  return result;
};
