import { t1 } from 'translate';
import { evnEquivalentPositions } from 'components/admin/top-equivalent-position/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import { required, validationWithCondition } from 'common/validators';

import SearchFormLayout from './SearchFormLayout';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  user_organizations: organizations({
    formid,
    label: `${t1('user_organizations')}`,
    defaultValue: props.orgIids,
    validate: [validationWithCondition(required())],
  }),
  user_organization_get_children_level_one: {
    type: 'checkbox',
    label: t1('include_affiliated_organizations'),
    name: 'user_organization_get_children_level_one',
    defaultValue: true,
  },
  user_equivalent_phongbans: academicCategories(formid, {
    label: `${t1('choose_equivalent_phongbans')}`,
  }),
  user_evn_equivalent_positions: evnEquivalentPositions(formid),
  group_type: {
    type: 'hidden',
    defaultValue: 'user.ancestor_organizations',
  },
});

const ui = () => [
  {
    id: 'default',
    fields: [
      'user_organizations',
      'user_organization_get_children_level_one',
      'user_equivalent_phongbans',
      'user_evn_equivalent_positions',
      'group_type',
    ],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
