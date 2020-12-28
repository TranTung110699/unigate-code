import { examRoundsSelectBox } from 'components/admin/contest/common/elements';

const schema = (formid, values) => ({
  exam_round_iid: examRoundsSelectBox(values, {
    required: true,
  }),
});

const ui = () => [
  {
    id: 'id',
    fields: ['exam_round_iid'],
  },
];

export default { schema, ui };
