import { t1 } from 'translate';
import { required } from 'common/validators';
import LayoutFreestyle from './layout-freestyle';
import InputFile from 'schema-form/elements/input-file';

const schema = () => ({
  import_file: {
    type: InputFile,
    accept: ['.xlsx', '.xls', '.xlsm'],
    multiple: true,
    hintText: t1('import_file'),
    fullWidth: true,
    validate: [required(t1('import_file_cannot_be_empty'))],
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['import_file'],
  },
];

export default {
  schema,
  ui,
  layout: {
    component: LayoutFreestyle,
    freestyle: 1,
  },
};
