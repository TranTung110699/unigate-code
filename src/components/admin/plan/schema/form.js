import React from 'react';
import Store from 'store';
import { t1 } from 'translate';
import { change } from 'redux-form';
import get from 'lodash.get';
import { inRange, required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import apiUrls from 'api-endpoints';
import Elemets from 'components/common/elements';
import schemaEditScoreScale from './score-scale-form';
import TreeCheckbox from 'schema-form/elements/tree-check-box/new';
import DatePicker from 'schema-form/elements/date-picker';
import Toggle from 'schema-form/elements/toggle';

const { schoolYear, semester } = Elemets;

const elementScoreScale = {
  type: 'select',
  hiddenWhenOptionEmpty: true,
  classWrapper: 'col-md-12',
  floatingLabelText: t1('score_scale'),
  options: 'async',
  paramsasync: {
    __url__: apiUrls.get_all_score_scale,
  },
  fullWidth: true,
  inline: true,
};

const elementExchangeP = (values) => ({
  type: 'number',
  step: 1,
  classWrapper: 'col-md-4',
  min: 0,
  defaultValue: '0',
  floatingLabelText: t1('p'),
  fullWidth: true,
  validate: [
    required(t1('value_is_required')),
    inRange(
      0,
      values.exchange__m - 1 || 10000,
      t1('value_must_be_between_%s_and_exchange_m', [0]),
    ),
  ],
});
const elementExchangeM = (values) => ({
  type: 'number',
  step: 1,
  min: 0,
  classWrapper: 'col-md-4',
  defaultValue: 1,
  floatingLabelText: t1('m'),
  fullWidth: true,
  validate: [
    required(t1('value_is_required')),
    inRange(
      values.exchange__p + 1,
      values.exchange__d - 1 || 10000,
      t1('value_must_be_between_exchange_p_and_exchange_d'),
    ),
  ],
});
const elementExchangeD = (values) => ({
  classWrapper: 'col-md-4',
  type: 'number',
  step: 1,
  min: 0,
  defaultValue: 2,
  floatingLabelText: t1('d'),
  fullWidth: true,
  validate: [
    required(t1('value_is_required')),
    inRange(
      values.exchange__m + 1,
      10000,
      t1('value_must_be_bigger_exchange_m'),
    ),
  ],
});
const elementSummaryPFrom = (values) => ({
  type: 'number',
  step: 1,
  classWrapper: 'col-md-6',
  defaultValue: '0',
  floatingLabelText: t1('p_from'),
  fullWidth: true,
  validate: [
    required(t1('value_is_required')),
    inRange(
      0,
      parseInt(values.summary__p__to) - 1,
      t1('value_must_be_in_range_0_->_p_to'),
    ),
  ],
});
const elementSummaryPTo = (values) => ({
  type: 'number',
  step: 1,
  classWrapper: 'col-md-6',
  defaultValue: '0',
  floatingLabelText: t1('p_to'),
  fullWidth: true,
  validate: [
    required(t1('value_is_required')),
    inRange(
      parseInt(values.summary__p__from) + 1,
      parseInt(values.summary__m__from) - 1,
      t1('value_must_be_in_range_p_from_->_m_from'),
    ),
  ],
});
const elementSummaryMFrom = (values) => ({
  type: 'number',
  step: 1,
  classWrapper: 'col-md-6',
  validate: [
    required(t1('value_is_required')),
    inRange(
      parseInt(values.summary__p__to) + 1,
      parseInt(values.summary__m__to) - 1,
      t1('value_must_be_in_range_p_to_->_m_to'),
    ),
  ],
  defaultValue: '0',
  floatingLabelText: t1('m_from'),
  fullWidth: true,
});
const elementSummaryMTo = (values) => ({
  type: 'number',
  step: 1,
  validate: [
    required(t1('value_is_required')),
    inRange(
      parseInt(values.summary__m__from) + 1,
      parseInt(values.summary__d__from) - 1,
      t1('value_must_be_in_range_m_from_->_d_from'),
    ),
  ],
  classWrapper: 'col-md-6',
  defaultValue: '0',
  floatingLabelText: t1('m_to'),
  fullWidth: true,
});
const elementSummaryDFrom = (values) => ({
  type: 'number',
  step: 1,
  classWrapper: 'col-md-6',
  validate: [
    required(t1('value_is_required')),
    inRange(
      parseInt(values.summary__m__to) + 1,
      values.summary__d__to ? parseInt(values.summary__d__to) - 1 : 10000,
      t1('value_must_be_in_range_m_to_->_d_to'),
    ),
  ],
  defaultValue: '0',
  floatingLabelText: t1('d_from'),
  fullWidth: true,
});
const elementSummaryDTo = (values) => ({
  type: 'number',
  step: 1,
  classWrapper: 'col-md-6',
  validate: [
    inRange(
      parseInt(values.summary__d__from) + 1,
      10000,
      t1('value_must_be_bigger_d_from'),
    ),
  ],
  defaultValue: '',
  floatingLabelText: t1('d_to'),
  fullWidth: true,
});

const schema = (formid, values, step, xpath, props) => ({
  major: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      floatingLabelText: t1('applicable_for_major'),
      displayFields: [
        'faculty',
        'major',
        'training_mode',
        'training_level',
        'ico',
      ],
      notValidate: !values || !values.create,
      forSearch: true,
    }),
  },
  name: {
    type: 'text',
    hintText: t1('plan_name'),
    floatingLabelText: t1('plan_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1('name_cannot_be_empty'))],
  },
  program: {
    type: 'select',
    floatingLabelText: t1('program'),
    options: 'async',
    classWrapper: 'col-md-12',
    paramsasync: {
      key: `program-by-${values && values.major}-${values &&
        values.training_level}-${values && values.training_mode}`,
      value: {
        major: values && values.major,
        training_level: values && values.training_level,
        training_mode: values && values.training_mode,
      },
    },
    fullWidth: true,
    validate:
      formid === 'plan_search' ? [] : [required(t1('program_cannot_be_empty'))],
  },
  school_year: schoolYear({
    formid,
    classWrapper: 'col-md-4',
    paramsasync: {
      value: {
        type: 'school_year',
        status: formid === 'new_plan' ? ['approved'] : ['approved', 'queued'],
      },
    },
  }),
  effective_time: {
    type: 'number',
    classWrapper: 'display-none',
    defaultValue: Math.floor(new Date().getTime() / 1000),
  },
  semester: semester({
    classWrapper: 'col-md-8',
    formid,
    values,
    paramsasync: {
      validate:
        formid === 'plan_search'
          ? []
          : [required(t1('semester_cannot_be_empty'))],
    },
  }),
  start_date: {
    type: DatePicker,
    classWrapper: 'col-md-4',
    floatingLabelText: t1('from_date'),
    container: 'inline',
  },
  end_date: {
    type: DatePicker,
    classWrapper: 'col-md-4',
    floatingLabelText: t1('to_date'),
    container: 'inline',
  },
  credit_syllabus: {
    type: 'text',
    floatingLabelText: t1('search_subject_name_or_iid_or_code'),
    fullWidth: true,
  },
  option_filter: {
    type: Toggle,
    classWrapper: 'col-md-12',
    style: { maxWidth: 300, marginTop: 40 },
    dataSet: {
      off: 'semester',
      on: 'timers',
    },
    twoSide: true,
    offLabel: t1('choose_semesters'),
    onLabel: t1('choose_dates'),
  },
});

const ui = (step, values) => {
  let result = [];
  switch (step) {
    case 'new': {
      result = [
        {
          id: 'default',
          fields: ['major', 'school_year', 'effective_time', 'semester'],
        },
      ];
      break;
    }
    case 'new_credit_plan':
      result = [
        {
          id: 'default',
          fields: ['credits'],
        },
      ];
      break;
    case 'new_search-course':
      result = [
        {
          id: 'default',
          fields: ['major', 'semester', 'credit_syllabus'],
        },
      ];
      break;
    case 'new_search': {
      let fields = ['major', 'option_filter'];
      if (values && values.option_filter === 'timers') {
        fields = fields.concat(['start_date', 'end_date']);
      } else {
        fields = fields.concat(['school_year', 'semester']);
      }
      result = [
        {
          id: 'default',
          fields,
        },
      ];
      break;
    }
    case 'edit':
      result = [
        {
          id: 'default',
          fields: ['major', 'semester'],
        },
      ];
      break;
    case 'new_major-program':
      result = [
        {
          id: 'major_program',
          fields: ['major', 'program'],
        },
      ];
      break;
    default:
      return [];
  }
  return result;
};
const getSchemaCreditPlan = (treeData) => ({
  credits: {
    type: TreeCheckbox,
    checkParentEqualCheckAllChildren: true,
    setValueIsChildrenOnly: true,
    multiSelectable: true,
    treeData,
  },
});
export const creditPlanSchema = (treeData) => ({
  schema: getSchemaCreditPlan(treeData || []),
  ui,
});

const getUiSchemaApplyMajorProgram = (step, values, hiddenFields) => {
  if (hiddenFields.type === 'program_apply') {
    return [
      {
        id: 'default',
        fields: ['new_program'],
      },
    ];
  }
  let fields = ['forms_of_training', 'program'];
  const fieldsFilter = (hiddenFields && Object.keys(hiddenFields)) || [];

  fields = fields.filter((field) => !fieldsFilter.includes(field));
  return [
    {
      id: 'default',
      fields,
    },
  ];
};

const getUiSchemaApplySpecializationProgram = (step, values, hiddenFields) => {
  const fields = ['specialization', 'program_module'];
  const fieldsFilter = (hiddenFields && Object.keys(hiddenFields)) || [];

  return [
    {
      id: 'default',
      fields: fields.filter((field) => !fieldsFilter.includes(field)),
    },
  ];
};

const getElementSchemaApplySpecializationProgram = (
  formid,
  values,
  hiddenFields,
) => ({
  specialization: {
    type: 'select',
    floatingLabelText: t1('specialization'),
    options: 'async',
    classWrapper: 'col-md-12',
    fullWidth: true,
    populateValue: true,
    paramsasync: {
      __url__: '/category/major/get-specialization-by-form-of-training',
      key: `program-module-by-${hiddenFields.major}-${
        hiddenFields.training_mode
      }-${hiddenFields.training_level}`,
      value: hiddenFields,
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }

        const specializationIids = hiddenFields.specializationIids || [];

        return data
          .map((row) => {
            const label = `${row.name} -(${row.code})`;
            return {
              value: row.iid,
              label,
              primaryText: label,
            };
          })
          .filter((option) => specializationIids.includes(option.value));
      },
    },
    validate: [required(t1('specialization_cannot_be_empty'))],
  },
  program_module: {
    type: 'select',
    floatingLabelText: t1('program_module'),
    options: 'async',
    classWrapper: 'col-md-12',
    fullWidth: true,
    populateValue: true,
    paramsasync: {
      __url__: '/path/api/get-program-modu-apply-specialization',
      key: `program-module-by-${hiddenFields.program}`,
      value: {
        program: hiddenFields.program,
      },
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }
        return data.map((row) => {
          const label = `${row.name} -(${row.code})`;
          return {
            value: row.iid,
            label,
            primaryText: label,
          };
        });
      },
    },
    validate: [required(t1('program_module_cannot_be_empty'))],
  },
});

const getElementSchema = (formid, values, props, hiddenFields) => {
  const displayFields = [
    'faculty',
    'major',
    'training_mode',
    'training_level',
    'ico',
  ];

  const displayFieldsFilter = Object.keys(hiddenFields || {}) || [];
  if (displayFieldsFilter.includes('major')) {
    displayFieldsFilter.push('faculty');
  }

  const elementProgram = {
    type: 'select',
    floatingLabelText: t1('program'),
    options: 'async',
    classWrapper: 'col-md-12',
    fullWidth: true,
    paramsasync: {
      key: `program-by-${values && values.major}-${values &&
        values.training_level}-${values && values.training_mode}`,
      value: {
        major: values && values.major,
        training_level: values && values.training_level,
        training_mode: values && values.training_mode,
      },
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }

        return hiddenFields && hiddenFields.searchForm
          ? [
              {
                value: '',
                label: t1('all'),
                primaryText: t1('all'),
              },
            ].concat(data)
          : data;
      },
      validate: [required(t1('program_cannot_be_empty'))],
    },
  };

  return {
    forms_of_training: {
      type: 'cascade',
      sectionCascade: true,
      schema: getMajorBoxSchema({
        displayFields: displayFields.filter(
          (field) => !displayFieldsFilter.includes(field),
        ),
        notValidate: hiddenFields && hiddenFields.searchForm,
        forSearch: hiddenFields && hiddenFields.searchForm,
      }),
    },
    program: elementProgram,
    new_program: elementProgram,
  };
};

const schemaApplyMultiDegree = (formid, values) => {
  return {
    name: {
      type: 'text',
      classWrapper: 'col-md-12',
      floatingLabelText: t1('name'),
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    code: {
      type: 'text',
      classWrapper: 'col-md-12',
      floatingLabelText: t1('code'),
      validate: [required(t1('code_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      normalize: slugifier,
    },
    forms_of_training: {
      type: 'array',
      classWrapper: 'col-md-12',
      floatingLabelText: t1('forms_of_training'),
      schema: getMajorBoxSchema({
        displayFields: ['faculty', 'major', 'training_mode', 'training_level'],
        notValidate: false,
        forSearch: false,
      }),
      hiddenRemoveButton: get(values, 'forms_of_training', []).length <= 2,
      onChange: (formsOfTraining) => {
        const countFOT =
          Array.isArray(formsOfTraining) && formsOfTraining.length;
        let onChange = false;
        let newValue = [];
        if (!countFOT) {
          onChange = true;
          newValue = [{}, {}];
        } else if (countFOT < 2) {
          onChange = true;
          formsOfTraining.push({});
          newValue = formsOfTraining;
        } else {
          newValue = formsOfTraining.map((formOfTraining, index) => {
            const obj = formsOfTraining.find((fot, fIndex) => {
              if (fIndex >= index) {
                return false;
              }

              return (
                get(formOfTraining, 'faculty') === get(fot, 'faculty') &&
                get(formOfTraining, 'major') === get(fot, 'major') &&
                get(formOfTraining, 'training_mode') ===
                  get(fot, 'training_mode') &&
                get(formOfTraining, 'training_level') ===
                  get(fot, 'training_level')
              );
            });

            if (obj) {
              onChange = true;
              return {};
            }
            return formOfTraining;
          });
        }

        if (onChange) {
          Store.dispatch(change(formid, 'forms_of_training', newValue));
        }
      },
    },
    ico: {
      type: 'cascade',
      sectionCascade: true,
      schema: getMajorBoxSchema({
        floatingLabelText: t1('ico_apply'),
        displayFields: ['ico'],
        notValidate: false,
        forSearch: false,
      }),
    },
  };
};

export const getSchemaApplyMultiDegree = (hiddenFields) => {
  return {
    schema: schemaApplyMultiDegree,
    ui: () => {
      return [
        {
          id: 'default',
          fields: get(hiddenFields, 'id')
            ? ['ico']
            : ['name', 'code', 'forms_of_training', 'ico'],
        },
      ];
    },
  };
};

export const getSchemaMultiDegreeSearch = (hiddenFields = {}) => {
  return {
    schema: (formid, values, step, xpath, props) =>
      getElementSchema(formid, values, props, hiddenFields),
    ui: () => {
      return [
        {
          id: 'default',
          fields: ['forms_of_training'],
        },
      ];
    },
  };
};

export const getSchemaApplySpecializationProgram = (hiddenFields) => ({
  schema: (formid, values) =>
    getElementSchemaApplySpecializationProgram(formid, values, hiddenFields),
  ui: (step, values) =>
    getUiSchemaApplySpecializationProgram(step, values, hiddenFields),
});

export const getSchemaApplyScoreScaleByIco = (option) =>
  schemaEditScoreScale(option);

export const getSchemaApplyMajorProgram = (hiddenFields = {}) => ({
  schema: (formid, values, step, xpath, props) =>
    getElementSchema(formid, values, props, hiddenFields),
  ui: (step, values) =>
    getUiSchemaApplyMajorProgram(step, values, hiddenFields),
});

export default { schema, ui };
