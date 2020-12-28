import { t1 } from 'translate/index';

const mail = () => ({
  type: 'text',
  floatingLabelText: t1('email'),
  hintText: t1('email'),
  fullWidth: true,
});

export default mail;
