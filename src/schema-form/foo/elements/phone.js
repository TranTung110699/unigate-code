// import text from './text';

const phone = (label, isRequired) => {
  return {
    type: 'phone',
    hintText: label,
    floatingLabelText: label,
    defaultValue: '',
    errorText: '',
  };
};

export default phone;
