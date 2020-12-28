/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import { constants } from 'configs/constants';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values) => ({
  name: {
    type: 'text',
    floatingLabelText: t1('search_by_name'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  status: {
    type: 'multiCheckbox',
    options: constants.StatusOptions(),
    defaultValue: ['approved', 'queued'],
    inline: true,
    floatingLabelText: t1('status'),
    floatingLabelFixed: false,
  },
});

const ui = (step, values) => {
  const fields = ['name', 'status'];

  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields,
    },
  ];
};

export default { schema, ui };
