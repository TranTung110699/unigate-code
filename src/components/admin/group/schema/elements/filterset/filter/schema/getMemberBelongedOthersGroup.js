import { t1 } from 'translate/index';
import { convertBooleanValueToInt } from 'common/normalizers';

const getMemberBelongedOthersGroup = () => ({
  name: 'status',
  type: 'checkbox',
  label: t1('get_member_belonged_others_group'),
  fullWidth: true,
  defaultValue: 1,
  normalize: convertBooleanValueToInt,
});

export default getMemberBelongedOthersGroup;
