import { t1 } from 'translate';
import Rating from 'schema-form/elements/rating';
import RTE from 'schema-form/elements/richtext';

const schema = () => ({
  result__rating: {
    type: Rating,
    count: 5,
    size: 24,
    color2: '#ffd700',
    label: t1('feedback_rating'),
  },
  result__content: {
    type: RTE,
    hintText: t1('enter_content_of_feedback'),
    floatingLabelText: t1('feedback_content'),
    defaultValue: '',
    errorText: '',
    multiLine: true,
    fullWidth: true,
  },
});

const ui = {
  new: [
    {
      id: 'default',
      fields: ['result__rating', 'result__content'],
    },
  ],
  edit: [
    {
      id: 'default',
      fields: ['result__rating', 'result__content'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
