import React from 'react';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import SimpleSubmitForm from 'components/common/forms/SimpleSubmitForm';

const schema = {
  schema: {
    course_iid: {
      type: 'text',
      floatingLabelText: 'course_iid',
    },
    histories_ts: {
      type: 'text',
      floatingLabelText: 'timestamp',
    },
  },
  ui: () => [
    {
      id: 'id',
      fields: ['course_iid', 'histories_ts'],
    },
  ],
};

const FixUserRoleDataInRedis = () => {
  return (
    <div>
      <h3>{t1('remove_course_sinvites_in_a_timestamp')}</h3>
      <div className="text-muted">
        Given a course and a timestamp, remove all sinvites in that timestamp of
        the course. Use when you accidentally import or add all enrolment plan
        users to course.
      </div>
      <div>
        <SimpleSubmitForm
          schema={schema}
          alternativeApi={apiUrls.remove_course_sinvites_in_a_timestamp}
          formid="remove_course_sinvites_in_a_timestamp"
          submitLabel={t1('remove_course_sinvites_in_a_timestamp')}
        />
      </div>
    </div>
  );
};

export default FixUserRoleDataInRedis;
