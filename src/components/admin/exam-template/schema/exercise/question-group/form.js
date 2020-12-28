import { t1 } from 'translate';
import store from 'store';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

import { change } from 'redux-form';
import { inRange, required } from 'common/validators';
import endpoints from 'api-endpoints';
import questionApiUrls from 'components/admin/question/endpoints';
import examTemplateApiUrls from 'components/admin/exam-template/endpoints';
import get from 'lodash.get';
import { difficulties, UsedFor } from 'configs/constants';
import Layout from './Layout';
import { newExamTemplateFormId } from 'components/admin/exam-template/new/Form';
import { organizations } from 'components/admin/organization/schema/elements';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import { tplGroupContainsIntro } from 'components/admin/exam-template/utils';
import { convertBooleanValueToInt } from 'common/normalizers';

const deleteHtmlTags = (data) => {
  if (!data) {
    return '';
  }
  const regex = /(<([^>]+)>)/gi;
  return data.replace(regex, '');
};

const validateScore = (value, values, xpath) => {
  if (!value) {
    return t1("score_is_required_and_can't_be_empty");
  }

  if (!values) {
    return;
  }

  const regex = /\d+/g;
  let number;
  const position = [];
  while ((number = regex.exec(xpath)) != null) {
    position.push(parseInt(number[0]));
  }

  if (!position || position.length === 0) {
    return;
  }

  const exerciseTemplates = values.exercise_templates;
  if (!exerciseTemplates || exerciseTemplates.length === 0) {
    return;
  }

  const exercise = exerciseTemplates[position[0]];
  const group = exercise.groups[position[1]];
  if (!group) {
    return;
  }

  let totalScore = 0;
  const exerciseScore = exercise.score ? parseInt(exercise.score) : 0;
  if (!exerciseScore) {
    return t1('please_input_score_of_exercise');
  }

  const groups = exercise.groups;
  groups.map((group, index) => {
    if (index === position[1]) {
      totalScore += value ? parseInt(value) : 0;
    } else {
      totalScore += group.score ? parseInt(group.score) : 0;
    }
  });

  if (totalScore > exerciseScore) {
    return t1('your_score_cannot_be_greather_than_total_score_of_exam_part');
  }
};

const updateExamTotalNrOfQuestions = (formid, values, value, xpath) => {
  let total;
  const OneExerciseReducer = (accumulator, gr) =>
    gr.nr_of_questions
      ? accumulator + parseInt(gr.nr_of_questions)
      : accumulator;

  const reducer = (acc, oneExercise) => {
    if (oneExercise.groups && oneExercise.groups.length) {
      return acc + parseInt(oneExercise.groups.reduce(OneExerciseReducer, 0));
    } else if (oneExercise.nr_of_exercise_questions) {
      return acc + parseInt(oneExercise.nr_of_exercise_questions);
    } else {
      return acc;
    }
  };

  if (values.exercise_templates && values.exercise_templates.length) {
    total = values.exercise_templates.reduce(reducer, 0);
    store.dispatch(change(formid, 'nr_of_exam_questions', total));
  }
};

const introTypes = [questionTypes.TYPE_INTRODUCTION];
const mcTypes = [questionTypes.TYPE_MC];

const introQuestionWillExcludeOtherTypes = (value) => {
  if (tplGroupContainsIntro(value)) return introTypes;

  return value;
};

const schema = (formid, values, step, xpath, props) => ({
  nr_of_questions: {
    type: 'number',
    floatingLabelText: t1('nr_of_questions'),
    validate: [
      inRange(
        1,
        100,
        t1('number_of_rounds_cannot_be_negative_or_greater_than_100'),
      ),
    ],
    fullWidth: true,
    // onChange: (event, value) => {
    //   updateExamTotalNrOfQuestions(formid, values, value, xpath);
    // },
  },
  question_type: {
    type: 'select',
    name: 'question_type',
    fullWidth: true,
    floatingLabelText: t1('question_type'),
    floatingLabelFixed: true,
    options: 'async',
    paramsasync: {
      __url__: questionApiUrls.get_question_types,
      value: {
        used_for: [UsedFor.EXAM],
      },
    },
    validate: [required(t1('question_type_must_be_not_empty'))],
    multiple: true,
    normalize: introQuestionWillExcludeOtherTypes,
    defaultValue: mcTypes,
  },
  skills: {
    type: 'select',
    multiple: true,
    fullWidth: true,
    floatingLabelText: t1('choose_skills'),
    floatingLabelFixed: true,
    options: 'async',
    paramsasync: {
      __url__: endpoints.bank_search,
      value: {
        ntype: 'skill',
        subType: 'skill',
        status: 'approved',
      },
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }
        return data.map((option) => {
          return {
            value: option.iid,
            label: option.name,
            primaryText: option.name,
          };
        });
      },
    },
  },
  categories: {
    type: 'select',
    multiple: true,
    fullWidth: true,
    floatingLabelText: t1('choose_categories'),
    floatingLabelFixed: true,
    options: 'async',
    paramsasync: {
      __url__: examTemplateApiUrls.get_categories_of_questions_in_exam_template,
      value: {
        exam_template: values.iid,
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
  levels: {
    type: 'select',
    multiple: true,
    fullWidth: true,
    floatingLabelText: t1('choose_levels'),
    floatingLabelFixed: true,
    options: 'async',
    paramsasync: {
      __url__: examTemplateApiUrls.get_levels_of_questions_in_exam_template,
      value: {
        exam_template: values.iid,
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
  question_iid: {
    nameElement: 'question',
    type: InputAutoComplete,
    baseUrl: endpoints.bank_search,
    floatingLabelText: t1('choose_question'),
    fullWidth: true,
    dataSourceConfig: {
      text: 'name',
      value: 'id',
      transformData: (res) =>
        res.map((data) => ({
          name: deleteHtmlTags(data.content),
          id: data.id,
        })),
    },
    params: {
      ntype: 'question',
      subType: questionTypes.TYPE_INTRODUCTION,
    },
  },
  score: {
    type: 'number',
    floatingLabelText: t1('total_score'),
    validate: [(value, values) => validateScore(value, values, xpath)],
    fullWidth: true,
  },
  // positions: positions(newExamTemplateFormId, {}, values.organizations),
  organizations: organizations({ formid: newExamTemplateFormId }),
  difficulty: {
    type: 'select',
    fullWidth: true,
    floatingLabelText: t1('difficulty'),
    floatingLabelFixed: true,
    options: [
      {
        primaryText: '---',
        label: '---',
        value: '',
      },
      ...Object.values(difficulties).map((val) => ({
        primaryText: t1(val),
        label: t1(val),
        value: val,
      })),
    ],
    // validate: [required(t1('difficulties_type_must_be_not_empty'))],
  },
  display_by_group: {
    type: 'checkbox',
    defaultValue: 1,
    label: t1('tpl_display_by_group'),
    normalize: convertBooleanValueToInt,
  },
});

const getFieldsWithCategoryMappingWithTheSkills = (
  categoryMappingWithTheSkills,
) => {
  return [
    !categoryMappingWithTheSkills && 'categories',
    !categoryMappingWithTheSkills && 'levels',
    categoryMappingWithTheSkills && 'skills',
  ].filter(Boolean);
};

const ui = ({ values, xpath, categoryMappingWithTheSkills }) => {
  let fields = ['question_type'];
  const tmp = get(values, xpath);

  if (tmp && !tplGroupContainsIntro(tmp.question_type)) {
    fields = fields.concat(
      [
        'nr_of_questions',
        // 'positions',
        // 'organizations',
        'difficulty',
        'score',
        'display_by_group',
      ].filter(Boolean),
      getFieldsWithCategoryMappingWithTheSkills(categoryMappingWithTheSkills),
    );
  } else {
    fields = fields.concat(['question_iid']);
  }
  return [
    {
      id: 'groups',
      fields,
    },
  ];
};

const getLayout = (categoryMappingWithTheSkills) => ({
  component: Layout,
  freestyle: 1,
  optionsProperties: {
    fields: getFieldsWithCategoryMappingWithTheSkills(
      categoryMappingWithTheSkills,
    ),
  },
});

export default (categoryMappingWithTheSkills = false) => ({
  schema,
  ui: (step, values, themeConfig, xpath) =>
    ui({ values, xpath, categoryMappingWithTheSkills }),
  layout: getLayout(categoryMappingWithTheSkills),
});
