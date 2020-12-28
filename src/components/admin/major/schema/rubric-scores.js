import { required } from 'common/validators';
import { t1 } from 'translate';

const schema = () => ({
  name: {
    type: 'text',
    hintText: t1('name_of_rubric'),
    classWrapper: 'col-md-6',
    floatingLabelText: `${t1('rubric_name')} (*)`,
    validate: [required(t1('name_cannot_be_empty'))],
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  p_original: {
    type: 'text',
    hintText: t1('score'),
    classWrapper: 'col-md-6',
    floatingLabelText: t1('score_of_rubric'),
    /* min: 0,
    max: 100,
    validate: [
      required(t1('value_is_required')),
      inRange(0, 100, t1('value_must_be_between_%s_and_%s', [0, 100])),
    ], */
    floatingLabelFixed: true,
    fullWidth: true,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['name', 'p_original'],
  },
];

export default { schema, ui };
