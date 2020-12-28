import { t1 } from 'translate';
import Toggle from 'schema-form/elements/toggle';

const schema = () => ({
  type: {
    type: 'text',
    hintText: t1('org_type_code'),
    floatingLabelText: t1('org_type_code'),
    defaultValue: 1,
    fullWidth: true,
  },
  name: {
    type: 'text',
    hintText: t1('org_type_name'),
    floatingLabelText: t1('org_type_name'),
    defaultValue: 'org level 1',
    fullWidth: true,
  },
  is_phongban: {
    type: Toggle,
    dataSet: {
      off: 0,
      on: 1,
    },
    label: t1('is_phongban'),
    labelPosition: 'right',
    styleWrapper: { padding: 0 },
  },
  has_perm: {
    type: Toggle,
    dataSet: {
      off: 0,
      on: 1,
    },
    label: t1('has_perm'),
    labelPosition: 'right',
    styleWrapper: { padding: 0 },
  },
  has_province: {
    type: Toggle,
    dataSet: {
      off: 0,
      on: 1,
    },
    label: t1('has_province'),
    labelPosition: 'right',
    styleWrapper: { padding: 0 },
  },
  has_district: {
    type: Toggle,
    dataSet: {
      off: 0,
      on: 1,
    },
    label: t1('has_district'),
    labelPosition: 'right',
    styleWrapper: { padding: 0 },
  },
});

const ui = () => [
  {
    id: 'org_types',
    fields: [
      'type',
      'name',
      'is_phongban',
      'has_perm',
      'has_province',
      'has_district',
    ],
  },
];

export default { schema, ui };
