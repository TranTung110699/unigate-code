/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { t1 } from 'translate';
import LayoutFreeStyle from './LayoutFreeStyle';
import OverviewLayoutFreeStyle from './OverviewLayoutFreeStyle';
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
    include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
      defaultValue: 1,
    }),
    type_of_assessment:
      step === 'new_overview'
        ? {
            type: 'radio',
            inline: true,
            fullWidth: true,
            floatingLabelText: t1('type_of_assessment'),
            floatingLabelFixed: true,
            defaultValue: ['tcnn_gv'],
            format: (value) => (value && value[0]) || null,
            normalize: (value) => (value ? [value] : []),
            options: [
              {
                value: 'tcnn_gv',
                label: t1('tcnn-gv_assessment'),
              },
              {
                value: 'tcnn_ht',
                label: t1('tcnn-ht_assessment'),
              },
            ],
          }
        : {
            type: 'multiCheckbox',
            populateValue: true,
            floatingLabelText: t1('type_of_assessment'),
            options: [
              {
                value: 'tcnn_gv',
                label: t1('tcnn-gv_assessment'),
              },
              {
                value: 'tcnn_ht',
                label: t1('tcnn-ht_assessment'),
              },
            ],
            fullWidth: true,
            inline: true,
            defaultValue: ['tcnn_gv'],
          },
    view_type: {
      type: 'radio',
      inline: true,
      fullWidth: true,
      floatingLabelText: t1('view_type'),
      floatingLabelFixed: true,
      defaultValue: 'overview',
      options: [
        {
          primaryText: t1('overview'),
          label: t1('overview'),
          value: 'overview',
        },
        {
          primaryText: t1('view_detail '),
          label: t1('view_detail'),
          value: 'view_detail',
        },
      ],
    },
    status_of_assessment: {
      type: 'multiCheckbox',
      floatingLabelText: t1('type_of_assessment'),
      defaultValue: (values && values.status_of_assessment) || [
        'not_yet',
        'awaiting',
        'not_passed',
        'passed',
      ],
      options: [
        {
          value: 'not_yet',
          label: t1('not_yet_assess'),
        },
        {
          value: 'awaiting',
          label: t1('awaiting_approval'),
        },
        {
          value: 'not_passed',
          label: t1('has_not_passed'),
        },
        {
          value: 'passed',
          label: t1('has_passed'),
        },
      ],
      fullWidth: true,
      inline: true,
    },
  };
};

const ui = (step, values) => {
  if (step === 'new_overview') {
    return [
      {
        id: 'id',
        fields: [
          'text',
          'user_organizations',
          'include_sub_organizations',
          'type_of_assessment',
          'status_of_assessment',
        ],
      },
    ];
  }

  const fields = [
    'user_organizations',
    'include_sub_organizations',
    'type_of_assessment',
    'view_type',
  ];
  if (values && values.view_type === 'view_detail') {
    fields.push('status_of_assessment');
    fields.push('text');
  }
  return [
    {
      id: 'id',
      fields: fields,
    },
  ];
};

const layout = (step, values) => {
  if (step === 'new_overview') {
    return { component: OverviewLayoutFreeStyle, freestyle: 1 };
  }
  return { component: LayoutFreeStyle, freestyle: 1 };
};

export default {
  schema,
  ui,
  layout,
};
