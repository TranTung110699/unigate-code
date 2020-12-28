import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import { required } from 'common/validators';

export const schoolsSelectBox = (opts) => {
  let { label, isRequired } = opts || {};
  label = typeof label === 'undefined' ? t1('schools') : label;

  return {
    type: 'select',
    options: 'async',
    floatingLabelText: label,
    validate: [isRequired ? required() : null].filter(Boolean),
    paramsasync: {
      __url__: apiUrls.get_schools_for_select_box,
    },
  };
};
