/* eslint-disable jsx-a11y/anchor-is-valid,quotes */
import aApiUrls from 'components/admin/abac-role/endpoints';
import { t1 } from 'translate';

const schema = (formid, values) => ({
  role_iids: {
    type: 'multiCheckbox',
    options: 'async',
    fullWidth: true,
    floatingLabelText: t1('roles'),
    errorText: t1('loading_roles_from_server'),
    vertical: true,
    paramsasync: {
      __url__: aApiUrls.get_role_options,
      value: {
        ...(values && values.fetchRoleOptionParams),
      },
      valueKey: 'value',
    },
  },
});

const editDefault = [
  {
    id: 'default',
    fields: ['role_iids'],
  },
];

const ui = () => editDefault;

export default { schema, ui };
