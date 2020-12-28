import React from 'react';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import SimpleSubmitForm from 'components/common/forms/SimpleSubmitForm';

const schema = {
  schema: {
    user_mails: {
      type: 'text',
      floatingLabelText: "users' mail",
      placeholder: 'one line = one mail',
      multiLine: true,
    },
    enrolment_plan_iids: {
      type: 'text',
      floatingLabelText:
        'remove from courses in these enrolment plan iids only',
      placeholder: 'one line = one iid',
      multiLine: true,
    },
    exclude_credit_syllabus_iids: {
      type: 'text',
      floatingLabelText: 'exclude courses with credit syllabus iids',
      placeholder: 'one line = one iid',
      multiLine: true,
    },
  },
  ui: () => [
    {
      id: 'id',
      fields: [
        'user_mails',
        'enrolment_plan_iids',
        'exclude_credit_syllabus_iids',
      ],
    },
  ],
};

const FixUserRoleDataInRedis = () => {
  return (
    <div>
      <h3>{t1('remove_users_from_all_courses')}</h3>
      <div className="text-muted">
        Remove users from every courses that they are in.
      </div>
      <div>
        <SimpleSubmitForm
          schema={schema}
          alternativeApi={apiUrls.remove_users_from_all_courses}
          formid="remove_users_from_all_courses"
          submitLabel={t1('remove_users_from_all_courses')}
        />
      </div>
    </div>
  );
};

export default FixUserRoleDataInRedis;
