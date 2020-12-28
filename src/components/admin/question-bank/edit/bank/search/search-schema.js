/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import { difficulties } from 'configs/constants';
import skillsAutoComplete from '../../../../skill/schema/elements/skills-auto-complete';
import endpoints from '../../../../../../api-endpoints';
import questionBankApiUrls from 'components/admin/question-bank/endpoints';

const schema = (formid, values, step, xpath, props) => {
  return {
    content: {
      type: 'text',
      classWrapper: props.categoryMappingWithTheSkills
        ? 'col-md-4'
        : 'col-md-3',
      floatingLabelText: t1('query'),
      defaultValue: '',
      floatingLabelFixed: false,
      errorText: '',
      fullWidth: true,
    },
    tags: {
      type: 'select',
      multiple: true,
      fullWidth: true,
      classWrapper: 'col-md-3',
      floatingLabelText: t1('choose_categories'),
      floatingLabelFixed: true,
      options: 'async',
      paramsasync: {
        __url__:
          questionBankApiUrls.get_categories_of_questions_in_question_bank,
        value: {
          question_bank: values.question_bank,
        },
        transformData: (categories) => {
          if (!Array.isArray(categories) || !categories.length) {
            return [];
          }
          return categories.map((category) => {
            return {
              value: category,
              label: category,
              primaryText: category,
            };
          });
        },
      },
    },
    level: {
      type: 'select',
      multiple: true,
      fullWidth: true,
      classWrapper: 'col-md-3',
      floatingLabelText: t1('choose_levels'),
      floatingLabelFixed: true,
      options: 'async',
      paramsasync: {
        __url__: questionBankApiUrls.get_levels_of_questions_in_question_bank,
        value: {
          question_bank: values.question_bank,
        },
        transformData: (levels) => {
          if (!Array.isArray(levels) || !levels.length) {
            return [];
          }
          return levels.map((level) => {
            return {
              value: level,
              label: level,
              primaryText: level,
            };
          });
        },
      },
    },
    skills: skillsAutoComplete(
      'skill',
      {
        text: 'name',
        value: 'data',
        transformData: (res) =>
          res.map((data) => ({
            name: data.name,
            data: parseInt(data.iid),
          })),
      },
      {
        classWrapper: 'col-md-4',
      },
    ),
    difficulty: {
      type: 'multiCheckbox',
      fullWidth: true,
      classWrapper: props.categoryMappingWithTheSkills
        ? 'col-md-4'
        : 'col-md-3',
      floatingLabelText: t1('difficulty'),
      floatingLabelFixed: true,
      options: [
        ...Object.values(difficulties).map((val) => ({
          primaryText: t1(val),
          label: t1(val),
          value: val,
        })),
      ],
      inline: true,
      // validate: [required(t1('difficulties_type_must_be_not_empty'))],
    },
  };
};

const ui = (step, values, themeConfig, xpath, formid, props) => {
  return [
    {
      id: 'id1',
      fields: [
        'content',
        !props.categoryMappingWithTheSkills && 'tags',
        !props.categoryMappingWithTheSkills && 'level',
        props.categoryMappingWithTheSkills && 'skills',
        'difficulty',
      ].filter(Boolean),
    },
  ].filter(Boolean);
};

export default {
  schema,
  ui,
};
