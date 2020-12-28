import { required } from 'common/validators';
import RTE from 'schema-form/elements/richtext';

const rte = {
  type: RTE,
  selectorId: 'rte',
  hintText: 'foo content',
  floatingLabelText: 'foo content',
  defaultValue: '1',
  errorText: '',
  validate: [required('name cannot be empty')],
};

export default rte;
