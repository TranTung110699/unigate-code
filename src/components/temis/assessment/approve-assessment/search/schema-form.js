/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import LayoutFreeStyle from './LayoutFreeStyle';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { leaderPositions } from 'configs/constants/user';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    text: {
      type: 'text',
      hintText: t1('name,_code,_or_email'),
      floatingLabelText: t1('name'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    user_organizations: organizations({
      formid,
      label: `${t1('content_organizations')}`,
      defaultValue: props.orgIids,
      fullWidth: true,
      validate: [],
      organizationRootIids: values.organizationRootIids,
      includeRootOrganizations: values.includeRootOrganizations,
      getOnlyOrganizationWhereUserHasPermission:
        values.getOnlyOrganizationWhereUserHasPermission,
      defaultOrganizations:
        Array.isArray(props.orgIids) && props.orgIids.length > 0
          ? props.orgIids
          : null,
      includeSubOrganizations: 1,
      includeSubOrganizationsLabel: t1('include_users_in_sub_organizations'),
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf),
    status_approve: {
      type: 'multiCheckbox',
      floatingLabelText: t1('status_approved'),
      options: [
        {
          value: 'self-assessment',
          label: t1('self_assessment'),
        },
        {
          value: 'assigned',
          label: t1('assigned_peers_to_assessment'),
        },
        get(props, 'userRoot.leader_position') !== leaderPositions.TEACHER && {
          value: 'approved',
          label: t1('approved'),
        },
      ].filter(Boolean),
      inline: true,
      defaultValue: [],
    },
  };
};

const ui = (step, values) => {
  const fields = [
    'user_organizations',
    'include_sub_organizations',
    'status_approve',
    'text',
  ];

  return [
    {
      id: 'id',
      fields: fields,
    },
  ];
};

const layout = (step, values) => {
  return { component: LayoutFreeStyle, freestyle: 1 };
};

export default {
  schema,
  ui,
  layout,
};
