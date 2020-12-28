import { t1 } from 'translate';
import { required, matchRegex } from 'common/validators';

import { examRoundsSelectBox } from 'components/admin/contest/common/elements';

const schema = (formid, values) => ({
  exam_round_iid: examRoundsSelectBox(
    values,
    { classWrapper: 'col-md-6', populateValue: false },
    true,
  ),
  point_spectrum_input: {
    type: 'text',
    floatingLabelText: t1('enter_point_spectrum'),
    hintText: `${t1('ex:_0,_25,_50,_75,_100')}...`,
    floatingLabelFixed: false,
    validate: [
      required(t1('point_spectrum_cannot_be_empty')),
      matchRegex(
        /^[0-9 ,]*$/,
        t1('point_spectrum_format_have_to_be_0,_25,_50,_75,_100'),
      ),
    ],
    errorText: '',
    fullWidth: true,
    classWrapper: 'col-md-6',
  },
});

const ui = (step, values) => [
  {
    id: 'default',
    fields: ['point_spectrum_input', 'exam_round_iid'],
  },
];

export default {
  schema,
  ui,
  // layout: { component: SearchFormLayout, freestyle: 1 },
};
