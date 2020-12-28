import { t1 } from 'translate';
import { evnEquivalentPositions } from 'components/admin/top-equivalent-position/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import { required, validationWithCondition } from 'common/validators';
import { reportProgressMasterGroupTypeOptions } from 'configs/constants';

import SearchFormLayout from './SearchFormLayout';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  user_organizations: organizations({
    formid,
    label: `${t1('user_organizations')}`,
    defaultValue: props.orgIids,
    validate: [validationWithCondition(required())],
  }),
  user_equivalent_phongbans: academicCategories(formid, {
    label: `${t1('choose_equivalent_phongbans')}`,
  }),
  user_evn_equivalent_positions: evnEquivalentPositions(formid),
  credit_syllabus_organizations: organizations({
    formid,
    label: `${t1('credit_syllabus_organizations')}`,
    defaultValue: props.orgIids,
    validate: [validationWithCondition(required())],
  }),
  credit_syllabus_academic_categories: academicCategories(formid, {
    label: t1('academic_categories'),
  }),
  group_type: {
    floatingLabelText: `${t1('group_type')} (*)`,
    type: 'select',
    fullWidth: true,
    options: reportProgressMasterGroupTypeOptions(),
    defaultValue: 'user.ancestor_organizations',
    validate: [required(t1('group_type_cannot_be_empty'))],
  },
});

const ui = () => [
  {
    id: 'default',
    fields: [
      'credit_syllabus_organizations',
      'credit_syllabus_academic_categories',
      'user_organizations',
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
