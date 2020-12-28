import { t1 } from 'translate';
import { text } from 'components/admin/group/schema/elements/filterset/filter/query/text';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import loginRequiredLatestSchema from './loginRequiredLatestSchema';
import LayoutFreeStyle from '../../../../../temis/assessment/do-assessment/FormLayoutFreeStyle';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    text: text(t1('user_name,_email,_id_or_code...')),
    user_organizations: organizations({
      formid,
      label: `${t1('content_organizations')}`,
      defaultValue: props.orgIids,
      fullWidth: true,
      organizationRootIids: values.organizationRootIids,
      includeRootOrganizations: values.includeRootOrganizations,
      getOnlyOrganizationWhereUserHasPermission:
        values.getOnlyOrganizationWhereUserHasPermission,
      defaultOrganizations:
        Array.isArray(props.orgIids) && props.orgIids.length > 0
          ? props.orgIids
          : undefined,
      includeSubOrganizations: 0,
      includeSubOrganizationsLabel: t1('include_users_in_sub_organizations'),
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf),
    login_required_latest: {
      type: 'section',
      schema: loginRequiredLatestSchema,
    },
  };
};

const ui = () => [
  {
    id: 'id',
    fields: [
      'text',
      'user_organizations',
      'include_sub_organizations',
      'login_required_latest',
    ],
  },
];

const getLayout = (resendRequiredLogin) => {
  return {
    component: SearchFormLayoutFreestyle,
    freestyle: 1,
    optionsProperties: {
      resendRequiredLogin,
    },
  };
};

export default (resendRequiredLogin) => ({
  schema,
  ui,
  layout: getLayout(resendRequiredLogin),
});
