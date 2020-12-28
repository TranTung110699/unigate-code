import { t1 } from 'translate';

const schema = () => ({
  name: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: t1('name'),
  },
  host: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: t1('host'),
  },
  dn: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: `${t1('dn')} ex:dc=example,dc=com`,
  },
  port: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: t1('port'),
  },
});

const ui = () => [
  {
    id: 'edit_ldamServer',
    fields: ['name', 'host', 'dn', 'port'],
  },
];

const layout = {};

export default { schema, ui, layout };
