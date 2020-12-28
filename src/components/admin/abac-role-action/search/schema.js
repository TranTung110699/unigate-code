import { t1 } from 'translate';
import { constants } from 'configs/constants';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid) => ({
  code: {
    type: 'text',
    floatingLabelText: t1('code'),
    // defaultValue: 'name',
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  status: {
    type: 'multiCheckbox',
    options: constants.actionStatusOptions(),
    defaultValue: ['active'],
    inline: true,
    floatingLabelText: t1('status'),
    floatingLabelFixed: false,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['code', 'status'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
