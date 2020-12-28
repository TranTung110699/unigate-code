import dateOfPersonalOrientationSchema from './dateOfPersonalOrientationSchema';

const schema = () => ({
  target: {
    type: 'text',
    rowsMax: 4,
    rows: 4,
    multiLine: true,
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    classWrapper: 'col-md-6',
    floatingLabelText: 'Mục tiêu:',
  },
  content: {
    type: 'text',
    rowsMax: 4,
    rows: 4,
    multiLine: true,
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    classWrapper: 'col-md-6',
    floatingLabelText:
      'Nội dung đăng ký học tập, bồi dưỡng (Các năng lực cần ưu tiên cải thiện):',
  },
  date: {
    type: 'section',
    schema: dateOfPersonalOrientationSchema,
  },
  performance_conditions: {
    type: 'text',
    rowsMax: 4,
    rows: 4,
    multiLine: true,
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    classWrapper: 'col-md-12',
    floatingLabelText: 'Điều kiện thực hiện:',
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['target', 'content', 'date', 'performance_conditions'],
  },
];

export default {
  schema,
  ui,
};
