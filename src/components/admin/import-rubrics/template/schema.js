import { t1 } from 'translate';
import { required } from 'common/validators';
import apiUrls from 'api-endpoints';
import lodashGet from 'lodash.get';
import Elements from 'components/common/elements';
import rubricSchema from './rubricSchema';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const { schoolYear, semester } = Elements;

const schema = (formid, values, type) => {
  if (type === 'by_rubrics') {
    return {
      test_rubrics: {
        type: 'array',
        classWrapper: 'col-md-12',
        schema: rubricSchema(['name', 'weight', 'children']),
        floatingLabelText: t1('test_rubrics'),
      },
      exam_rubrics: {
        type: 'array',
        classWrapper: 'col-md-12',
        schema: rubricSchema(['name', 'weight', 'children'], ['name']),
        hiddenAddButton: true,
        hiddenRemoveButton: true,
        floatingLabelText: t1('exam_rubrics'),
      },
    };
  }

  return {
    credit_syllabus: {
      nameElement: 'syllabus',
      type: InputAutoComplete,
      limit: 1,
      baseUrl: '/syllabus/my',
      floatingLabelText: t1('subject'),
      fullWidth: true,
      classWrapper: 'col-md-12',
      fieldSearch: 'name',
      dataSourceConfig: {
        text: 'name',
        value: 'code',
        transformData: (res) =>
          res.map((creditSyllabus) => ({
            name: `${creditSyllabus.name}-${creditSyllabus.code}`,
            code: creditSyllabus.code,
          })),
      },
      params: {
        status: ['approved'],
        items_per_page: -1,
        type: 'credit',
      },
      validate: [required(t1('subject_cannot_be_empty'))],
    },
    course: {
      type: 'select',
      classWrapper: 'col-md-12',
      floatingLabelText: t1('course'),
      options: 'async',
      fullWidth: true,
      hiddenWhenOptionEmpty: true,
      paramsasync: {
        __url__: '/course/my',
        key: `course-by-${values && values.credit_syllabus}-${values &&
          values.semester}`,
        value: {
          credit_syllabus: lodashGet(values, 'credit_syllabus.[0]'),
          semester: values && values.semester,
          items_per_page: -1,
        },
        transformData: (data) => {
          if (!Array.isArray(data) || !data.length) {
            return [];
          }

          return data.map((course) => {
            const label = `${course.name} (${course.code})`;
            return {
              value: course && course.code,
              label,
              primaryText: label,
            };
          });
        },
      },
    },
    school_year: schoolYear({
      formid,
      classWrapper: 'col-md-4',
    }),
    semester: semester({
      classWrapper: 'col-md-8',
      values,
      type: 'select',
      multiple: false,
      paramsasync: {
        valueKey: 'code',
      },
      validate: [required(t1('semester_cannot_be_empty'))],
    }),
    score_scale: {
      type: 'select',
      classWrapper: 'col-md-12',
      hiddenWhenOptionEmpty: true,
      floatingLabelText: t1('score_scale'),
      options: 'async',
      paramsasync: {
        __url__: apiUrls.get_all_score_scale,
      },
      fullWidth: true,
      inline: true,
      validate: [required(t1('score_scale_cannot_be_empty'))],
    },
  };
};

const getUi = (step, values, hiddenFields = {}) => {
  const { type } = hiddenFields;

  if (type === 'by_rubrics') {
    return [
      {
        id: 'default',
        fields: ['test_rubrics', 'exam_rubrics'],
      },
    ];
  }

  const fields = [
    'school_year',
    'semester',
    'credit_syllabus',
    'course',
    'score_scale',
  ];

  const fieldsFilter = (hiddenFields && Object.keys(hiddenFields)) || [];
  if (!values || !values.credit_syllabus || !values.credit_syllabus.length) {
    fieldsFilter.push('course');
  }

  return [
    {
      id: 'default',
      fields: fields.filter((field) => !fieldsFilter.includes(field)),
    },
  ];
};

export default ({ type }) => ({
  schema: (formid, values) => schema(formid, values, type),
  ui: (step, values) => getUi(step, values, { type }),
});
