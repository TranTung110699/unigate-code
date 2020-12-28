import { required } from 'common/validators';
import { t1 } from 'translate';
import { positions } from 'components/admin/job-position/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import exerciseSchema from './exercise/form';
import { slugifier } from 'common/normalizers';
import skillsAutoComplete from 'components/admin/skill/schema/elements/skills-auto-complete';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import apiUrls from 'components/admin/question-bank/endpoints';

const schema = (formid, values, step, xpath, props) => ({
  positions: positions(formid, {}, values.organizations),
  organizations: organizations({
    formid,
    multiple: false,
    label: `${t1('managing_organizations')} (*)`,
    defaultValue: props.orgIids,
    validate: [required()],
  }),
  name: {
    type: 'text',
    floatingLabelText: t1('exam_template_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [
      required(t1("exam_template_name_is_required_and_can't_be_empty")),
    ],
  },
  code: {
    type: 'text',
    floatingLabelText: t1('code'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    normalize: slugifier,
    validate: [required(t1("code_is_required_and_can't_be_empty"))],
  },
  // exercise_number: {
  //   type: 'number',
  //   floatingLabelText: t1('exercise'),
  // },
  // score: {
  //   type: 'number',
  //   floatingLabelText: t1('score'),
  // },
  skills: skillsAutoComplete('skill', {
    text: 'name',
    value: 'data',
    transformData: (res) =>
      res.map((data) => ({
        name: data.name,
        data,
      })),
  }),
  nr_of_exam_questions: {
    type: 'number',
    classWrapper: 'col-md-4',
    floatingLabelText: t1('total_question_nr'),
    defaultValue: '',
    fullWidth: true,
    // validate: [required(t1("code_is_required_and_can't_be_empty"))],
    // readOnly: true,
  },
  total_exam_score: {
    type: 'number',
    classWrapper: 'col-md-4',
    floatingLabelText: t1('total_exam_score'),
    defaultValue: 100,
    fullWidth: true,
    // validate: [required(t1("code_is_required_and_can't_be_empty"))],
    // readOnly: true,
  },
  passing_score: {
    type: 'number',
    classWrapper: 'col-md-4',
    floatingLabelText: t1('score_considered_as_pass'),
    defaultValue: 80,
    fullWidth: true,
    // validate: [required(t1("code_is_required_and_can't_be_empty"))],
    // readOnly: true,
  },
  exercise_templates: {
    type: 'array',
    floatingLabelText: t1('parts_for_exam_template'),
    addButtonLabel: t1('add_another_exam_part'),
    schema: exerciseSchema(props.categoryMappingWithTheSkills),
  },
  question_banks: {
    type: InputAutoComplete,
    nameElement: 'question_banks',
    baseUrl: apiUrls.search,
    fieldSearch: 'name',
    params: {
      status: ['approved'],
    },
    dataSourceConfig: {
      text: 'name',
      value: 'iid',
      transformData: (res) =>
        res.map(({ iid, name, code }) => ({
          iid,
          name: `${name} - (#${code})`,
        })),
    },
    floatingLabelText: t1('question_banks'),
    fullWidth: true,
  },
});

const ui = (step, values, themeConfig) => {
  let fields = [
    'name',
    // 'code',
    'organizations',
    'positions',
    'skills',
  ];

  switch (step) {
    case 'new': {
      return [
        {
          id: 'default',
          fields,
        },
      ];
    }
    case 'edit_info': {
      return [
        {
          id: 'edit_info',
          title: t1('edit_exam_template'),
          fields,
        },
      ];
    }
    case 'edit_question_banks': {
      return [
        {
          id: 'edit_question_banks',
          title: t1('edit_question_banks'),
          fields: ['question_banks'],
        },
      ];
    }
    default: {
      return [
        {
          id: 'exercise_templates',
          fields: [
            'nr_of_exam_questions',
            'total_exam_score',
            'passing_score',
            'exercise_templates',
          ],
        },
      ];
    }
  }
};

export default { schema, ui };
