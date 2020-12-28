import {
  users,
  emailsAsInputToken,
} from 'components/admin/user/schema/elements';
import { filterObjectKeys } from 'common/utils/object';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';

const schema = (
  formid,
  values,
  step,
  xpath,
  props,
  domainInfo,
  themeConfig,
) => {
  return {
    users: users({
      formid,
      label: t1('find_staff'),
      isStaff: 1,
    }),
    emails: emailsAsInputToken(),
  };
};

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  return [
    {
      id: 'fields',
      fields: ['users', 'emails'],
    },
  ];
};

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

export const validate = (fullData) => {
  const users = lodashGet(fullData, 'users');
  const emails = lodashGet(fullData, 'emails');

  if ((!users || users.length === 0) && (!emails || emails.length === 0)) {
    return {
      _error: t1('either_users_for_emails_must_be_presented'),
    };
  }

  return {};
};

export default {
  schema,
  ui,
  finalProcessBeforeSubmit,
  validate,
};
