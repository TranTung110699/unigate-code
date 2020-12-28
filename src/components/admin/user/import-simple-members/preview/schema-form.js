/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import { constants } from 'configs/constants';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values) => ({
  code: {
    type: 'text',
    floatingLabelText: t1('search_by_code'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  status: {
    type: 'multiCheckbox',
    options: constants.importStatusesOptions(),
    defaultValue: ['available', 'error'],
    inline: true,
    floatingLabelText: t1('status'),
    floatingLabelFixed: false,
  },
});

const ui = (step, values) => {
  const fields = ['code', 'status'];

  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1, isSIS: true },
};
