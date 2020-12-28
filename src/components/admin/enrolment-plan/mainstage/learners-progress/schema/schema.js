import { t1 } from 'translate';
import {
  includeSubOrganizations,
  organizationsWithPhongBan,
} from 'components/admin/organization/schema/elements';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  const $passedOptions = [
    {
      name: t1('passed_course'),
      value: 'passed_course',
      label: t1('passed_course'),
      primaryText: t1('passed_course'),
    },
    {
      name: t1('passed_enrolment_plan'),
      value: 'passed_enrolment_plan',
      label: t1('passed_enrolment_plan'),
      primaryText: t1('passed_enrolment_plan'),
    },
    {
      name: t1('not_yet_started_leaning'),
      value: 'not_yet_started_leaning',
      label: t1('not_yet_started_leaning'),
      primaryText: t1('not_yet_started_leaning'),
    },
    {
      name: t1('all'),
      value: 'all',
      label: t1('all'),
      primaryText: t1('all'),
    },
  ];

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
    passed: {
      type: 'radio',
      options: $passedOptions,
      floatingLabelText: t1(''),
      defaultValue: 'all',
      inline: true,
    },
    organizations: organizationsWithPhongBan({
      formid: formid,
      label: `${t1('organizations')} (*)`,
      defaultValue: props.orgIids,
      shouldGetAllSubTypes: 1,
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf),
  };
};

const ui = () => [
  {
    id: 'default',
    fields: [
      'name',
      'code',
      'passed',
      'organizations',
      'include_sub_organizations',
    ],
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
