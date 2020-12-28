import { t1 } from 'translate/index';
import { constants } from 'configs/constants';

const graduatingSeniorStatuses = () => ({
  name: 'status',
  type: 'multiCheckbox',
  inline: true,
  floatingLabelText: t1('choose_statuses'),
  options: constants.GraduatingSeniorOptions(),
  defaultValue: constants
    .GraduatingSeniorOptions()
    .map((statusOption) => statusOption.value),
  fullWidth: true,
});

export default graduatingSeniorStatuses;
