import { t1 } from 'translate';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import SearchFormLayoutFreestyle from '../SearchFormLayoutFreestyle';

const displayFields = [
  'faculty',
  'major',
  'training_mode',
  'training_level',
  'ico',
];
const getKeysByFormsOfTraining = (formid, values, fields = []) => {
  let key = formid;
  fields.forEach((map) => {
    if (values && values[map] && values[map].length) {
      key = `${key}-${values[map].join()}`;
    }
  });

  return key;
};
const schema = (formid, values, step, xpath, props) => ({
  forms_of_training: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      floatingLabelText: t1('forms_of_training'),
      displayFields,
      notValidate: true,
      forSearch: true,
      multiple: true,
    }),
  },
  semester: {
    type: 'select',
    floatingLabelText: t1('semester'),
    floatingLabelFixed: true,
    options: 'async',
    paramsasync: {
      __url__: '/semester/api/get-list-by-forms-of-training',
      key: getKeysByFormsOfTraining(`${formid}-semesters`, values, [
        'major',
        'training_mode',
        'training_level',
        'ico',
      ]),
      value: {
        major: values.major,
        training_mode: values.training_mode,
        training_level: values.training_level,
        ico: values.ico,
      },
      valueKey: 'iid',
    },
    fullWidth: true,
    multiple: true,
  },
  credit_syllabus: {
    type: 'select',
    floatingLabelText: t1('subjects'),
    floatingLabelFixed: true,
    options: 'async',
    paramsasync: {
      __url__: '/syllabus/api/get-list-by-forms-of-training',
      key: getKeysByFormsOfTraining(`${formid}-subjects`, values, [
        'major',
        'training_mode',
        'training_level',
        'ico',
        'semesters',
      ]),
      value: {
        major: values.major,
        training_mode: values.training_mode,
        training_level: values.training_level,
        ico: values.ico,
        semester: values.semester,
      },
      valueKey: 'iid',
    },
    fullWidth: true,
    multiple: true,
  },
  exam_resit_nths: {
    type: 'select',
    fullWidth: true,
    multiple: true,
    floatingLabelText: t1('exam_resit_nths'),
    floatingLabelFixed: true,
    options: [...Array(values.maxNumberOfExamResit || 1).keys()].map((n) => ({
      value: n,
      primaryText: `${t1('exam_resit_nth_%s', [n + 1])}`,
    })),
  },
  status_in_course: {
    type: 'multiCheckbox',
    options: [
      {
        value: 'studying',
        label: t1('studying'),
        primaryText: t1('studying'),
      },
      {
        value: 'completed',
        label: t1('completed'),
        primaryText: t1('completed'),
      },
      {
        value: 'failed',
        label: t1('failed'),
        primaryText: t1('failed'),
      },
    ],
    defaultValue: ['studying', 'completed', 'failed'],
    inline: true,
    floatingLabelText: t1("student's_status_in_course"),
    floatingLabelFixed: false,
  },
  status_of_fee: {
    type: 'multiCheckbox',
    options: [
      {
        value: 'new',
        label: t1('new'),
        primaryText: t1('new'),
      },
      {
        value: 'paid',
        label: t1('paid'),
        primaryText: t1('paid'),
      },
      {
        value: 'postpone-deadline',
        label: t1('postpone-deadline'),
        primaryText: t1('postpone-deadline'),
      },
    ],
    inline: true,
    floatingLabelText: t1('status_of_fee'),
    floatingLabelFixed: false,
  },
  text: {
    type: 'text',
    hintText: t1('enter_name_or_code_or_iid'),
    floatingLabelText: t1('search_user'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
});

const ui = (step, values) => [
  {
    id: 'id',
    fields: [
      'forms_of_training',
      'semester',
      'exam_resit_nths',
      'credit_syllabus',
      'status_in_course',
      'text',
      'status_of_fee',
    ],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
