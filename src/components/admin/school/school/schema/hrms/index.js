// eslint-disable-next-line jsx-a11y/anchor-is-valid
/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';

const schema = () => ({
  url_service: {
    type: 'text',
    hintText: t1('url_service'),
    floatingLabelText: t1('url_service'),
    defaultValue: '',
    fullWidth: true,
  },
  api_code: {
    type: 'text',
    hintText: t1('api_code'),
    floatingLabelText: t1('api_code'),
    defaultValue: '',
    fullWidth: true,
  },
  api_key: {
    type: 'text',
    hintText: t1('api_key'),
    floatingLabelText: t1('api_key'),
    defaultValue: '',
    fullWidth: true,
  },
  sender_name: {
    type: 'text',
    hintText: t1('sender_name'),
    floatingLabelText: t1('sender_name'),
    defaultValue: '',
    fullWidth: true,
  },
  sign: {
    type: 'text',
    hintText: t1('sign'),
    floatingLabelText: t1('sign'),
    defaultValue: '',
    fullWidth: true,
  },
});

const ui = () => [
  {
    id: 'hrms_configs',
    fields: ['url_service', 'api_code', 'api_key', 'sender_name', 'sign'],
  },
];

export default { schema, ui };
