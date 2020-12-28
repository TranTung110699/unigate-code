import { t1 } from 'translate';

const schema = () => ({
  role: {
    type: 'multiCheckbox',
    options: ['teacher', 'student'],
    inline: true,
    defaultValue: 'student',
    floatingLabelText: t1('role'),
    floatingLabelFixed: false,
  },
});

const ui = (step, values) => [
  {
    fields: ['role'],
    id: 'role',
  },
];

export default { schema, ui };
