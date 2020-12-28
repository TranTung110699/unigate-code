import { t1 } from 'translate/index';
import getLodash from 'lodash.get';
import { required } from 'common/validators';
import Elements from 'components/common/elements';
import { constants } from 'configs/constants';
import React from 'react';

const { schoolYear, semester } = Elements;

const allowRenderSpecializationField = (values, xpath) => {
  let allow = true;
  ['major', 'training_mode', 'training_level'].forEach((field) => {
    if (!getLodash(values, xpath ? `${xpath}.${field}` : field)) {
      allow = false;
    }
  });
  return allow;
};

const fieldsAvailable = [
  'faculty',
  'major',
  'training_level',
  'training_mode',
  'specialization',
  'ico',
  'status',
  'school_year',
  'semester',
];

const getDefaultSchema = (
  { forSearch, notValidate, organization, multiple },
  { paramsasync, ...props },
) => ({
  multiple,
  type: 'select',
  fullWidth: true,
  options: 'async',
  populateValue: !multiple && !forSearch,
  classWrapper: 'col-xs-12',
  showSearch: true,
  optionFilterProp: 'children',
  filterOption: (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  paramsasync: {
    transformData: (data) => {
      const defaultOption =
        forSearch && !multiple
          ? [
              {
                primaryText: t1('all'),
                value: '',
              },
            ]
          : [];

      return defaultOption.concat(Array.isArray(data) ? data : []);
    },
    ...paramsasync,
  },
  validate: notValidate ? [] : [required(t1('field_cannot_be_empty'))],
  ...props,
});

const getSchema = ({ formid, values, xpath }, optionsRender = {}) => {
  let displayFields = getLodash(optionsRender, 'displayFields');
  displayFields =
    Array.isArray(displayFields) && displayFields.length
      ? displayFields
      : ['faculty', 'major', 'training_mode', 'training_level', 'ico'];
  const result = {};

  const classWrapper = optionsRender.classWrapper || 'flex-item';

  if (
    displayFields.includes('school_year') ||
    displayFields.includes('semester')
  ) {
    result.school_year = schoolYear({
      hintText: t1('school_year'),
      floatingLabelText: t1('school_year'),
      ...optionsRender,
      multiple: optionsRender.multiple || false,
      formid,
      classWrapper,
      styleWrapper: { minWidth: 120 },
      paramsasync: {
        values: {
          type: 'school_year',
          status: ['approved'],
          effective_time: Math.floor(new Date().getTime() / 1000),
        },
      },
      validate: getLodash(optionsRender, 'notValidate')
        ? []
        : [required(t1('school_year_cannot_be_empty'))],
    });
  }

  if (displayFields.includes('semester')) {
    const schoolYearSelected = getLodash(
      values,
      `${xpath ? `${xpath}.` : ''}school_year`,
    );
    result.semester = semester({
      hintText: t1('semester'),
      floatingLabelText: t1('semester'),
      ...optionsRender,
      formid,
      values,
      xpath,
      classWrapper,
      styleWrapper: { minWidth: 120 },
      multiple: optionsRender.multiple || false,
      type: 'select',
      paramsasync: {
        value: {
          type: 'semester',
          status: ['approved'],
          school_year:
            schoolYearSelected &&
            (Array.isArray(schoolYearSelected)
              ? schoolYearSelected
              : [schoolYearSelected]),
        },
      },
      validate: getLodash(optionsRender, 'notValidate')
        ? []
        : [required(t1('semester_cannot_be_empty'))],
    });
  }

  if (displayFields.includes('faculty')) {
    result.faculty = getDefaultSchema(optionsRender, {
      hintText: t1('faculty'),
      floatingLabelText: t1('faculty'),
      classWrapper,
      styleWrapper: { minWidth: 120 },
      paramsasync: {
        __url__: '/organization/api/search?type=organization',
        key: `${xpath}faculty-tree-${xpath}`,
        value: {
          pid: -1,
          type: 'organization',
          sub_type: [2],
          view: 'grid',
          items_per_page: -1,
        },
        transformData: (data) => {
          const defaultOption =
            optionsRender.forSearch && !optionsRender.multiple
              ? [
                  {
                    primaryText: t1('all'),
                    value: '',
                  },
                ]
              : [];

          return defaultOption.concat(
            Array.isArray(data)
              ? data.map((row) => ({
                  primaryText: `${row.name} - #${row.code}`,
                  value: row.iid,
                }))
              : [],
          );
        },
      },
    });
  }

  const facultyIid =
    getLodash(values, `${xpath ? `${xpath}.` : ''}faculty`) ||
    getLodash(optionsRender, 'organization.iid');

  if (displayFields.includes('major')) {
    result.major = getDefaultSchema(optionsRender, {
      // hintText: t1('major'),
      floatingLabelText: t1('major'),
      classWrapper,
      styleWrapper: { minWidth: 120 },
      paramsasync: {
        __url__: '/category/schema-form/get-category-tree',
        key: `${xpath}.major-tree-${xpath}-${facultyIid}`,
        value: {
          organization: facultyIid,
          _type: 'major',
          key: 'iid',
          get_top_level: 0,
          depth: 0,
          no_prefix: 1,
        },
      },
    });
  }

  const majorIid = getLodash(values, `${xpath ? `${xpath}.` : ''}major`);

  if (displayFields.includes('training_level')) {
    result.training_level = getDefaultSchema(optionsRender, {
      // hintText: t1('training_level'),
      floatingLabelText: t1('training_level'),
      classWrapper,
      styleWrapper: { minWidth: 120 },
      paramsasync: {
        value: {
          faculty: facultyIid,
          major: majorIid,
        },
        key: `${xpath}training_level-${
          Array.isArray(facultyIid) ? facultyIid.join('-') : facultyIid
        }-${Array.isArray(majorIid) ? majorIid.join('-') : majorIid}`,
      },
    });
  }

  const trainingLevel = getLodash(
    values,
    xpath ? `${xpath}.training_level` : 'training_level',
  );

  if (displayFields.includes('training_mode')) {
    result.training_mode = getDefaultSchema(optionsRender, {
      // hintText: t1('training_mode'),
      floatingLabelText: t1('training_mode'),
      classWrapper,
      styleWrapper: { minWidth: 120 },
      paramsasync: {
        key: `${xpath}training_mode-${
          Array.isArray(facultyIid) ? facultyIid.join('-') : facultyIid
        }-${Array.isArray(majorIid) ? majorIid.join('-') : majorIid}-${
          Array.isArray(trainingLevel) ? trainingLevel.join('-') : trainingLevel
        }`,
        value: {
          faculty: facultyIid,
          major: majorIid,
          training_level: trainingLevel,
        },
      },
    });
  }

  if (displayFields.includes('ico')) {
    result.ico = getDefaultSchema(optionsRender, {
      // hintText: t1('ico'),
      floatingLabelText: t1('ico'),
      classWrapper,
      styleWrapper: { minWidth: 120 },
      paramsasync: {
        __url__: '/ico/api/get-all-icos',
        key: `icos-${xpath}`,
      },
    });
  }

  if (displayFields.includes('specialization')) {
    const trainingMode = getLodash(
      values,
      `${xpath ? `${xpath}.` : ''}training_mode`,
    );

    result.specialization = getDefaultSchema(optionsRender, {
      // hintText: t1('ico'),
      floatingLabelText: t1('specializations'),
      classWrapper,
      styleWrapper: { minWidth: 120 },
      hiddenWhenOptionEmpty: true,
      paramsasync: {
        __url__: '/user-major/api/get-specializations-by-form-of-training',
        key: `${xpath}specialization-${majorIid}-${trainingLevel}-${trainingMode}`,
        value: {
          major: majorIid,
          training_level: trainingLevel,
          training_mode: trainingMode,
        },
        transformData: (data) => {
          if (!data || !Array.isArray(data)) {
            return [];
          }
          return [
            {
              primaryText: t1('all'),
              value: '',
            },
          ].concat(
            data.map((row) => ({
              primaryText: row.name,
              value: row.iid,
            })),
          );
        },
      },
    });
  }

  const userMajorStatus = getLodash(optionsRender, 'userMajorStatus');
  if (displayFields.includes('status')) {
    result.status = {
      multiple: true,
      classWrapper:
        Array.isArray(userMajorStatus) && userMajorStatus.length === 1
          ? 'display-none'
          : classWrapper,
      styleWrapper: { minWidth: 120 },
      fullWidth: true,
      type: 'select',
      inline: true,
      floatingLabelText: t1('status'),
      hintText: t1('type_of_status'),
      options:
        !Array.isArray(userMajorStatus) || !userMajorStatus.length
          ? constants.userMajorStatusOptions
          : constants.userMajorStatusOptions.filter((options) =>
              userMajorStatus.includes(options.value),
            ),
      defaultValue: Array.isArray(userMajorStatus) ? userMajorStatus : [],
    };
  }

  return result;
};

const getUi = (
  values,
  xpath,
  {
    forSearch,
    displayFields = [
      'faculty',
      'major',
      'training_mode',
      'training_level',
      'ico',
    ],
    userMajorStatus,
    wrapperClass = '',
  },
) => {
  if (displayFields.includes('semester')) {
    displayFields.push('school_year');
  }
  const fields = fieldsAvailable.filter((field) => {
    if (
      field === 'specialization' &&
      !allowRenderSpecializationField(values, xpath)
    ) {
      return false;
    } else if (
      field === 'status' &&
      Array.isArray(userMajorStatus) &&
      !userMajorStatus.length
    ) {
      return false;
    }
    return displayFields.includes(field);
  });

  return [
    {
      id: 'id',
      wrapperClass: `${wrapperClass} flex-container-wrap`,
      fields,
    },
  ];
};

export default (optionsRender) => ({
  schema: (formid, values, step, xpath) =>
    getSchema({ formid, values, step, xpath }, optionsRender),
  ui: (step, values, themeConfig, xpath) => getUi(values, xpath, optionsRender),
});
