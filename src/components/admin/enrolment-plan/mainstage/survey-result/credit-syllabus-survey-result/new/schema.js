import { t1 } from 'translate';
import { required } from 'common/validators';

const schema = (formid, values, step) => ({
  number_to_create: {
    type: 'number',
    step: 1,
    min: 1,
    floatingLabelText: t1(
      'number_of_anonymous_users_who_takes_the_survey_for_every_credit_syllabuses',
    ),
    errorText: '',
    fullWidth: true,
    validate: [required()],
  },
});

const ui = (step) => {
  return [
    {
      id: 'default',
      fields: ['number_to_create'],
    },
  ];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
