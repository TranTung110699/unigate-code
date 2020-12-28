import { isNumber, required } from 'common/validators';
import { t1 } from 'translate';
import { degreeKeys } from 'configs/constants';
import Attachments from 'schema-form/elements/attachments';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = () => ({
  name: {
    type: 'text',
    floatingLabelText: t1('name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  key: {
    type: 'select',
    options: degreeKeys(),
    floatingLabelText: t1('key'),
    defaultValue: 'full_name',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  template: {
    type: Attachments,
    label: t1('add_template'),
    allowDownload: true,
    multiple: false,
    fullWidth: true,
  },
  color: {
    type: 'text',
    floatingLabelText: t1('text_color'),
    errorText: '',
    defaultValue: '#000000',
    fullWidth: true,
  },
  font_size: {
    type: 'text',
    floatingLabelText: t1('font_size'),
    errorText: '',
    defaultValue: '14',
    validate: [
      required(t1("value_is_required_and_can't_be_empty")),
      isNumber(t1('value_is_number')),
    ],
    fullWidth: true,
  },
  font_family: {
    type: 'select',
    options: 'async',
    floatingLabelText: t1('font_family'),
    defaultValue: 0,
    errorText: '',
    fullWidth: true,
  },
  programs: {
    nameElement: 'targets',
    optionsProperties: {
      classNameWrapper: 'targets-wrapper',
      classNameEditorWrapper: 'targets-wrapper-editor',
      style: {
        'overflow-y': 'scroll',
        'overflow-x': 'hidden',
        maxHeight: 300,
        paddingRight: 10,
      },
    },
    type: InputAutoComplete,
    baseUrl: '/path/search?type=program&status[]=approved',
    dataSourceConfig: {
      text: 'name',
      value: 'id',
    },
    floatingLabelText: t1('find_program_apply'),
    fullWidth: true,
  },
  x: {
    type: 'text',
    floatingLabelText: t1('x_(px)'),
    errorText: '',
    defaultValue: '',
    validate: [
      required(t1("value_is_required_and_can't_be_empty")),
      isNumber(t1('value_is_number')),
    ],
    fullWidth: true,
  },
  y: {
    type: 'text',
    floatingLabelText: t1('y_(px)'),
    errorText: '',
    defaultValue: '',
    validate: [
      required(t1("value_is_required_and_can't_be_empty")),
      isNumber(t1('value_is_number')),
    ],
    fullWidth: true,
  },
  char_breadcrumb_length: {
    type: 'text',
    floatingLabelText: t1('char_breadcrumb_length'),
    errorText: '',
    defaultValue: '',
    validate: [
      required(t1("value_is_required_and_can't_be_empty")),
      isNumber(t1('value_is_number')),
    ],
    fullWidth: true,
  },
  line_space: {
    type: 'text',
    floatingLabelText: t1('line_space'),
    errorText: '',
    defaultValue: '',
    validate: [
      required(t1("value_is_required_and_can't_be_empty")),
      isNumber(t1('value_is_number')),
    ],
    fullWidth: true,
  },
});

const ui = {
  new: [
    {
      id: 'default',
      title: t1('new_degree'),
      fields: ['name'],
    },
  ],
  edit: [
    {
      id: 'default',
      title: t1('edit_degree'),
      fields: ['name', 'template'],
    },
  ],
  new_add_text: [
    {
      id: 'default',
      fields: [
        'key',
        'color',
        'font_size',
        'font_family',
        'x',
        'y',
        'char_breadcrumb_length',
        'line_space',
      ],
    },
  ],
  edit_edit_text: [
    {
      id: 'edit_edit_text',
      fields: [
        'color',
        'font_size',
        'font_family',
        'x',
        'y',
        'char_breadcrumb_length',
        'line_space',
      ],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
