import { t1 } from 'translate';
import DatePicker from 'schema-form/elements/date-picker';

const deliveryDate = () => ({
  type: DatePicker,
  hintText: t1('delivery_date'),
  container: 'inline',
  floatingLabelText: t1('delivery_date'),
  errorText: '',
});

export default deliveryDate;
