const schema = () => ({
  strengths: {
    type: 'text',
    rowsMax: 4,
    rows: 4,
    multiLine: true,
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    classWrapper: 'col-md-6',
    floatingLabelText: 'Điểm mạnh',
  },
  weakness: {
    type: 'text',
    rowsMax: 4,
    rows: 4,
    multiLine: true,
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    classWrapper: 'col-md-6',
    floatingLabelText: 'Những vấn đề cần cải thiện',
  },
});

const ui = () => [{ id: 'overall_comment', fields: ['strengths', 'weakness'] }];

export default {
  schema,
  ui,
};
