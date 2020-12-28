import { t1 } from 'translate';
import {
  includeSubOrganizations,
  organizationsWithPhongBan,
} from 'components/admin/organization/schema/elements';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    code: {
      type: 'text',
      hintText: t1('code'),
      floatingLabelText: t1('code'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    name: {
      type: 'text',
      hintText: t1('name'),
      floatingLabelText: t1('name'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    organizations: organizationsWithPhongBan({
      formid: formid,
      label: `${t1('organizations')} (*)`,
      defaultValue: props.orgIids,
      shouldGetAllSubTypes: 1,
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
      defaultValue: 1,
    }),
  };
};

const ui = () => [
  {
    id: 'default',
    fields: ['name', 'code', 'organizations', 'include_sub_organizations'],
  },
];

const layout = {
  new: '',
};

export default {
  schema,
  ui,
  layout: {
    component: SearchFormLayoutFreestyle,
    freestyle: 1,
  },
};
