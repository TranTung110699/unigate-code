/* eslint-disable jsx-a11y/anchor-is-valid */
import { required } from 'common/validators/index';
import { t1 } from 'translate/index';
import apiUrls from 'api-endpoints/index';
import InputAutoComplete from 'schema-form/elements/input-auto-complete/index';

const commentSchema = (formid, values) => {
  const params = {
    _sand_step: 'staff',
    user_organizations: values.user_organizations || [],
  };

  if (values.resourceIids) {
    params.syllabusIid = values.resourceIids && values.resourceIids[0];
  }

  if (values.actions) {
    params.actions = values.actions;
  }

  return {
    users: {
      type: InputAutoComplete,
      baseUrl: apiUrls.user_search,
      dataSourceConfig: {
        text: 'name',
        value: 'data',
        valueKeys: ['name', 'iid', 'id', 'avatar'],
        transformData: true,
      },
      params,
      floatingLabelText: t1('find_user'),
      fullWidth: true,
      validate: [required(t1('users_cannot_be_empty'))],
    },
    comment: {
      type: 'text',
      styleWrapper: {
        border: '1px solid #eee',
        padding: '5px 10px 0 10px',
      },
      multiLine: true,
      rows: 6,
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      validate: [required(t1("comment_can't_be_empty"))],
    },
  };
};

const ui = () => [
  {
    id: 'default',
    fields: ['users', 'comment'],
  },
];

const layout = {
  new: '',
};

export default { schema: commentSchema, ui, layout };
