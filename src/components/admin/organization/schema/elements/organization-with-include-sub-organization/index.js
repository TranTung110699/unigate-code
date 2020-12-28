import React from 'react';
import { t1, t3 } from 'translate/index';
import { required, validationWithCondition } from 'common/validators';

import Organizations from './Organizations';

const userOrganizationsWithSubOrganizationCheckbox = (
  formid,
  values,
  localStep,
  xpath,
  props,
  domainInfo,
) => {
  return {
    type: 'cascade',
    component: (
      <Organizations
        formValues={values}
        formid={formid}
        xpath={xpath}
        validate={[
          validationWithCondition(required(), values.requireOrganization),
        ]}
        organizationRootIids={values.organizationRootIids}
        includeRootOrganizations={values.includeRootOrganizations}
        getOnlyOrganizationWhereUserHasPermission={
          values.getOnlyOrganizationWhereUserHasPermission
        }
        defaultOrganizations={
          Array.isArray(props.orgIids) && props.orgIids.length > 0
            ? props.orgIids
            : undefined
        }
        includeSubOrganizations={0}
        includeSubOrganizationsLabel={t1('include_users_in_sub_organizations')}
      />
    ),
  };
};

export default userOrganizationsWithSubOrganizationCheckbox;
