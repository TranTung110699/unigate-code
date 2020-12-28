import { required } from 'common/validators';
import { constants } from 'configs/constants';
import { t1 } from 'translate';

const schema = (formid) => ({
  name: {
    type: 'text',
    hintText: t1('typing_name_of_role'),
    floatingLabelText: t1(
      'group_code_name._this_cannot_be_change_after_created',
    ),
    defaultValue: '',
    errorText: '',
    validate: [required(t1('name_cannot_be_empty'))],
    fullWidth: true,
  },
  cname: {
    type: 'text',
    hintText: t1('enter_name_of_role'),
    floatingLabelText: t1('group_name'),
    defaultValue: '',
    errorText: '',
    validate: [required(t1('name_cannot_be_empty'))],
    fullWidth: true,
  },
  g: {
    type: 'multiCheckbox',
    floatingLabelText: t1('roles'),
    errorText: t1('loading_roles_list_from_server'),
    options: 'async',
    vertical: true,
    validate: [required(t1('name_cannot_be_empty'))],
    fullWidth: true,
  },
  status: {
    type: 'select',
    floatingLabelText: t1('statuses'),
    options: constants.RoleStatusOptions(),
    vertical: true,
    floatingLabelFixed: true,
    fullWidth: true,
  },
});

const ui = {
  new: [
    {
      id: 'default',
      title: t1('add_new_role_group'),
      fields: ['name', 'cname', 'g', 'status'],
    },
  ],
  edit_role: [
    {
      id: 'default',
      title: t1('edit_new_role_group'),
      fields: ['name', 'cname', 'g', 'status'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
