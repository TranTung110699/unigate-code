import { required } from 'common/validators';
import { t1 } from 'translate';
import RTE from 'schema-form/elements/richtext';

const schema = {
  to: {
    type: 'text',
    hintText: 'email',
    fullWidth: true,
    validate: required(),
  },
  subject: {
    type: 'text',
    hintText: 'subject',
    fullWidth: true,
    validate: required(),
  },
  content: {
    type: RTE,
    hintText: 'email',
    fullWidth: true,
    validate: required(),
  },
  send_right_away: {
    type: 'checkbox',
    label: t1('send_right_away_do_not_go_through_the_job'),
  },
};
const ui = {
  new: [
    {
      fields: ['to', 'subject', 'content', 'send_right_away'],
    },
  ],
};
const layout = {
  new: '',
};
export default { schema, ui, layout };
