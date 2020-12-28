import { t1 } from 'translate/index';

const name = () => ({
  type: 'text',
  floatingLabelText: t1('user_display_name'),
  hintText: t1('user_display_name'),
});

export default name;
