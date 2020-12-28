import { required } from 'common/validators';
import { t1 } from 'translate';
import RTE from 'schema-form/elements/richtext';
import { inRange } from '../../../../common/validators';

const codeLength = [
  {
    value: 6,
    primaryText: t1('6'),
  },
  {
    value: 7,
    primaryText: t1('7'),
  },
  {
    value: 8,
    primaryText: t1('8'),
  },
  {
    value: 9,
    primaryText: t1('9'),
  },
];

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  name: {
    type: 'text',
    floatingLabelText: t1('package_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  description: {
    type: RTE,
    hintText: t1('enter_description'),
    floatingLabelText: t1('description'),
    defaultValue: '',
    errorText: '',
  },
  money: {
    type: 'number',
    floatingLabelText: t1('money'),
    defaultValue: '',
    errorText: '',
    hintText: 'e.g: 100',
    fullWidth: true,
    validate: [
      required(t1("value_is_required_and_can't_be_empty")),
      inRange(0, null, t1('value_must_be_greater_than_%s', [0])),
    ],
    min: 0,
  },
  vmoney: {
    type: 'number',
    floatingLabelText: t1('vmoney'),
    defaultValue: '',
    errorText: '',
    hintText: 'e.g: 100',
    fullWidth: true,
    validate: [
      required(t1("value_is_required_and_can't_be_empty")),
      inRange(0, null, t1('value_must_be_greater_than_%s', [0])),
    ],
    min: 0,
  },
  counter__total_card: {
    type: 'number',
    floatingLabelText: t1('how_many_cards'),
    hintText: 'e.g: 100',
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [
      required(t1("value_is_required_and_can't_be_empty")),
      inRange(0, null, t1('value_must_be_greater_than_%s', [0])),
    ],
    min: 0,
  },
  counter__seri_length: {
    type: 'select',
    floatingLabelText: t1('seri_length'),
    floatingLabelFixed: true,
    options: codeLength,
    fullWidth: true,
    defaultValue: 6,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  counter__pin_length: {
    type: 'select',
    floatingLabelText: t1('pin_length'),
    floatingLabelFixed: true,
    options: codeLength,
    fullWidth: true,
    defaultValue: 6,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
});

const ui = {
  new: [
    {
      id: 'default',
      title: t1('add_card'),
      fields: [
        'name',
        'description',
        'money',
        'vmoney',
        'counter__total_card',
        'counter__seri_length',
        'counter__pin_length',
      ],
    },
  ],
  edit: [
    {
      id: 'default',
      title: t1('edit_card'),
      fields: ['name', 'description'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
