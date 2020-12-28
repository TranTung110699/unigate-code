import { users } from 'components/admin/user/schema/elements';
import { t1 } from 'translate';
import { required } from 'common/validators';
import lodashGet from 'lodash.get';
import apiUrls from 'api-endpoints';
import Store from 'store';
import { change } from 'redux-form';
import {
  timeSheetStatuses,
  timeSheetStatusOptions,
} from 'configs/constants/timesheet';
import LayoutFreestyle from './LayoutFreestyle';
import DateTimePicker from 'schema-form/elements/date-time-picker';
import RTE from 'schema-form/elements/richtext';

const statusOptions = () =>
  timeSheetStatusOptions().filter(
    ({ value }) => ![timeSheetStatuses.DELETED].includes(value),
  );

const getSelectedUserIid = (values) =>
  // for edit
  lodashGet(values, 'user.iid') ||
  // for new
  lodashGet(values, 'user[0].iid');

const schema = (formid, values) => {
  const selectedUserIid = getSelectedUserIid(values);

  return {
    user: users({
      formid,
      label: t1('user'),
      isRequired: 1,
      limit: 1,
      isStaff: 1,
      onChange: () => Store.dispatch(change(formid, 'contract_iid', null)),
      fullWidth: true,
    }),
    contract_iid: {
      type: 'select',
      floatingLabelText: t1('contract'),
      validate: [required()],
      options: 'async',
      disabled: !selectedUserIid,
      paramsasync: {
        key: `user_contract_${selectedUserIid}`,
        __url__: apiUrls.contract_search,
        value: {
          employee_iid: selectedUserIid,
          status: ['approved'],
        },
        transformData: (data) => {
          if (!Array.isArray(data) || !data.length) {
            return [];
          }

          return data.map((c) => ({
            value: lodashGet(c, 'iid'),
            primaryText: lodashGet(c, 'name'),
          }));
        },
      },
      fullWidth: true,
    },
    name: {
      type: 'text',
      floatingLabelText: t1('work_name'),
      fullWidth: true,
      floatingLabelFixed: false,
      validate: [required()],
    },
    duration: {
      type: 'number',
      floatingLabelText: `${t1('duration')} (h)`,
      fullWidth: true,
      floatingLabelFixed: false,
      validate: [required()],
    },
    time: {
      type: DateTimePicker,
      floatingLabelText: `${t1('time')}`,
      fullWidth: true,
      validate: [required()],
    },
    status: {
      type: 'select',
      floatingLabelText: `${t1('status')} (h)`,
      fullWidth: true,
      validate: [required()],
      options: statusOptions(),
    },
    note: {
      type: RTE,
      hintText: t1('note'),
      fullWidth: true,
      floatingLabelText: t1('note'),
    },
  };
};

const ui = (step, values) => {
  const config = {
    new: [
      {
        id: 'default',
        fields: [
          'user',
          'contract_iid',
          'name',
          'duration',
          'time',
          'status',
          'note',
        ],
      },
    ],
    edit: [
      {
        id: 'default',
        fields: ['contract_iid', 'name', 'duration', 'time', 'status', 'note'],
      },
    ],
  };
  return config[step];
};

const finalProcessBeforeSubmit = (fullData) => {
  const selectedUserIid = getSelectedUserIid(fullData);

  return Object.assign({}, fullData, {
    user_iid: selectedUserIid,
    user: null,
  });
};

export default {
  schema,
  ui,
  layout: {
    component: LayoutFreestyle,
    freestyle: 1,
  },
  finalProcessBeforeSubmit,
};
