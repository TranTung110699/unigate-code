import { t1 } from 'translate';
import { required } from 'common/validators';
import DateTimePicker from 'schema-form/elements/date-time-picker';
import RTE from 'schema-form/elements/richtext';

const schema = () => ({
  from_date: {
    type: DateTimePicker,
    floatingLabelText: t1('from_date'),
    fullWidth: true,
  },
  to_date: {
    type: DateTimePicker,
    floatingLabelText: t1('to_date'),
    fullWidth: true,
  },
  works_place: {
    type: 'text',
    hintText: t1('works_place'),
    floatingLabelText: t1('works_place'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1('works_place_cannot_be_empty'))],
  },
  achievement: {
    type: 'text',
    hintText: t1('enter_achievement'),
    floatingLabelText: t1('achievement'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1('achievement_cannot_be_empty'))],
  },
  experience_note: {
    type: RTE,
    hintText: t1('enter_experience_note'),
    floatingLabelText: t1('experience_note'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
});

const ui = {
  new_teaching_experience: [
    {
      id: 'default',
      fields: [
        'from_date',
        'to_date',
        'works_place',
        'achievement',
        'experience_note',
      ],
    },
  ],
};

const layout = {
  new_teaching_experience: '',
};

export default { schema, ui, layout };
