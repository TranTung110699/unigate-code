import React from 'react';
import { t1 } from 'translate';
// import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import SimpleSubmitForm from 'components/common/forms/SimpleSubmitForm';
import { schoolsSelectBox } from '../common/elements';

const schema = {
  schema: {
    school_slug: schoolsSelectBox({ isRequired: true }),
  },
  ui: () => [
    {
      id: 'id',
      fields: ['school_slug'],
    },
  ],
};

const SyncUserRoleDataInRedisWithDB = () => {
  return (
    <div>
      <h3>{t1('sync_user_role_data_in_redis_with_db')}</h3>
      <div className="text-muted">
        re-cache user roles to redis if they are out of sync with mongo db
      </div>
      <div>
        <SimpleSubmitForm
          schema={schema}
          alternativeApi={aApiUrls.sync_user_role_data_in_redis_with_db}
          formid="sync_user_role_data_in_redis_with_db"
          submitLabel={t1('sync_user_role_data_in_redis_with_db')}
        />
      </div>
    </div>
  );
};

export default SyncUserRoleDataInRedisWithDB;
