import { t1 } from 'translate';

const schema = (formid) => ({
  CDANHTDUONG_EVN_CODE: {
    type: 'text',
    floatingLabelText: t1('code'),
    // defaultValue: 'name',
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  CDANHTDUONG_EVN: {
    type: 'text',
    floatingLabelText: t1('name'),
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['CDANHTDUONG_EVN_CODE', 'CDANHTDUONG_EVN'],
  },
];

export default {
  schema,
  ui,
};
