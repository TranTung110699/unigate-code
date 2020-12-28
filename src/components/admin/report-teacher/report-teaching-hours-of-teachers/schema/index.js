import {
  TeachingHoursOfTeachersSearchFormCurrentContractInfoSectionLayout,
  TeachingHoursOfTeachersSearchFormLayout,
} from './layouts';
import { users } from 'components/admin/user/schema/elements';
import { t1 } from 'translate';
import { organizations } from 'components/admin/organization/schema/elements';
import { change } from 'redux-form';
import Store from 'store';
import { getTimestampTheEndADay } from 'common/utils/Date';
import { required } from 'common/validators';
import DatePicker from 'schema-form/elements/date-picker';

const defaultToDate = getTimestampTheEndADay();
const defaultFromDate = defaultToDate - 30 * 24 * 60 * 60;

const teachingHoursOfTeachersSearchSchema = {
  schema: (formid, values) => ({
    organizations: organizations({
      formid,
      label: t1('organizations'),
      onChange: () => Store.dispatch(change(formid, 'user_iid', null)),
    }),
    user_iid: users({
      formid,
      label: t1('user'),
      isStaff: 1,
      valueKey: 'iid',
      fullWidth: true,
      organizations: values.organizations,
    }),
    current_contract_info: {
      type: 'section',
      schema: {
        schema: {
          text: {
            type: 'text',
            floatingLabelText: t1('contract_name_or_code'),
            hintText: t1('contract_name_or_code'),
            fullWidth: true,
          },
          start_date_from: {
            type: DatePicker,
            hintText: t1('contract_start_date'),
            floatingLabelText: t1('contract_start_date'),
            getStartDate: true,
            fullWidth: true,
          },
          end_date_to: {
            type: DatePicker,
            hintText: t1('contract_end_date'),
            floatingLabelText: t1('contract_end_date'),
            getEndDate: true,
            fullWidth: true,
          },
          is_full_time_teacher: {
            type: 'multiCheckbox',
            hintText: t1('contract_type'),
            floatingLabelText: t1('contract_type'),
            multiple: true,
            options: [
              {
                value: 0,
                label: t1('part_time'),
              },
              {
                value: 1,
                label: t1('full_time'),
              },
            ],
            fullWidth: true,
            inline: true,
          },
        },
        ui: () => [
          {
            id: 'default',
            fields: [
              'text',
              'start_date_from',
              'end_date_to',
              'is_full_time_teacher',
            ],
          },
        ],
        layout: {
          component: TeachingHoursOfTeachersSearchFormCurrentContractInfoSectionLayout,
          freestyle: 1,
        },
      },
    },
    from_date: {
      type: DatePicker,
      getStartDate: true,
      fullWidth: true,
      floatingLabelText: t1('from_date'),
      validate: [required()],
      defaultValue: defaultFromDate,
    },
    to_date: {
      type: DatePicker,
      getEndDate: true,
      fullWidth: true,
      floatingLabelText: t1('to_date'),
      validate: [required()],
      defaultValue: defaultToDate,
    },
  }),
  ui: () => [
    {
      id: 'default',
      fields: [
        'organizations',
        'user_iid',
        'current_contract_info',
        'from_date',
        'to_date',
      ],
    },
  ],
  layout: {
    component: TeachingHoursOfTeachersSearchFormLayout,
    freestyle: 1,
  },
};

export default teachingHoursOfTeachersSearchSchema;
