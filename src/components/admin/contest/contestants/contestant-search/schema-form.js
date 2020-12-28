import { t1 } from 'translate';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import {
  examShiftsSelectBox,
  examRoundsSelectBox,
} from 'components/admin/contest/common/elements';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { positions } from 'components/admin/job-position/schema/elements';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    exam_round_iid: examRoundsSelectBox(values, {}, true),
    exam_shift_iid: examShiftsSelectBox(values),
    q: {
      type: 'text',
      floatingLabelText: t1('search_contestant_(name,_email...)'),
      floatingLabelFixed: false,
      errorText: '',
      fullWidth: true,
    },
    codes: {
      type: 'text',
      floatingLabelText: t1('search_by_codes'),
      hintText: `${t1('ex:_3awQMtU4,_CPB3A5To')}...`,
      floatingLabelFixed: false,
      errorText: '',
      fullWidth: true,
    },
    positions: positions(formid, {}, [], {
      notRequiredOrganization: 1,
    }),
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
  };
};

const ui = (step, values) => [
  {
    id: 'id',
    fields: [
      'exam_round_iid',
      'exam_shift_iid',
      'q',
      'codes',
      'user_organizations',
      'include_sub_organizations',
      'positions',
    ],
  },
];

export default {
  schema,
  ui,
  layout: {
    component: SearchFormLayoutFreestyle,
    freestyle: 1,
  },
};
