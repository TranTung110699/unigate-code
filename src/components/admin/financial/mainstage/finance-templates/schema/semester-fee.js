import { t1 } from 'translate';
import SemesterFeeLayoutFreestyle from './semester-fee-layout';
import { required } from '../../../../../../common/validators';

const schema = (formid, values) => ({
  semester: {
    type: 'select',
    name: 'semester',
    fullWidth: true,
    floatingLabelText: t1('semester'),
    floatingLabelFixed: true,
    options: 'async',
    paramsasync: {
      valueKey: 'iid',
    },
    validate: [required(t1('semester_must_be_not_empty'))],
  },
  amount: {
    type: 'number',
    floatingLabelText: t1('enter_amount'),
  },
});

const ui = (step, values) => [
  {
    id: 'id',
    fields: ['semester', 'amount'],
  },
];

const layout = { component: SemesterFeeLayoutFreestyle, freestyle: 1 };

export default { schema, ui, layout };
