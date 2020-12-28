import React from 'react';
import { t1 } from 'translate';
// import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import SimpleSubmitForm from 'components/common/forms/SimpleSubmitForm';

const RemoveWrongUserOrganizationsRoles = () => {
  return (
    <div>
      <h3>{t1('remove_wrong_user_organizations_roles')}</h3>
      <div className="text-muted">
        Sometimes because of bugs, users have roles in organizations that they
        do not belong to. This action is used to fix that.
      </div>
      <div>
        <SimpleSubmitForm
          alternativeApi={aApiUrls.remove_wrong_user_organizations_roles}
          formid="remove_wrong_user_organizations_roles"
          submitLabel={t1('remove_wrong_user_organizations_roles')}
        />
      </div>
    </div>
  );
};

export default RemoveWrongUserOrganizationsRoles;
