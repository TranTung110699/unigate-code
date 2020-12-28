import { required } from '../../../common/validators';

const text = (label, isRequired) => {
  return {
    type: 'text',
    hintText: 'hintText: ' + label,
    floatingLabelText: 'floatingLable Text: ' + label,
    defaultValue: '',
    errorText: '',
    validate: isRequired ? [required('cannot be empty')] : null,
    guide: 'This is some thing you have to do like this and that',
  };
};

export default text;
