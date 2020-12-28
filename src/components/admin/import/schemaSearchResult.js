import { t1 } from 'translate';

const schema = () => ({
  text: {
    type: 'text',
    hintText: t1('content'),
    floatingLabelText: t1('content'),
    fullWidth: true,
    classWrapper: 'col-md-8',
  },
  status: {
    type: 'multiCheckbox',
    fullWidth: true,
    classWrapper: 'col-md-4',
    inline: true,
    floatingLabelText: t1('status'),
    options: [
      {
        value: 'error',
        label: t1('error'),
        name: t1('error'),
      },
      {
        value: 'available',
        label: t1('available'),
        name: t1('available'),
      },
    ],
    defaultValue: ['error', 'available'],
  },
});

const ui = (step, values) => [
  {
    id: 'id', // you still have to have this id even for freestyle
    fields: ['text', 'status'],
  },
];

export default { schema, ui };
