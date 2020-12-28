import { t1, t2 } from 'translate';
import { slugifier } from 'common/normalizers';

const schema = () => ({
  address: {
    type: 'select',
    floatingLabelText: t1('choose_address'),
    floatingLabelFixed: true,
    options: 'async',
    fullWidth: true,
  },
  name: {
    type: 'text',
    hintText: t1('enter_name_of_room'),
    floatingLabelText: t1('room_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  code: {
    type: 'text',
    hintText: t1('enter_code_of_room'),
    floatingLabelText: t1('room_code'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    normalize: slugifier,
  },
  candidate_number: {
    type: 'text',
    min: 0,
    hintText: t1('enter_candidate_number'),
    floatingLabelText: t2('candidate_number'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
});

const ui = {
  new: [
    {
      id: 'default',
      title: t1('add_new_room'),
      fields: ['address', 'name', 'code', 'candidate_number'],
    },
  ],
  edit: [
    {
      id: 'default',
      title: t1('edit_room'),
      fields: ['address', 'name', 'code', 'candidate_number'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
