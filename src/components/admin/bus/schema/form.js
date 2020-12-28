import { t1 } from 'translate';
import { required } from 'common/validators';
import locationSchema from './location-schema';
import driverSchema from './driver-schema';

const schema = (formid, values, step) => ({
  name: {
    type: 'text',
    hintText: t1('bus_route_name'),
    floatingLabelText: t1('bus_route_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1('name_cannot_be_empty'))],
  },
  locations: {
    type: 'array',
    schema: locationSchema,
    floatingLabelText: t1('bus_stops'),
    // hiddenAddButton: true,
    // hiddenRemoveButton: true,
  },
  drivers: {
    type: 'array',
    schema: driverSchema,
    floatingLabelText: t1('drivers'),
    // hiddenAddButton: true,
    // hiddenRemoveButton: true,
  },
});

const ui = (step, values) => {
  return [
    {
      id: 'default',
      fields: ['name', 'drivers', 'locations'],
    },
  ];
};

// const layout = {
//   new: '',
// };
export default { schema, ui };
