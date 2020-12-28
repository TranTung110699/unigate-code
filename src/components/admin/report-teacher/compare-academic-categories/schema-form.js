import { t1 } from 'translate';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';

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
  credit_syllabus_academic_categories: academicCategories(formid, {
    label: t1('academic_categories'),
  }),
  group_type: {
    type: 'hidden',
    defaultValue: 'credit_syllabus.ancestor_academic_categories',
  },
});

const ui = () => [
  {
    id: 'default',
    fields: [
      'user_organizations',
      'user_organization_get_children_level_one',
      'credit_syllabus_academic_categories',
      'group_type',
    ],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
