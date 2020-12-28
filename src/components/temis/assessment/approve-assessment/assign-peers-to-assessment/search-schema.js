/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { t1 } from 'translate';
import { leaderPositions } from 'configs/constants/user';
import LayoutFreeStyle from './LayoutFreeStyle';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';

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
    leader_position: {
      type: 'multiCheckbox',
      inline: true,
      fullWidth: true,
      floatingLabelText: t1('leader_position'),
      floatingLabelFixed: true,
      defaultValue: [
        leaderPositions.TEACHER,
        leaderPositions.LEADER,
        leaderPositions.VICE_LEADER,
      ],
      options: [
        {
          value: leaderPositions.TEACHER,
          label: t1(leaderPositions.TEACHER),
        },
        {
          value: leaderPositions.LEADER,
          label: t1(leaderPositions.LEADER),
        },
        {
          value: leaderPositions.VICE_LEADER,
          label: t1(leaderPositions.VICE_LEADER),
        },
      ],
    },
  };
};

const ui = (step, values) => {
  const fields = [
    'user_organizations',
    'include_sub_organizations',
    'leader_position',
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
