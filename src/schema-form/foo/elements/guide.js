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

export const guideSimple = {
  type: 'text',
  hintText: 'Simple guide being a title text only',
  defaultValue: '',
  errorText: '',
  guide: 'This is some thing you have to do like this and that',
};

export const guide = {
  type: 'radio',
  hintText: 'complex guide being {title,content}',
  defaultValue: 'apple',
  options: fruits,
  required: true,
  guide: {
    title: 'Some help on radio',
    content: 'Some <i>detailed help</i> on radio in <b>html</b>. <u>ok</u>',
  },
};
