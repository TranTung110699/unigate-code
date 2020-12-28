import { required } from 'common/validators';
import { t1 } from 'translate';
import RTE from 'schema-form/elements/richtext';

const schema = () => ({
  answer: {
    type: RTE,
    hintText: t1('answer'),
    floatingLabelText: t1('answer'),
    defaultValue: '',
    errorText: '',
    multiLine: true,
    fullWidth: true,
  },
  question: {
    type: 'text',
    floatingLabelText: t1('question'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
});

const ui = {
  new: [
    {
      id: 'default',
      title: t1('new_faq'),
      fields: ['question', 'answer'],
    },
  ],
  edit: [
    {
      id: 'default',
      title: t1('edit_faq'),
      fields: ['question', 'answer'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
