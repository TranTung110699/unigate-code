const publishLevelOptions = [
  {
    value: 'open',
    primaryText: 'public:_the_course_can_be_learned_from_anywhere',
  },
  {
    value: 'intranet',
    primaryText: "WAN:_the_course_can_be_learned_on_company's_premises_only",
  },
  {
    value: 'office',
    primaryText:
      'office:__the_course_can_be_learned_through_local_network_only',
  },
];

const select = {
  type: 'select',
  hintText: 'a select box',
  floatingLabelText: 'select box',
  // defaultValue: '1',
  // errorText: 'Loading foo list from server....',
  // list will
  options: publishLevelOptions,
};

export default select;
