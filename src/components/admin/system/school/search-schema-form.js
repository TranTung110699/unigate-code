import { t1 } from 'translate';
import { constants } from 'configs/constants';

const schema = () => ({
  slug: {
    type: 'text',
    floatingLabelText: t1('slug'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
    // defaultValue: 've',
  },
  name: {
    type: 'text',
    floatingLabelText: t1('name'),
    // defaultValue: 'name',
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

const ui = () => [
  {
    id: 'id', // you still have to have this id even for freestyle
    fields: ['slug', 'name', 'status'],
  },
];

export default { schema, ui };
