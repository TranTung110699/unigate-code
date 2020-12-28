/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  pIids: organizations({
    formid,
    label: t1('belong_to_one_of_theses_organizations'),
    rootIids: values.rootIids,
    includeRoot: 0,
    getOnlyOrganizationWhereUserHasPermission: 1,
    hasSearchDialog: false,
  }),
  text: {
    type: 'text',
    floatingLabelText: t1('name'),
    floatingLabelFixed: true,
    errorText: '',
    fullWidth: true,
  },
  include_sub_organizations: includeSubOrganizations(domainInfo.conf),
  sub_type: {
    type: 'multiCheckbox',
    options: values.orgTypes || [],
    defaultValue: [],
    inline: true,
    floatingLabelText: t1('sub_types'),
    floatingLabelFixed: false,
  },
});

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  const orgTypes = lodashGet(domainInfo, 'school.org_types');

  const fields = ['pIids', 'text', 'include_sub_organizations'];
  if (orgTypes && orgTypes.length > 0) {
    fields.push('sub_type');
  }

  return [
    {
      id: 'default',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
