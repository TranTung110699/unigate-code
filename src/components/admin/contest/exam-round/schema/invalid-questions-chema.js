import { t1 } from 'translate';

const schema = (formid, values, step) => ({
  iid: {
    type: 'text',
    floatingLabelText: `${t1('question_id')} (*)`,
    floatingLabelFixed: true,
    classWrapper: 'col-md-6',
  },
  action: {
    type: 'radio',
    hintText: t1('invalid_question_action'),
    floatingLabelText: t1('invalid_question_action'),
    defaultValue: 'plus',
    options: [
      {
        value: 'plus',
        label: t1('add_bonus_point_for_all_papers'),
      },
      // {
      //   value: 'zero',
      //   label: t1('set_question_weight_to_zero'),
      // },
    ],
    classWrapper: 'col-md-6',
  },
});

const ui = (step, values, themeConfig, xpath, formid, props) => {
  return [
    {
      id: 'default',
      fields: ['iid', 'action'],
    },
  ];
};

export default {
  schema,
  ui,
  layout: '2cols',
};
