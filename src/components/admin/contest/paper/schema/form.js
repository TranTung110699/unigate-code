/**
 * Created by hungvo on 08/08/2017.
 */
import { required } from 'common/validators';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import { convertBooleanValueToInt } from 'common/normalizers';
import Toggle from 'schema-form/elements/toggle';

const schema = (formid, values, step, xpath, props) => ({
  number_of_original_sco_exams: {
    type: 'number',
    min: 0,
    max: lodashGet(props, 'node.number_of_original_sco_exams') || 20,
    floatingLabelText: t1('number_of_original_sco_exams'),
    fullWidth: true,
    validate: [required(t1('number_of_original_sco_exams_is_invalid'))],
  },
  count: {
    type: 'number',
    min: 1,
    defaultValue: 1,
    max: 10,
    floatingLabelText: t1('number_of_papers_to_create'),
    fullWidth: true,
    validate: [required(t1('number_of_papers_is_invalid'))],
  },
  generate_rule: {
    type: Toggle,
    label: {
      on: t1('remove_existing_exam_papers'),
      off: t1('remove_existing_exam_papers'),
    },
    dataSet: {
      on: 'replace',
      off: 'new',
    },
    labelPosition: 'right',
  },
  random_exercise: {
    type: 'checkbox',
    label: t1('randomize_exercise_order'),
    fullWidth: true,
  },
  randomize_answers_in_question: {
    type: 'checkbox',
    label: t1('randomize_answers_in_question'),
    defaultValue: 1,
    fullWidth: true,
    normalize: convertBooleanValueToInt,
  },
  get_exercise_from_other_scos: {
    type: 'checkbox',
    label: t1('get_exercise_from_other_scos'),
    fullWidth: true,
  },
  get_questions_from_other_exercises: {
    type: 'checkbox',
    label: t1('get_questions_from_other_exercises_in_other_exam_scos'),
    fullWidth: true,
  },
  shuffle_questions: {
    type: 'checkbox',
    label: t1('shuffle_questions(only_use_if_questions_dont_go_in_groups)'),
    fullWidth: true,
  },
});

const ui = (step, values, themeConfig, xpath, formid, props) => {
  return [
    // mode_step
    {
      id: 'default',
      title: `${t1('generate_the_actual_exam_papers')} (${t1(
        'this_will_clear_the_other_exam_papers',
      )})`,
      fields: [
        // 'number_of_original_sco_exams',
        'count',
        'generate_rule',
        // 'random_exercise',
        'randomize_answers_in_question',
        // 'get_exercise_from_other_scos',
        // 'get_questions_from_other_exercises',
        // 'shuffle_questions',
        // if we wanna get questions from other exercises, we wanna decide if we want to get all groups at once
        // or individual questions
        // ...(values.get_questions_from_other_exercises ? ['shuffle_questions'] : []),
      ],
    },
  ];
};

const layout = {};

export default { schema, ui, layout };
