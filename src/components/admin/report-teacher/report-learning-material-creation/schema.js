import LayoutFreestyle from './LayoutFreestyle';
import { t1 } from 'translate';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { change } from 'redux-form';
import Store from 'store';
import { getCurrentUnixTimestamp } from 'common/utils/Date';
import DateTimePicker from 'schema-form/elements/date-time-picker';

const defaultFromDate = getCurrentUnixTimestamp() - 24 * 60 * 60;

const teachingHoursOfTeachersSearchSchema = {
  schema: (formid, values, step, xpath, props, domainInfo) => ({
    organizations: organizations({
      formid,
      label: t1('organizations'),
      onChange: () => Store.dispatch(change(formid, 'user_iid', null)),
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf),
    one_of_ntypes: {
      type: 'multiCheckbox',
      floatingLabelText: t1('type'),
      inline: true,
      options: [
        {
          value: 'contest',
          label: t1('contest'),
        },
        {
          value: 'syllabus',
          label: t1('syllabus'),
        },
        {
          value: 'enrolment_plan',
          label: t1('enrolment_plan'),
        },
      ],
    },
    from_ts: {
      type: DateTimePicker,
      getStartDate: true,
      fullWidth: true,
      floatingLabelText: t1('from_time'),
      defaultValue: defaultFromDate,
    },
    to_ts: {
      type: DateTimePicker,
      getEndDate: true,
      fullWidth: true,
      floatingLabelText: t1('to_time'),
    },
  }),
  ui: () => [
    {
      id: 'default',
      fields: [
        // 'organizations',
        // 'include_sub_organizations',
        'one_of_ntypes',
        'from_ts',
        'to_ts',
      ],
    },
  ],
  layout: {
    component: LayoutFreestyle,
    freestyle: 1,
  },
};

export default teachingHoursOfTeachersSearchSchema;
