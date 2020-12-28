import { t1 } from 'translate';
import { required } from 'common/validators';

const schema = (formid, values) => ({
  nr_of_questions_per_exercise: {
    type: 'number',
    floatingLabelText: t1('nr_of_questions_per_exercise'),
    defaultValue: 15,
    errorText: '',
    fullWidth: true,
    validate: [required(t1('nr_of_questions_per_exercise'))],
  },
  types: {
    type: 'multiCheckbox',
    inline: true,
    floatingLabelText: t1('practice_types'),
    options: [
      {
        value: 'random',
        label: t1('random'),
        primaryText: t1('random'),
      },
      {
        value: 'skill',
        label: t1('skill_based'),
        primaryText: t1('skill_based'),
      },
      {
        value: 'structure',
        label: t1('structure'),
        primaryText: t1('structure'),
      },
    ],
    defaultValue: ['random'],
  },
});

const ui = () => [
  {
    id: 'id',
    fields: ['nr_of_questions_per_exercise', 'types'],
  },
];

export default { schema, ui };
