import { constants } from 'configs/constants';
import { t1 } from 'translate/index';

const sex = () => ({
  type: 'multiCheckbox',
  floatingLabelText: t1('gender'),
  options: constants.sexOptions(),
  inline: true,
});

export default sex;
