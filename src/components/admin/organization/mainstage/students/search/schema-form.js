import { t1 } from 'translate';
import SearchFormLayoutFreeStyle from './SearchFormLayoutFreeStyle';
import { includeSubOrganizations } from 'components/admin/organization/schema/elements';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    text: {
      type: 'text',
      floatingLabelText: t1('search_students'),
      label: t1('search_students'),
      hintText: t1('please_enter_search_text'),
      floatingLabelFixed: false,
    },
    include_sub_organizations: includeSubOrganizations(domainInfo.conf),
  };
};

const ui = () => {
  return [
    {
      id: 'id',
      fields: ['text', 'include_sub_organizations'],
    },
  ];
};

const layout = {
  component: SearchFormLayoutFreeStyle,
  freestyle: 1,
};

export default { schema, ui, layout };
