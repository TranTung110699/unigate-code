/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import {
  examShiftsSelectBox,
  examRoundsSelectBox,
} from 'components/admin/contest/common/elements';

const schema = (formid, values, examRound = null) => ({
  exam_round: examRoundsSelectBox(values, {
    classWrapper: 'col-md-6',
    floatingLabelText: `${t1('choose_exam_round')}`,
  }),
  name: {
    type: 'text',
    floatingLabelText: t1('name'),
    classWrapper: examRound && examRound.code ? null : 'col-md-6',
    // defaultValue: 'name',
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
});

const ui = (examRound = null) => [
  {
    id: 'id',
    fields: examRound && examRound.code ? ['name'] : ['name', 'exam_round'],
  },
];

export default (examRound = null) => ({
  schema: (formid, values) => schema(formid, values, examRound),
  ui: () => ui(examRound),
});
