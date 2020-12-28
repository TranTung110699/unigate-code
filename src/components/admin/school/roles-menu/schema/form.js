import { t1 } from 'translate';
import { getMenuNavOptions } from 'utils/Util';
import adminMenuItems from 'layouts/admin_v2/menu-left/menu-schema/';

const schema = (formid, values) => ({
  roles: {
    type: 'multiCheckbox',
    iconStyle: { marginTop: 6 },
    floatingLabelText: t1('roles'),
    options: getMenuNavOptions(
      adminMenuItems({ domain: 'admin' }),
      values && values.admin_menu_nav,
    ),
    container: 'inline',
    floatingLabelFixed: true,
  },
});

const ui = {
  edit_roles_nav: [
    {
      id: 'default',
      fields: ['roles'],
    },
  ],
};

const layout = {};

export default { schema, ui, layout };
