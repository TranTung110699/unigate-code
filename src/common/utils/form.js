/**
 * Stuff related to schema-form
 */
import { change } from 'redux-form';
import store from 'store';
import { slugify } from 'common/utils/string';
import { creditSyllabusLevels } from 'common/conf';

import { generateLevelOptions } from 'common/utils';
import { t1 } from 'translate';
import { required } from '../validators';
import apiUrls from 'api-endpoints';

export const convertAllowedValuesToMultiOptions = (allowedValues) => {
  if (!allowedValues) return [];
  const options = [];
  if (Object.prototype.toString.call(allowedValues) === '[object Array]') {
    allowedValues.forEach((i) => {
      // see the "the-PHP-associative-array-problem" at server side
      if (i !== '_____') {
        options.push({
          value: i,
          label: i,
        });
      }
    });
  } else if (
    Object.prototype.toString.call(allowedValues) === '[object Object]'
  ) {
    Object.keys(allowedValues).forEach((key) => {
      // see the "the-PHP-associative-array-problem" at server side
      if (key !== '_____') {
        options.push({
          value: key,
          label: allowedValues[key],
        });
      }
    });
  }
  return options;
};

/**
 * convert an array expressed in a plain array format to a select option understandable by schema-form
 * @param allowedValues : simple array of values
 * @return schema form select options
 */
export const convertPlainArrayToSelectOptions = (allowedValues) => {
  if (!allowedValues) return [];
  const options = [];
  for (let i = 0; i < allowedValues.length; i += 1) {
    options.push({
      primaryText: allowedValues[i],
      value: allowedValues[i],
      label: allowedValues[i],
    });
  }
  return options;
};

/**
 *
 * @param min
 * @param max
 * @param getNext
 * @param valueToText
 * @returns {Array}
 */
export const generateSelectOptionsInRange = (
  min,
  max,
  getNext,
  valueToText,
) => {
  const localValueToText =
    typeof valueToText === 'function' ? valueToText : (value) => value;

  const localGetNext =
    typeof getNext === 'function'
      ? getNext
      : (currentValue) => currentValue + getNext;

  let options = [];
  let isMaxAdded = false;

  let index = 0;
  let value = min;
  while (value <= max) {
    options = options.concat([
      {
        value,
        primaryText: localValueToText(value),
      },
    ]);
    if (value === max) {
      isMaxAdded = true;
    }
    value = localGetNext(value, index);
    index += 1;
  }

  if (!isMaxAdded) {
    options = options.concat([
      {
        value: max,
        primaryText: localValueToText(max),
      },
    ]);
  }

  return options;
};

/**
 *
 * @param fieldsArray : e.g ['name', 'email']
 * @param fieldsObject: e.g [name: 'Enter name', email: 'Enter email'];
 * @return [Schema-form selectOption]
 * like: [
 { value: 'name', label: 'Enter name' },
 { value: 'email', label: 'Enter email' },
 ]
 *
 */
export const generateSelectOptionsFromListOfAllowedFieldsInAPlainObject = (
  fieldsArray,
  fieldsObject,
) => {
  if (!fieldsArray.length) return [];

  const ret = [];
  fieldsArray.map((i) => {
    ret.push({
      value: i,
      label: fieldsObject[i] ? fieldsObject[i] : i,
    });
  });

  return ret;
};

// generate slug for

export const generateSlug = (formid, value, slug, prefix) => {
  store.dispatch(
    change(formid, slug, (prefix || '') + slugify(value, 'lower')),
  );
};

/**
 * @param result is usually a list of items returned by server's API
 * like [{id, iid, name, label}]
 * @param valueKey is the key to get value for the form, for example, select option
 * if valueKey empty, then get .id or .iid to be the value
 * @return the array that schema-form understands for both select, multicheckbox
 * by adding 3 main keys: id, primaryText, label
 */
export const transformServerResultArrayToFormFields = (
  result,
  mappingAsync = {},
) => {
  const { valueKey, transformData } = mappingAsync;

  if (transformData && typeof transformData === 'function') {
    return result;
    // return transformData(result).filter(Boolean);
  }

  const t = result.map((item) => {
    const option = {};
    // handle option.value
    if (typeof item.value !== 'undefined') {
      option.value = item.value;
    } else if (valueKey && item[valueKey]) {
      option.value = item[valueKey];
    } else if (item.id) {
      option.value = item.id;
    } else if (item.iid) option.value = item.iid;

    if (typeof option.value === 'undefined') return null;

    // now option.primaryText
    if (item.primaryText) option.primaryText = item.primaryText;
    else if (item.name) {
      option.primaryText = item.name;
    } else if (item.label) {
      option.primaryText = item.label;
    } else {
      option.primaryText = option.value;
    }

    // now option.label
    if (item.label) option.label = item.label;
    else if (item.name) {
      option.label = item.name;
    } else if (item.primaryText) {
      option.label = item.primaryText;
    } else {
      option.label = option.value;
    }

    return option;
  });

  // remove null items
  return t.filter((i) => !!i);
};

/**
 * @param xpath xpath  is now something like `form.comments[0].comment_array[1]. we need to extract and return index 1
 */
export const extractCurrentIndexFromXpath = (xpath) => {
  const regexPat = /(.*)\[(\d+)\]$/;
  const tmp = xpath.match(regexPat);
  if (tmp && tmp.length === 3) return parseInt(tmp[2]);
  // return undefined;
};

/**
 * @param xpath xpath  is now something like `form.comments[0].comment_array[1]. we need to extract and return 'comment_array'
 */
export const extractLastFieldNameFromXpath = (xpath) => {
  if (!xpath) return '';
  const tmp = xpath.split('.');
  const lastSelector = tmp[tmp.length - 1];
  return lastSelector.split('[')[0];
};

/**
 * E.g:
 *  values = ['course', 'credit_syllabus']
 *  valueToText = (value) => value === 'course' ? 'khoa hoc' : 'mon hoc';
 *
 *  => return [{value: 'course', primaryText: 'khoa hoc', label: 'khoa hoc' }, ...]
 * @param values
 * @param valueToText
 * @returns {Array}
 */
export const convertListOfValuesIntoOptionsForFormElement = (
  values,
  valueToText = (v) => v,
) =>
  Array.isArray(values)
    ? values.map((value) => ({
        value,
        primaryText: valueToText(value),
        label: valueToText(value),
      }))
    : [];

// k12
export const gradeElement = (
  domainInfo,
  forSearch = false,
  label = 'grade',
) => {
  const levelOptions = generateLevelOptions(
    creditSyllabusLevels(domainInfo),
    true,
  );

  if (forSearch)
    return {
      type: 'select',
      options: levelOptions,
      floatingLabelText: label,
      floatingLabelFixed: false,
      multiple: true,
      fullWidth: true,
    };
  // for edit
  else
    return {
      type: 'select',
      options: levelOptions,
      floatingLabelText: label,
      floatingLabelFixed: true,
      fullWidth: true,
    };
};

export const trainingModeElement = (
  forSearch = false,
  multiple = false,
  checkbox = false,
) => {
  let elType = 'select';

  if (checkbox && forSearch) elType = 'multiCheckbox';

  const ret = {
    type: elType,
    // fullWidth: true,
    floatingLabelText: t1('training_mode'),
    options: 'async',
    paramsasync: {
      __url__: apiUrls.get_training_modes,
    },
    multiple,
  };

  if (!forSearch)
    ret.validate = [required(t1('training_mode_cannot_be_empty'))];
  else ret.fullWidth = true;

  return ret;
};

export const semesterElement = (
  values,
  multiple = false,
  schoolYearKey = 'school_year_iid',
) => {
  return {
    type: 'select',
    label: multiple ? t1('semesters') : t1('semester'),
    options: 'async',
    paramsasync: {
      __url__: `/k12/api/get-current-semesters`,
      value: {
        school_year: values[schoolYearKey] ? values[schoolYearKey] : null,
      },
    },
    multiple: multiple,
  };
};

export const schoolYearSelect = () => {
  return {
    type: 'select',
    label: t1('school_year'),
    floatingLabelText: t1('school_year'),
    errorText: t1('school_year....'),
    floatingLabelFixed: false,
    options: 'async',
    paramsasync: {
      __url__: `/k12/api/get-all-school-years`,
    },
  };
};

// group element following the grade in the same form
// usually user chooses a grade first and then they choose groups
// k12
export const groupElement = (values, gradeKey = 'grade') => {
  return {
    type: 'select',
    multiple: true,
    floatingLabelText: t1('group'),
    errorText: t1('group....'),
    floatingLabelFixed: false,
    options: 'async',
    paramsasync: {
      __url__: '/k12/group/get-groups-by-grade',
      value: {
        // training_mode: values.training_mode,
        grade: values[gradeKey],
      },
      key: Array.isArray(values[gradeKey])
        ? `group-${values[gradeKey] ? values[gradeKey].join('-') : ''}`
        : `group-${values[gradeKey] ? values[gradeKey] : ''}`,
    },
    // defaultValue: 'online',
    fullWidth: true,
  };
};
