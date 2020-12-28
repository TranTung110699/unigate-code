// const fields = ['name'];
import { change } from 'redux-form';
import store from 'store';
import { positions } from 'components/admin/job-position/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import { inRange, required } from 'common/validators';
import {
  mmcTemplateTypes,
  questionTemplateTypes,
  questionTemplateTypesOptions,
} from 'components/admin/question/schema/question-template-types';
import {
  constants,
  difficulties,
  numberQuestionTypeOptions,
  numberQuestionTypes,
  questionDisplayTemplateOptions,
  questionPassingScheme,
  reorderTypeOptions,
  reorderTypes,
  UsedForOptions,
} from 'configs/constants';
import { parseInlineQuestionRawText } from 'common/learn/Question';
import { t, t1, t2 } from 'translate';
import {
  mcSubTypeOptions,
  mcSubTypes,
  openEndedSubTypeOptions,
  types,
} from './question-types';
import QuestionEditLayout from './QuestionEditLayout';
import React from 'react';
import Reorder from './Reorder';
import MatchingPair from './MatchingPair';
import {
  quickMCChange,
  quickMCChangeFromText,
  quickMCs,
  quickMCSubTypeChange,
} from './mc/quick-mc-change';
import skillsAutoComplete from 'components/admin/skill/schema/elements/skills-auto-complete';
import { isQuestionUsedForSurvey } from 'components/admin/node/utils';
import { remove, removeMultiple, shuffleArray } from 'common/utils/Array';
import get from 'lodash.get';
import QuestionMCEditLayout from './QuestionMCEditLayout';
import { checkConditionToShowQuestionFieldBaseOnTemplateType } from '../utils';
import questionApiUrls from 'components/admin/question/endpoints';
import SelectImage from 'schema-form/elements/select-image';
import InputFile from 'schema-form/elements/input-file';
import Attachments from 'schema-form/elements/attachments';
import InputToken from 'schema-form/elements/input-token';
import MultipleChoice from 'schema-form/elements/multiple-choice/MultipleChoice';
import VideoSchema from 'components/admin/video/schema/video-schema';
import structureAnswerSchema, {
  structureAnswerDefault,
} from './structureAnswerSchema';
import RTE from 'schema-form/elements/richtext';
import { convertBooleanValueToInt } from '../../../../common/normalizers';

const onPassingSchemeValueChange = (formid, passingScheme, values) => {
  const conf =
    (store.getState().domainInfo && store.getState().domainInfo.conf) || {};
  const defaultPassingScore = conf.default_question_passing_score || 100;
  if (passingScheme === questionPassingScheme.AVERAGE_QUESTION_SCORE) {
    store.dispatch(change(formid, 'passing_scheme_data', defaultPassingScore));
  }
};

const defaultContent = (type) => {
  switch (type) {
    case types.TYPE_INLINE:
      return 'where [are,is] you? What __is/was__ it?';
    // break;
    default:
      return '';
  }
};

const getDefaultQuestionTemplate = (tplType, mcSubType) => {
  if (
    mcSubType === mcSubTypes.MMC &&
    mmcTemplateTypes.indexOf(tplType) === -1
  ) {
    return questionTemplateTypes.MMC_ANSWER_TEXT;
  }

  return tplType;
};

const schema = (formid, values, step, xpath, props, domainInfo) => {
  // const schema = (formid, values) => {
  const questionDisplayTemplates = questionDisplayTemplateOptions();
  const subTypeOptions =
    get(values, 'type') === types.TYPE_OPEN_ENDED
      ? openEndedSubTypeOptions()
      : mcSubTypeOptions(values);

  return {
    type: {
      type: 'select',
      fullWidth: true,
      options: 'async',
      floatingLabelText: t1('type'),
      paramsasync: {
        key: `question_types_used_for_${values.used_for}`,
        __url__: questionApiUrls.get_question_types,
        value: {
          used_for: values.used_for,
        },
      },
    },
    positions: positions(formid, {}, values.organizations),
    organizations: organizations({
      formid,
      label: t1('organizations'),
      hintText: t1('organizations'),
      defaultValue: props.orgIids,
      classWrapper: 'display-none',
    }),
    skills: skillsAutoComplete('skill', {
      text: 'key',
      value: 'data',
      transformData: 'name',
    }),
    difficulty: {
      type: 'select',
      fullWidth: true,
      floatingLabelText: t1('difficulty'),
      options: Object.values(difficulties).map((val) => ({
        primaryText: t1(val),
        label: t1(val),
        value: val,
      })),
    },
    tags: {
      type: InputToken,
      floatingLabelText: t1('tags'),
      fullWidth: true,
    },
    import_tags: {
      type: InputToken,
      floatingLabelText: t1('import_tags'),
      fullWidth: true,
      readOnly: true,
    },
    used_for: {
      type: 'multiCheckbox',
      floatingLabelText: t1('used_for'),
      options: UsedForOptions(),
      inline: true,
    },
    feedback_true: {
      type: 'text',
      floatingLabelText: t1('message_when_answer_is_correct'),
      floatingLabelFixed: false,
      defaultValue: '',
      fullWidth: true,
    },
    feedback_false: {
      type: 'text',
      floatingLabelText: t1('message_when_answer_is_wrong'),
      floatingLabelFixed: false,
      defaultValue: '',
      fullWidth: true,
    },
    avatar: {
      type: InputFile,
      hintText: t1('image'),
      floatingLabelText: t1('question_image'),
      defaultValue: '',
      fullWidth: true,
      accept: 'image/*',
      fileType: 'image',
      preview: '1',
      defaultImageStyle: '20px',
      imageStyle: '100px',
    },
    audio: {
      type: Attachments,
      label: t1('add_audios'),
      allowDownload: true,
      rootFolder: 'public',
      folder: 'file-answer',
      disabled: false,
      accept: 'audio/*',
      normalize: (attachments) =>
        (Array.isArray(attachments) &&
          attachments.map(
            (att) =>
              att && {
                ...att,
                path: att.link || att.path,
              },
          )) ||
        '',
      format: (attachments) => attachments,
    },
    vid: {
      type: 'youtubeUrl',
      hintText: t1('youtube_video_id'),
      floatingLabelText: t1('youtube_video_id'),
      defaultValue: '',
      fullWidth: true,
    },
    videos: {
      type: 'cascade',
      schema: VideoSchema,
      formid,
    },
    acs: {
      type: 'checkbox',
      label: t1('answers_are_japanese_input'),
      defaultValue: 1,
    },
    name: {
      type: 'text',
      floatingLabelText: t1('name'),
      floatingLabelFixed: false,
      fullWidth: true,
      validate: [required(t1('name_cannot_be_empty'))],
    },
    phonetic: {
      type: 'text',
      floatingLabelText: t1('phonetic'),
      floatingLabelFixed: false,
      fullWidth: true,
    },
    content: {
      type: RTE,
      hintText:
        values.type === types.TYPE_INLINE
          ? t1('question_content_(use_/_to_add_multiple_answers)')
          : t1('content'),
      floatingLabelText:
        values.type === types.TYPE_INLINE
          ? t1('question_content_(use_/_to_add_multiple_answers)')
          : t1('content'),
      defaultValue: defaultContent(values.type),
      errorText: '',
      multiLine: true,
      rows: 4,
      fullWidth: true,
    },
    answers: {
      type: InputToken,
      floatingLabelText: t1('answers'),
      fullWidth: true,
      // validate: [required(t1('answers_cannot_be_empty'))],
    },
    answers2: {
      type: 'cascade',
      component: MultipleChoice,
      displayFields: (() => {
        let res = [
          'is_answer',
          'value',
          'text',
          'short_text',
          'avatar',
          'audio',
          'is_open_ended_answer',
          'description',
        ];
        if (
          !checkConditionToShowQuestionFieldBaseOnTemplateType(
            'text',
            values.tpl_type,
            'answer',
          )
        ) {
          res = remove(res, 'text');
        }
        if (
          !checkConditionToShowQuestionFieldBaseOnTemplateType(
            'avatar',
            values.tpl_type,
            'answer',
          )
        ) {
          res = remove(res, 'avatar');
        }
        if (
          !checkConditionToShowQuestionFieldBaseOnTemplateType(
            'audio',
            values.tpl_type,
            'answer',
          )
        ) {
          res = remove(res, 'audio');
        }
        if (isQuestionUsedForSurvey(values, true, false)) {
          res = remove(res, 'is_answer');
        }
        if (values.type != types.TYPE_MC_OPEN_ENDED) {
          res = removeMultiple(res, [
            'short_text',
            'is_open_ended_answer',
            'description',
          ]);
        }
        if (String(values.type) === String(types.TYPE_NUMBER)) {
          res = removeMultiple(res, ['avatar', 'audio']);
        } else {
          res = removeMultiple(res, ['value']);
        }
        return res;
      })(),
      isMultiSelectable: values && mmcTemplateTypes.includes(values.tpl_type),
      // name: 'answer',
      form: formid || 'question_new',
      validate: [required(t1('answers_cannot_be_empty'))],
      defaultValue: [
        {
          text: '',
          is_answer: true,
        },
        {
          text: '',
          is_answer: false,
        },
        {
          text: '',
          is_answer: false,
        },
      ],
    },
    reorder_fields: {
      type: 'cascade',
      component: <Reorder formid={formid} />,
    },
    reorders: {
      type: 'hidden',
    },
    matching_pair_fields: {
      type: 'cascade',
      component: <MatchingPair formid={formid} />,
    },
    l_pair: { type: 'hidden' },
    r_pair: { type: 'hidden' },
    sub_type: {
      type: 'radio',
      hintText: t1('multiple_choice_sub_types'),
      floatingLabelText: t1('choose_a_sub_type'),
      defaultValue: get(subTypeOptions, '0.value'),
      options: subTypeOptions,
      inline: true,
      onChange:
        get(values, 'type') === types.TYPE_OPEN_ENDED
          ? null
          : (event, value) =>
              quickMCSubTypeChange(
                formid,
                value,
                values.tpl_type,
                store.dispatch,
              ),
    },
    tpl_type: {
      type: SelectImage,
      valueKey: 'value',
      floatingLabelText: t1('choose_template_question'),
      floatingLabelFixed: true,
      options: questionTemplateTypesOptions(values.sub_type, values.type),
      fullWidth: true,
      validate: [required(t1('template_cannot_be_empty'))],
    },
    wordmin: {
      type: 'number',
      floatingLabelText: t1('minimum_number_of_words_for_the_answer'),
      fullWidth: true,
    },
    wordmax: {
      type: 'number',
      floatingLabelText: t1('maximum_number_of_words_for_the_answer'),
      fullWidth: true,
    },
    structure_answer: {
      type: 'array',
      schema: structureAnswerSchema(get(values, 'rubric_marking.0.iid')),
      defaultValue: structureAnswerDefault,
      floatingLabelText: t1('structure_to_answer'),
    },
    sp1_layout: {
      type: 'radio',
      hintText: t1('question_structured_answer_menu_position'),
      floatingLabelText: t1('question_structured_answer_menu_position'),
      defaultValue: 0,
      options: [
        {
          value: 0,
          label: t1('inside_question_area'),
        },
        {
          value: 1,
          label: t1('inside_course_navigation'),
        },
        {
          value: 2,
          label: t1('right_hand_side_and_inside_timer'),
        },
      ],
      inline: true,
    },
    rubric_marking: skillsAutoComplete(
      'skill',
      {
        text: 'name',
        value: 'value',
        transformData: (skills) => {
          if (!Array.isArray(skills) || !skills.length) {
            return [];
          }
          return skills.map((skill) => {
            return {
              name: skill.name,
              value: {
                id: skill.id,
                iid: skill.iid,
                name: skill.name,
                ntype: skill.ntype,
              },
            };
          });
        },
      },
      {
        limit: 1,
        floatingLabelText: t1('choose_rubric_marking'),
      },
    ),
    accept_files: {
      type: 'multiCheckbox',
      floatingLabelText: t1('accept_file_apply_upload'),
      errorText: t1('loading_accept_file_apply_list_from_server'),
      options: 'async',
      fullWidth: true,
    },
    saw_training_package: {
      type: InputToken,
      hintText: t('SAW_training_packages_(press_enter_to_add_new_package)'),
      // floatingLabelText: 'alert message when answer is correct',
      defaultValue: [],
      fullWidth: true,
    },
    quick_options: {
      type: 'radio',
      hintText: t1('quick_mc_options'),
      floatingLabelText: t1('choose_a_mc_question_type'),
      defaultValue: '1-4.ratings',
      options: quickMCs(values),
      className: 'quick-mc-options', // TODO: this is now styled in layouts/admin/css/stylesheet.css. move it
      inline: true,
      onChange: (event, value) => quickMCChange(formid, value, store.dispatch),
    },
    quick_text_options: {
      type: 'text',
      hintText: t1('quick_mc_options_from_text'),
      floatingLabelText: t1('quick_mc_options_from_text'),
      defaultValue: 'A,B,C,D',
      multiLine: true,
      inline: true,
      fullWidth: 1,
      onChange: (event, value) =>
        quickMCChangeFromText(formid, values, value, store.dispatch),
    },

    passing_scheme: {
      type: 'select',
      floatingLabelText: t1('passing_scheme'),
      floatingLabelFixed: true,
      options: constants.questionPassingSchemeOptions(),
      fullWidth: true,
      defaultValue: questionPassingScheme.AVERAGE_QUESTION_SCORE,
      onChange: (event, value) =>
        onPassingSchemeValueChange(formid, value, values),
    },
    passing_scheme_data: {
      type: 'number',
      step: 0.01,
      min: 0,
      max: 100,
      validate:
        values && values.type === types.TYPE_INTRODUCTION
          ? null
          : [
              required(t1('value_is_required')),
              inRange(0, 100, t1('value_must_be_between_%s_and_%s', [0, 100])),
            ],
      floatingLabelText: t1('passing_score'),
      floatingLabelFixed: true,
      fullWidth: true,
    },
    shufflable: {
      type: 'checkbox',
      label: t1('answers_are_shufflable'),
    },
    reorder_type: {
      type: 'select',
      fullWidth: true,
      floatingLabelText: t1('type'),
      defaultValue: reorderTypes.COMPLEX,
      options: reorderTypeOptions(),
      validate:
        values.type === types.TYPE_REORDER
          ? [required(t1('type_is_required'))]
          : null,
    },
    number_question_type: {
      type: 'select',
      fullWidth: true,
      floatingLabelText: t1('type'),
      defaultValue: numberQuestionTypes.NUMBER_QUESTION_TYPE_RADIO,
      options: numberQuestionTypeOptions(),
      validate:
        values.type === types.TYPE_NUMBER
          ? [required(t1('type_is_required'))]
          : null,
    },
    display_template: {
      type: SelectImage,
      valueKey: 'value',
      floatingLabelText: t1('display_template'),
      floatingLabelFixed: true,
      options: questionDisplayTemplates,
      fullWidth: true,
      defaultValue: 'default',
    },
    check_answer: {
      type: 'checkbox',
      label: t1('check_answer_with_google'),
      defaultValue: 1,
      normalize: convertBooleanValueToInt,
      fullWidth: true,
      className: 'm-t-10',
    },
  };
};

const getFieldsGroupPassingScheme = (values) => {
  let results = ['passing_scheme'];
  if (values && values.passing_scheme) {
    results = results.concat(['passing_scheme_data']);
  }
  return results;
};

const uiForEditScoreAndPassingStep = (values) => {
  const fieldsGroupPassingScheme = getFieldsGroupPassingScheme(values);
  const groups = {
    passing_scheme: {
      id: 'passing_scheme',
      fields: fieldsGroupPassingScheme,
      title: t1('passing_scheme'),
    },
  };

  let returnedSchema = [];
  if (values.type !== types.TYPE_INTRODUCTION) {
    returnedSchema = returnedSchema.concat([groups.passing_scheme]);
  }
  return returnedSchema;
};

const uiForGeneralSteps = (step, values, themeConfig, xpath, formid, props) => {
  const questionType = get(values, 'type');

  let fieldsGroupContent =
    questionType === types.TYPE_SPEAKING
      ? ['content', 'phonetic']
      : ['content'];

  if ([types.TYPE_MC, types.TYPE_MC_OPEN_ENDED].includes(questionType)) {
    fieldsGroupContent = [
      'sub_type',
      'tpl_type',
      ...(checkConditionToShowQuestionFieldBaseOnTemplateType(
        'content',
        values.tpl_type,
        'display',
      )
        ? ['content']
        : []),
    ];
  } else if (questionType === types.TYPE_REORDER) {
    fieldsGroupContent = ['reorder_type', 'content'];
  } else if (questionType === types.TYPE_NUMBER) {
    fieldsGroupContent = ['number_question_type', 'content'];
  }

  if (step === 'new') {
    fieldsGroupContent = ['type'].concat(fieldsGroupContent);
  }

  const fieldsGroupMedia =
    questionType === types.TYPE_OPEN_ENDED
      ? ['accept_files']
      : [
          ...(checkConditionToShowQuestionFieldBaseOnTemplateType(
            'avatar',
            values.tpl_type,
            'display',
          )
            ? ['avatar']
            : []),
          [types.TYPE_WRITING, types.TYPE_SPEAKING].includes(questionType)
            ? 'videos'
            : 'vid',
          ...(checkConditionToShowQuestionFieldBaseOnTemplateType(
            'audio',
            values.tpl_type,
            'display',
          )
            ? ['audio']
            : []),
        ];

  let fieldsGroupAdditional = [];
  switch (values.type) {
    case types.TYPE_OPEN_ENDED: {
      fieldsGroupAdditional =
        !values.sub_type || values.sub_type === 'normal'
          ? ['sub_type', 'wordmin', 'wordmax']
          : ['sub_type', 'sp1_layout', 'rubric_marking', 'structure_answer'];
      break;
    }
    case types.TYPE_INLINE: {
      fieldsGroupAdditional = ['acs'];
      break;
    }
    default: {
      fieldsGroupAdditional = [];
    }
  }

  const fieldsGroupAnswer = [types.TYPE_SPEAKING, types.TYPE_WRITING].includes(
    questionType,
  )
    ? [
        'answers',
        ...(questionType === types.TYPE_WRITING ? ['check_answer'] : []),
      ]
    : [];

  const groups = {
    media: {
      id: 'media',
      fields: fieldsGroupMedia,
      title: t1('media'),
    },
    feedback: {
      id: 'feedback',
      fields: ['feedback_true', 'feedback_false'],
      title: t1('More_Settings_(feedback)'),
    },
    content: {
      id: 'content',
      fields: fieldsGroupContent,
      title: t1('question_content'),
    },
    answer: {
      id: 'answer',
      fields: fieldsGroupAnswer,
      title: t1('question_answer'),
    },
    additional: {
      id: 'additional',
      fields: fieldsGroupAdditional,
      title: t1('additional_info'),
    },
    categorize_information: {
      id: 'categorize_information',
      fields: [
        'tags',
        'organizations',
        // 'positions',
        'skills',
        ...(isQuestionUsedForSurvey(values, true, false) ? [] : ['difficulty']),
        ...(step === 'edit' ? ['import_tags', 'used_for'] : []),
      ],
      title: t1('categorize_information'),
    },
  };

  let result;
  switch (values.type) {
    case types.TYPE_MC:
    case types.TYPE_MC_OPEN_ENDED:
      result = [
        groups.content,
        // groups.additional,
        {
          fields: [
            'quick_options',
            'quick_text_options',
            ...(isQuestionUsedForSurvey(values, true, false)
              ? []
              : ['shufflable']),
            'answers2',
          ],
          title: t2('multiple_options'),
        },
        groups.media,
        groups.feedback,
        groups.categorize_information,
      ];
      break;

    case types.TYPE_INLINE:
      result = [
        groups.content,
        groups.additional,
        groups.media,
        groups.feedback,
        groups.categorize_information,
      ];
      break;
    case types.TYPE_OPEN_ENDED:
      result = get(props, 'surveyQuestion')
        ? [groups.content]
        : [
            groups.content,
            groups.additional,
            groups.media,
            groups.categorize_information,
          ];
      break;
    case types.TYPE_API:
      result = [groups.content, groups.categorize_information];
      break;
    case types.TYPE_REORDER:
      result = [
        groups.content,
        {
          title: t2('answers'),
          fields: ['reorder_fields', 'reorders'],
        },
        groups.media,
        groups.categorize_information,
      ];
      break;
    case types.TYPE_MATCHING_PAIRS:
      result = [
        groups.content,
        {
          title: t2('answers'),
          fields: ['matching_pair_fields', 'l_pair', 'r_pair'],
        },
        groups.media,
        groups.categorize_information,
      ];
      break;
    case types.TYPE_NUMBER:
      result = [
        groups.content,
        ...(values.number_question_type ===
        numberQuestionTypes.NUMBER_QUESTION_TYPE_RADIO
          ? [
              {
                fields: [
                  'quick_options',
                  'quick_text_options',
                  ...(isQuestionUsedForSurvey(values, true, false)
                    ? []
                    : ['shufflable']),
                  'answers2',
                ],
                title: t2('multiple_options'),
              },
            ]
          : []),
        groups.media,
        groups.categorize_information,
      ];
      break;
    case types.TYPE_WRITING:
    case types.TYPE_SPEAKING: {
      result = [
        groups.content,
        groups.answer,
        groups.media,
        groups.categorize_information,
      ];
      break;
    }
    default:
      result = [groups.content, groups.media, groups.categorize_information];
      break;
  }

  if (isQuestionUsedForSurvey(values, true, false)) {
    result = remove(result, groups.feedback);
  }

  if (![types.TYPE_SPEAKING, types.TYPE_WRITING].includes(questionType)) {
    result.push({
      id: 'display_template',
      title: t1('display_template'),
      fields: ['display_template'],
    });
  }

  return result.filter(
    (gr) => gr && Array.isArray(gr.fields) && gr.fields.length > 0,
  );
};

const ui = (step, values, themeConfig, xpath, formid, props) => {
  if (step === 'edit_score_passing') {
    return uiForEditScoreAndPassingStep(values);
  }
  return uiForGeneralSteps(step, values, themeConfig, xpath, formid, props);
};

const layout = (step, values, themeConfig, xpath, formid, props) => {
  const questionType = get(values, 'type');
  if ([types.TYPE_MC, types.TYPE_MC_OPEN_ENDED].includes(questionType)) {
    return { component: QuestionMCEditLayout, freestyle: 1 };
  }

  return { new: QuestionEditLayout };
};

const finalProcessBeforeSubmit = (fullData, node, schema, mode, step) => {
  if (step === 'new' || step === 'edit' || step === '') {
    const type = node.type || fullData.type;
    if (type && type === types.TYPE_INLINE) {
      const content = fullData.content;
      const parsed = content && parseInlineQuestionRawText(content);
      if (parsed && parsed.correctAnswersAsArray) {
        fullData = Object.assign({}, fullData, {
          answers: parsed.correctAnswersAsArray,
        });
      }
    }
  }

  if (
    fullData.skills &&
    Array.isArray(fullData.skills) &&
    fullData.skills.length > 0
  ) {
    fullData = {
      ...fullData,
      skills: fullData.skills.map((skill) =>
        typeof skill === 'object' ? skill.iid : skill,
      ),
    };
  }

  return fullData;
};

const question = {
  schema,
  ui,
  layout,
  finalProcessBeforeSubmit,
};

export default question;
