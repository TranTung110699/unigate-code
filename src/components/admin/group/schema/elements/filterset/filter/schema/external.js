import { t1 } from 'translate/index';
import { constants } from 'configs/constants';

const external = () => ({
  inline: true,
  type: 'multiCheckbox',
  hintText: `${t1('hint')} : ${t1('teacher_types')}`,
  floatingLabelText: t1('teacher_types'),
  options: constants.externalTypesOptions(),
});

export default external;
