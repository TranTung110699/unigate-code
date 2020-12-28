import { t1 } from 'translate';
import { UiLibs } from 'configs/constants';
import lodashGet from 'lodash.get';
import DateTimePicker from 'schema-form/elements/date-time-picker';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = (formid, values, step, xpath) => ({
  iid: {
    nameElement: 'syllabus',
    type: InputAutoComplete,
    baseUrl: '/syllabus/my',
    floatingLabelText: t1('subject'),
    fullWidth: true,
    classWrapper: 'col-md-6 col-sm-12',
    fieldSearch: 'name',
    dataSourceConfig: {
      text: 'name',
      value: 'iid',
      transformData: (res) =>
        res.map((creditSyllabus) => ({
          name: `${creditSyllabus.name}-${creditSyllabus.code}`,
          iid: creditSyllabus.iid,
        })),
    },
    params: {
      status: ['approved'],
      items_per_page: -1,
      type: 'credit',
    },
  },
  start_time: {
    type: DateTimePicker,
    classWrapper: 'col-md-3 col-sm-6',
    uiLib: UiLibs.ANT,
    getStartDate: true,
    floatingLabelText: t1('start_time_to_learning'),
    fullWidth: true,
    defaultValue: values.minRegisterCreditSyllabusDate,
    minDate: values.minRegisterCreditSyllabusDate,
    maxDate: Math.min(
      values.maxRegisterCreditSyllabusDate || Infinity,
      lodashGet(values, `${xpath ? `${xpath}.` : ''}end_time`) || Infinity,
    ),
  },
  end_time: {
    type: DateTimePicker,
    classWrapper: 'col-md-3 col-sm-6',
    uiLib: UiLibs.ANT,
    floatingLabelText: t1('date_time_finish_learn'),
    fullWidth: true,
    defaultValue: values.maxRegisterCreditSyllabusDate,
    minDate: Math.max(
      values.minRegisterCreditSyllabusDate || -Infinity,
      lodashGet(values, `${xpath ? `${xpath}.` : ''}start_time`) || -Infinity,
    ),
    maxDate: values.maxRegisterCreditSyllabusDate,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['iid', 'start_time', 'end_time'],
  },
];

export default { schema, ui };
