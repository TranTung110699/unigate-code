import { t1 } from 'translate';
import { organizations } from 'components/admin/organization/schema/elements';
import { required } from 'common/validators';
import { userGradeOptions, userGrades } from 'configs/constants/user';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  organizations: organizations({
    formid,
    multiple: false,
    label: `${t1('organizations')}`,
    defaultValue: props.orgIids,
    validate: required(t1('organization_can_not_empty')),
  }),
  grade: {
    type: 'select',
    defaultValue: userGrades.PRIMARY,
    options: userGradeOptions(),
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['organizations', 'grade'],
  },
];

export default {
  schema,
  ui,
};
