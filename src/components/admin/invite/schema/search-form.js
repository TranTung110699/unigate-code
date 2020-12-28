import { t1 } from 'translate';
import { organizations } from 'components/admin/organization/schema/elements';
import { required, validationWithCondition } from 'common/validators';
import { schoolTypes } from 'configs/constants';
import lodashGet from 'lodash.get';
import LayoutFreestyle from './enrolment-session-search-form-layout-freestyle';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  text: {
    type: 'text',
    floatingLabelText: t1('name'),
    // defaultValue: 'name',
    floatingLabelFixed: true,
    errorText: '',
    fullWidth: true,
  },
  organizations: organizations({
    formid,
    label: `${t1('organizations')} (*)`,
    hintText: `${t1('organizations')} (*)`,
    defaultValue: props.orgIids,
    validate: [validationWithCondition(required(), values.requireOrganization)],
  }),
  status: {
    type: 'multiCheckbox',
    options: [
      {
        name: 'queued',
        value: 'queued',
        label: t1('queued'),
        primaryText: t1('queued'),
      },
      {
        name: 'approved',
        value: 'approved',
        label: t1('approved'),
        primaryText: t1('approved'),
      },
      {
        name: 'executed',
        value: 'executed',
        label: t1('executed'),
        primaryText: t1('executed'),
      },
    ],
    defaultValue: ['approved', 'queued', 'executed'],
    inline: true,
    floatingLabelText: t1('status'),
  },
});

const ui = (step, values) => [
  {
    id: 'id',
    fields: [
      'text',
      lodashGet(values, 'themeConfig.type') === schoolTypes.SIS
        ? null
        : 'organizations',
      'status',
    ].filter(Boolean),
  },
];

export default {
  schema,
  ui,
  layout: { component: LayoutFreestyle, freestyle: 1 },
};
