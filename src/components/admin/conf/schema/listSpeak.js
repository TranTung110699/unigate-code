import { t1 } from 'translate';
import InputFile from 'schema-form/elements/input-file';

const schema = () => ({
  name: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: t1('name'),
  },
  avatar: {
    name: 'avatar',
    type: InputFile,
    hintText: t1('avatar'),
    fullWidth: true,
  },
});

const ui = () => [
  {
    id: 'edit_speakers',
    fields: ['name', 'avatar'],
  },
];

const layout = {};

export default { schema, ui, layout };
