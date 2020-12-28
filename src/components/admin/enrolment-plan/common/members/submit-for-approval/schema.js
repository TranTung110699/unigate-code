import { t1 } from 'translate';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import { required } from 'common/validators';
import lodashGet from 'lodash.get';
import { filterObjectKeys } from 'common/utils/object';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import RTE from 'schema-form/elements/richtext';

const schema = (formid, values) => {
  return {
    users: {
      type: InputAutoComplete,
      baseUrl: apiUrls.search_user_who_can_approve_enrolment_plan_members,
      dataSourceConfig: {
        text: 'name',
        value: 'iid',
        transformData: (res) =>
          res.map((user) => ({
            name: `${lodashGet(user, 'name')} ${lodashGet(user, 'code') &&
              `(${lodashGet(user, 'code')})`}`,
            iid: user,
          })),
      },
      params: {
        enrolment_plan_iid: values.enrolment_plan_iid,
      },
      floatingLabelText: t1('find_user'),
      fullWidth: true,
      validate: [required(t1('users_cannot_be_empty'))],
    },
    comment: {
      type: RTE,
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      validate: [required(t1("comment_can't_be_empty"))],
    },
  };
};

const ui = () => [
  {
    fields: ['users', 'comment'],
    id: 'default',
  },
];

const finalProcessBeforeSubmit = (fullData) => {
  const users = lodashGet(fullData, 'users');
  return {
    ...fullData,
    users:
      users &&
      users.map((user) =>
        filterObjectKeys(user, ['id', 'iid', 'name', 'mail', 'phone']),
      ),
  };
};

export default { schema, ui, finalProcessBeforeSubmit };
