import select from './select';

const x = (options) => {
  const selectMultiple = select;
  selectMultiple.multiple = true;
  selectMultiple.options = options || select.options;
  return selectMultiple;
};

export default x;
