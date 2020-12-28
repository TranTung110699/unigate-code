import { t1 } from 'translate';
import { constants } from 'configs/constants';
import SearchFormLayout from './SearchFormLayout';
import { requestTypeElement } from '../../schema/elements';

const status = constants.StatusOptions();

const schema = (values) => ({
  name: {
    type: 'text',
    floatingLabelText: t1('name'),
    label: 'enter_name',
    floatingLabelFixed: true,
    fullWidth: true,
  },
  type: requestTypeElement({
    type: 'multiCheckbox',
    inline: true,
    floatingLabelText: t1('group_request_type'),
    paramsasync: {
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }
        return data.map((val) => ({
          value: val,
          label: t1(val),
          primaryText: t1(val),
        }));
      },
    },
  }),
  status: {
    type: 'multiCheckbox',
    floatingLabelText: t1('status'),
    floatingLabelFixed: true,
    defaultValue: status.map((map) => map.value),
    options: status,
    inline: true,
    fullWidth: true,
  },
});

const ui = () => [
  {
    id: 'id',
    fields: ['name', 'type', 'status'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
