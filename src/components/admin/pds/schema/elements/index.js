import { t1 } from 'translate';

export const org_province_id = ({
  floatingLabelText,
  validate,
  readOnly,
} = {}) => ({
  type: 'select',
  showSearch: true,
  optionFilterProp: 'children',
  filterOption: (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  floatingLabelText:
    typeof floatingLabelText !== 'undefined'
      ? floatingLabelText
      : `${t1('province')}`,
  floatingLabelFixed: true,
  options: 'async',
  paramsasync: {
    __url__: '/pds/api/get-all-provinces',
    key: `all-provinces`,
    valueKey: 'id',
  },
  fullWidth: true,
  validate,
  readOnly,
});

export const org_district_id = (
  values,
  { floatingLabelText, validate, readOnly } = {},
) => ({
  type: 'select',
  showSearch: true,
  optionFilterProp: 'children',
  filterOption: (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  floatingLabelText:
    typeof floatingLabelText !== 'undefined'
      ? floatingLabelText
      : `${t1('district')}`,
  floatingLabelFixed: true,
  options: 'async',
  paramsasync: {
    __url__: '/pds/api/get-districts',
    key: `district-by-${values && values.org_province_id}`,
    value: {
      id: values && values.org_province_id,
      type: 'district',
    },
    valueKey: 'id',
  },
  fullWidth: true,
  validate,
  readOnly,
});

export const province = (config) => {
  const { onChange } = config || {};

  return {
    type: 'select',
    floatingLabelText: `${t1('province')}`,
    floatingLabelFixed: true,
    options: 'async',
    paramsasync: {
      __url__: '/pds/api/get-all-provinces',
      key: `all-provinces`,
      valueKey: 'id',
    },
    fullWidth: true,
    ...(onChange ? { onChange } : {}),
    // validate: required(t1('province_cant_be_empty')),
  };
};

export const district = (values, onChange) => ({
  type: 'select',
  floatingLabelText: `${t1('district')} (*)`,
  floatingLabelFixed: true,
  options: 'async',
  paramsasync:
    values && values.province
      ? {
          __url__: '/pds/api/get-districts',
          key: `district-by-${values && values.province}`,
          value: {
            id: values && values.province,
            type: 'district',
          },
          valueKey: 'id',
        }
      : null,
  fullWidth: true,
  ...(onChange ? { onChange } : {}),
  // validate: required(t1('district_cant_be_empty')),
});

// TODO: reuse pds element
export const school__id = (values) => ({
  type: 'select',
  floatingLabelText: `${t1('school')} (*)`,
  floatingLabelFixed: true,
  options: 'async',
  paramsasync:
    values && values.school__district
      ? {
          key: `school__id-by-${values && values.school__district}`,
          value: {
            pid: values && values.school__district,
            type: 'school',
          },
          valueKey: 'id',
          __url__: '/pds/api/get-schools',
        }
      : null,
  fullWidth: true,
  // validate: required(t1('school_cant_be_empty')),
});

// TODO: reuse pds element
export const school__province = (props = {}) => ({
  type: 'select',
  floatingLabelText:
    props.floatingLabelText || `${t1('province_of_school')} (*)`,
  floatingLabelFixed: true,
  options: 'async',
  paramsasync: {
    __url__: '/pds/api/get-all-provinces',
    key: `all-provinces`,
    valueKey: 'id',
  },
  fullWidth: true,
  // validate: required(t1('province_of_school_cant_be_empty')),
  ...props,
});

// TODO: reuse pds element
export const school__district = (values) => ({
  type: 'select',
  floatingLabelText: `${t1('district_of_school')} (*)`,
  hintText: `${t1('district_of_school')}`,
  floatingLabelFixed: true,
  options: 'async',
  paramsasync:
    values && values.school__province
      ? {
          __url__: '/pds/api/get-districts',
          key: `school__district-by-${values && values.school__province}`,
          value: {
            id: values && values.school__province,
            type: 'district',
          },
          valueKey: 'id',
        }
      : null,
  fullWidth: true,
  // validate: required(t1('district_of_school_cant_be_empty')),
});
