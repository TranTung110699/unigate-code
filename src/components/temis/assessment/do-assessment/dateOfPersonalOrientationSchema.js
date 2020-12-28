import DatePicker from 'schema-form/elements/date-picker';

const schema = () => ({
  form: {
    type: DatePicker,
    classWrapper: 'col-md-6',
    floatingLabelText: 'Thời gian bắt đầu thực hiện kế hoạch',
    getStartDate: true,
    fullWidth: true,
    minDate: new Date(),
  },
  to: {
    type: DatePicker,
    classWrapper: 'col-md-6',
    floatingLabelText: 'Thời gian kết thúc thực hiện kế hoạch',
    getEndDate: true,
    fullWidth: true,
    minDate: new Date(),
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['form', 'to'],
  },
];

export default {
  schema,
  ui,
};
