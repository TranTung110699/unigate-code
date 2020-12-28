import { examShiftsSelectBox } from 'components/admin/contest/common/elements';

const schema = (formid, values) => ({
  exam_shift_iid: examShiftsSelectBox(values, true, false, false),
});

const ui = () => [
  {
    id: 'idxxx',
    fields: ['exam_shift_iid'],
  },
];

export default { schema, ui };
