import Store from 'store';
import schemaActions from 'schema-form/actions';
import { required } from 'common/validators';
import { t1 } from 'translate';
import { constants } from 'configs/constants';
import { province, district } from 'components/admin/pds/schema/elements';
import { convertBooleanValueToInt } from 'common/normalizers';

const schema = (formid, values) => ({
  name: {
    type: 'text',
    hintText: t1('typing_name_of_venue'),
    floatingLabelText: t1('name_of_venue'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  is_virtual: {
    type: 'checkbox',
    label: t1('is_virtual_building'),
    normalize: convertBooleanValueToInt,
  },
  province: province({
    fullWidth: true,
  }),
  district: district(values),
  address: {
    type: 'text',
    hintText: t1('typing_address_of_venue'),
    floatingLabelText: t1('address_of_venue'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  venue_type: {
    type: 'select',
    floatingLabelText: t1('venue_type'),
    floatingLabelFixed: true,
    options: constants.VenueTypeOptions(),
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
});

const ui = (step, values) => {
  let fields = ['name', 'is_virtual'];
  if (!values.is_virtual) {
    fields = fields.concat(['province', 'district', 'address']);
  }

  return [
    {
      id: 'default',
      fields,
    },
  ];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
