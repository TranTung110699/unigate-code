import { required } from '../../../common/validators';

const checkbox = (label, isRequired) => {
  return {
    type: 'checkbox',
    defaultValue: '',
    label,
    validate: isRequired ? [required('this is required')] : null,
  };
};

export default checkbox;
