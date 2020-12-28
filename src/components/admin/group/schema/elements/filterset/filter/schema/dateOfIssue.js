import { t1 } from 'translate';
import DatePicker from 'schema-form/elements/date-picker';

const dateOfIssue = () => ({
  type: DatePicker,
  hintText: t1('date_of_issue'),
  container: 'inline',
  floatingLabelText: t1('date_of_issue'),
  errorText: '',
});

export default dateOfIssue;
