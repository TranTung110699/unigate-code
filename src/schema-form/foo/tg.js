// target groups
import store from 'store';
import { change } from 'redux-form';

const handleTargetGroupFiltersChange = (formid, value, currentValue = []) => {
  const newValue = value.map((option) => {
    let tmp = currentValue.find((map) => map && map.type === option);
    if (!tmp) {
      tmp = { type: option };
    }
    return tmp;
  });

  store.dispatch(change(formid, 'target_groups', newValue));
};

const targetGroupFilters = [
  {
    value: 'apple',
    label: 'Apple 1',
  },
  {
    value: 'orange',
    label: 'Orange 2',
  },
  {
    value: 'lemon',
    label: 'Lemon 2',
  },
];

const x = (formid, values) => {
  return {
    type: 'multiCheckbox',
    floatingLabelText: 'target group filters',
    options: targetGroupFilters,
    onChange: (ev, value) => {
      handleTargetGroupFiltersChange(
        formid,
        value,
        (values && values.target_groups) || [],
      );
    },
  };
};

export default x;
