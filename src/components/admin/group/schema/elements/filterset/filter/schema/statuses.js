import { t1 } from 'translate/index';
import { constants } from 'configs/constants';

const statuses = () => {
  const defaultValues = constants
    .StatusTeacherOptions()
    .filter((statusOption) => statusOption.value !== 'deleted')
    .map((statusOption) => statusOption.value);

  return {
    name: 'status',
    type: 'multiCheckbox',
    inline: true,
    floatingLabelText: t1('status'),
    options: constants.StatusTeacherOptions(),
    defaultValue: defaultValues,
    fullWidth: true,
  };
};

export default statuses;
