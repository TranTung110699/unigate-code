const fruits = [
  {
    value: 'apple',
    label: 'Apple (pre-selected)',
  },
  {
    value: 'orange',
    label: 'Orange',
  },
  {
    value: 'lemon',
    label: 'Lemon',
  },
];

const radio = (onChange, formid, values) => {
  return {
    type: 'radio',
    hintText: 'hint: radio button',
    floatingLabelText: 'choose a fruit radio',
    defaultValue: 'apple',
    options: fruits,
    onChange: (ev, value) => {
      onChange(formid, value, values);
    },
    required: true,
  };
};

export default radio;
