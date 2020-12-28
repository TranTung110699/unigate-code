import { required } from '../../../common/validators';

const multiCheckboxAsync = (isRequired) => {
  return {
    type: 'multiCheckbox',
    hintText: 'multiCheckbox: category hintText',
    floatingLabelText: 'multiCheckbox: choose category',
    defaultValue: ['apple'],
    // errorText: 'Loading foo list from server....',
    options: 'async',
    paramsasync: {
      // valueKey: 'iid',
      __url__: '/dev/schema-form/get',
    },
    vertical: true,
    fullWidth: true,
    // {// TODO get from server!!! yeild * api->getCourses()
    //   tf: 'True false',
    //   mc: 'Multiple Choice',
    //   inline: 'Inline',
    // },
    // checkAll: true,
    validate: isRequired
      ? [required('you must choose at least one category')]
      : null,
  };
};

export default multiCheckboxAsync;
