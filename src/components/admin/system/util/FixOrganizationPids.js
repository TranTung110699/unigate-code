import React from 'react';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import SimpleSubmitForm from 'components/common/forms/SimpleSubmitForm';
import { schoolsSelectBox } from 'components/admin/system/common/elements';

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

const FixOrganizationPids = (props) => {
  return (
    <div>
      <h3>{t1('fix_organization_pids')}</h3>
      <div className="text-muted">
        Use this when some departments wrongly have pid === "0" We will use the
        data synced from hrms to fix them
      </div>
      <div>
        <SimpleSubmitForm
          schema={schema}
          hiddenFields={{
            start_again: 1,
          }}
          alternativeApi={
            apiUrls.reset_organizations_pid_from_department_parent_id
          }
          formid="fix_organization_pids"
          submitLabel="fix organization pids"
        />
      </div>
    </div>
  );
};

export default FixOrganizationPids;
