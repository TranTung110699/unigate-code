import { t1 } from 'translate';
import { required } from 'common/validators';
import apiUrls from 'api-endpoints';
import contestApiUrls from 'components/admin/contest/endpoints';

export const examRoundsSelectBox = (values, options, shouldHaveEmptyValue) => {
  const ret = {
    type: 'select',
    floatingLabelText: (options && options.label) || `${t1('exam_round')} (*)`,
    floatingLabelFixed: true,
    options: 'async',
    populateValue:
      options && typeof options.populateValue != 'undefined'
        ? options.populateValue
        : true,
    paramsasync:
      values && values.contest_iid
        ? {
            key: `exam_round-by-${values && values.contest_iid}`,
            value: {
              contest_iid: values && values.contest_iid,
              should_have_empty_value: shouldHaveEmptyValue ? 1 : 0,
            },
            __url__: contestApiUrls.get_exam_rounds_for_select_box,
          }
        : null,
    fullWidth: true,
  };

  if (options) {
    if (typeof options.required != 'undefined') {
      ret.required = true;
      ret.validate = required(t1('exam_round_cant_be_empty'));
    }

    if (typeof options.defaultValue != 'undefined') {
      ret.defaultValue = options.defaultValue;
    }

    if (options.classWrapper) ret.classWrapper = options.classWrapper;

    if (options.readOnly) ret.readOnly = options.readOnly;
  }

  return ret;
};

export const examShiftsSelectBox = (
  values,
  isRequired,
  canGetPassedExamShift = true,
  shouldHaveEmptyValue = true,
) => {
  const ret = {
    type: 'select',
    populateValue: true,
    floatingLabelText: `${t1('exam_shift')}`,
    floatingLabelFixed: true,
    options: 'async',
    paramsasync:
      values && values.contest_iid
        ? {
            key: `exam-shift-by-${values && values.contest_iid}`,
            value: {
              contest_iid: values && values.contest_iid,
              can_get_passed_exam_shift: canGetPassedExamShift ? 1 : 0,
              should_have_empty_value: shouldHaveEmptyValue ? 1 : 0,
            },
            __url__: contestApiUrls.get_exam_shifts_for_select_box,
          }
        : null,
    fullWidth: true,
  };

  if (isRequired) {
    ret.validate = required(t1('exam_shift_cant_be_empty'));
  }

  return ret;
};
