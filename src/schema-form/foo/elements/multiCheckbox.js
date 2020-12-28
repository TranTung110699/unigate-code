import { required } from '../../../common/validators';
import fruits from '../data/fruits';

const multiCheckbox = (options, isRequired) => {
  return {
    type: 'multiCheckbox',
    hintText: 'multiCheckbox: category hintText',
    floatingLabelText: 'multiCheckbox: choose category',
    defaultValue: ['apple'],
    // errorText: 'Loading foo list from server....',
    options: options || fruits,
    vertical: true,
    fullWidth: true,
    // {// TODO get from server!!! yeild * api->getCourses()
    //   tf: 'True false',
    //   mc: 'Multiple Choice',
    //   inline: 'Inline',
    // },
    checkAll: true,
    validate: isRequired
      ? [required('you must choose at least one category')]
      : null,
  };
};

export default multiCheckbox;
