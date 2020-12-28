import { t1, t } from 'translate';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import {
  examShiftsSelectBox,
  examRoundsSelectBox,
} from 'components/admin/contest/common/elements';

const schema = (formid, values) => ({
  exam_round_iid: examRoundsSelectBox(values, {
    label: t1('exam_result_of_exam_round'),
    defaultValue: values && values.exam_round_code,
    required: true,
  }),
  exam_shift_iid: examShiftsSelectBox(values, true),
  highlight_question_has_spent_time_less_than: {
    type: 'number',
    hintText: `${t1('highlight_question_has_spent_time_less_than')} (${t(
      'seconds',
    )})`,
    floatingLabelText: `${t1(
      'highlight_question_has_spent_time_less_than',
    )} (${t('seconds')})`,
    classWrapper: 'col-md-12',
    min: 0,
    fullWidth: true,
  },
  q: {
    type: 'text',
    floatingLabelText: t1('search_contestant_(name,_email...)'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  user_codes: {
    type: 'text',
    floatingLabelText: t1('search_by_codes'),
    hintText: `${t1('ex:_3awQMtU4,_CPB3A5To')}...`,
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
});

const getFormFilterFields = (step, values) => [
  'exam_round_iid',
  'exam_shift_iid',
  'highlight_question_has_spent_time_less_than',
  'q',
  'user_codes',
];

const ui = (step, values) => [
  {
    id: 'id',
    fields: getFormFilterFields(step, values),
  },
];

export default {
  schema,
  ui,
  layout: {
    component: SearchFormLayoutFreestyle,
    freestyle: 1,
  },
};
