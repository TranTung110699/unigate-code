import { t1 } from 'translate';
import { required } from 'common/validators';
import GroupTemp from './question-group/form';
// import { checkAddGroupsToExerciseInExamTemplateIsEnabled } from 'common/conf';

/**
 * Validate exercise score
 *
 * @param values
 * @param value
 */
const validateExerciseScore = (value, values) => {
  if (!value) {
    return t1("score_is_required_and_can't_be_empty");
  }

  if (!values) {
    return;
  }

  const exerciseTemplates = values.exercise_templates;
  if (!exerciseTemplates || exerciseTemplates.length === 0) {
    return;
  }

  let totalScore = 0;
  const examScore = values && values.total_exam_score;

  if (!examScore) {
    return t1('exam_score_can_not_be_empty');
  }

  exerciseTemplates.map((exerciseTemplate, index) => {
    totalScore += exerciseTemplate.score ? parseInt(exerciseTemplate.score) : 0;
  });

  if (totalScore > examScore) {
    return t1('your_score_cannot_be_greater_than_total_score_of_exam');
  }
};

const schema = (categoryMappingWithTheSkills) => ({
  name: {
    type: 'text',
    floatingLabelText: t1('exam_part_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    classWrapper: 'col-md-7',
    validate: [required(t1("name_is_required_and_can't_be_empty"))],
  },
  score: {
    type: 'number',
    classWrapper: 'col-md-2',
    floatingLabelText: t1('total_score'),
    validate: [
      required(t1("score_is_required_and_can't_be_empty")),
      validateExerciseScore,
    ],
    fullWidth: true,
  },
  minimum_required_part_score: {
    type: 'number',
    classWrapper: 'col-md-3',
    floatingLabelText: t1('minimum_required_score'),
    fullWidth: true,
  },
  // total_nr_of_weighted_questions: {
  //   type: 'number',
  //   floatingLabelText: t1('number_of_questions_with_weight'),
  // },

  // total_group: {
  //   type: 'number',
  //   floatingLabelText: t1('number_of_pages'),
  // },
  // total_question: {
  //   type: 'number',
  //   floatingLabelText: t1('total_question'),
  // },
  groups: {
    type: 'array',
    classWrapper: 'col-md-12',
    addButtonLabel: t1('add_question_group'),
    schema: GroupTemp(categoryMappingWithTheSkills),
  },
});

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  // const addGroupsToExerciseInExamTemplateIsEnabled = checkAddGroupsToExerciseInExamTemplateIsEnabled(
  //   domainInfo,
  // );

  return [
    {
      id: 'exercise',
      fields: [
        'name',
        'score',
        'minimum_required_part_score',
        'groups',
        //'total_nr_of_weighted_questions'
      ],
    },
  ];
};

// TODO if we use this, schema-form is not passing the values down correctly
export default (categoryMappingWithTheSkills) => ({
  schema: () => schema(categoryMappingWithTheSkills),
  ui,
});
// export default { schema, ui };
