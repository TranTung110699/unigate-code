import { required } from 'common/validators/index';
import { t1 } from 'translate/index';

const commentSchema = (formid, values) => ({
  comment: {
    type: 'text',
    multiLine: true,
    styleWrapper: {
      border: '1px solid #eee',
      padding: '5px 10px 0 10px',
    },
    rows: 6,
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("comment_approval_is_required_and_can't_be_empty"))],
  },
});

const ui = (step, values) => [
  {
    id: 'default',
    title: t1(`comment_to_${values.action || ''}`),
    fields: ['comment'],
  },
];

const layout = {
  new: '',
};

export default { schema: commentSchema, ui, layout };
