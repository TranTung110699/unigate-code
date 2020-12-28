import { t1 } from 'translate';
import { isEmailString } from 'common/utils/string';

/* eslint-disable import/prefer-default-export */
export const matchRegex = (regex, errorText) => {
  let localErrorText = errorText;
  localErrorText =
    localErrorText || t1('this_field_does_not_match_regex_%s', [regex]);
  return (value) => {
    if (!value) {
      return '';
    }
    return regex.test(value) ? '' : localErrorText;
  };
};

export const isEmail = (errorText) => {
  const localErrorText = errorText || t1('this_is_not_a_valid_email');
  return (value) => {
    if (!value) {
      return '';
    }
    return isEmailString(value) ? '' : localErrorText;
  };
};

export const isPhoneNumber = (errorText) => {
  const localErrorText = errorText || t1('this_is_not_a_valid_phone_number');
  return matchRegex(/^[\(\+\d\s\)]*[\d\.-\s]*$/, localErrorText);
};

export const required = (errorText) => {
  let localErrorText = errorText;
  localErrorText = localErrorText || t1('this_field_is_required');
  return (value) =>
    ['', null, undefined].includes(value) ||
    (Array.isArray(value) && value.length === 0)
      ? localErrorText
      : undefined;
};

export const dateGreaterThan = (comparedTime, errorText) => (value) => {
  if (!value || !comparedTime) {
    return null;
  }
  if (typeof value !== 'number') {
    value = Date.parse(value) / 1000;
  }
  if (typeof comparedTime !== 'number') {
    comparedTime = Date.parse(comparedTime) / 1000;
  }
  if (
    typeof value === 'number' &&
    typeof comparedTime === 'number' &&
    parseInt(value, 10) >= parseInt(comparedTime, 10)
  ) {
    return null;
  }
  return errorText || t1('%s_is_not_greater_than_%s', [value, comparedTime]);
};

export const dateLessThan = (comparedTime, errorText) => (value) => {
  if (!value || !comparedTime) {
    return null;
  }
  if (typeof value !== 'number') {
    value = Date.parse(value) / 1000;
  }
  if (typeof comparedTime !== 'number') {
    comparedTime = Date.parse(comparedTime) / 1000;
  }

  if (parseInt(value, 10) <= parseInt(comparedTime, 10)) {
    return null;
  }
  return errorText || t1('%s_is_not_less_than_%s', [value, comparedTime]);
};

export const ifJSON = (errorText) => (value) => {
  try {
    return JSON.parse(value);
  } catch (ex) {
    return errorText;
  }
};

export const inRange = (min, max, errorText) => (value) => {
  if (typeof value === 'undefined') {
    return undefined;
  }
  if (
    typeof min !== 'undefined' &&
    typeof max !== 'undefined' &&
    min !== null &&
    max !== null
  ) {
    if (min > value || value > max) {
      return errorText || t1('value_must_be_between_%s_and_%s', [min, max]);
    }
    return undefined;
  }
  if (typeof min !== 'undefined' && min !== null) {
    if (min > value) {
      return errorText || t1('value_must_be_greater_than_%s', [min]);
    }
    return undefined;
  }
  if (typeof max !== 'undefined' && max !== null) {
    if (value > max) {
      return errorText || t1('value_must_be_smaller_than_%s', [max]);
    }
    return undefined;
  }
  return undefined;
};

export const isNumber = (errorText) => {
  let localErrorText = errorText;
  localErrorText = localErrorText || t1('this_field_is_not_a_number');
  return (value) => {
    if (['', null, undefined].includes(value)) return undefined;
    return isNaN(value) ? localErrorText : undefined;
  };
};

export const isInteger = (errorText) => {
  let localErrorText = errorText;
  localErrorText = localErrorText || t1('this_field_is_not_an_integer');
  return (value) => {
    if (['', null, undefined].includes(value)) return undefined;
    if (isNumber(localErrorText)(value)) {
      return localErrorText;
    }
    return String(parseInt(value, 10)) !== String(value)
      ? localErrorText
      : undefined;
  };
};

export const validationWithCondition = (validate, condition) => (value) =>
  condition ? validate(value) : undefined;

export const usersMappedRoles = (errorText) => (value) => {
  if (!value) {
    return errorText;
  }

  let wasMappedRoles = true;
  value.forEach((user) => {
    if (!user.roles || user.roles.length < 1) {
      wasMappedRoles = false;
    }
  });

  return wasMappedRoles ? undefined : errorText;
};
