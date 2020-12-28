import { t1 } from 'translate';
import { required } from 'common/validators';
import { orderStatus, orderStatusLabel } from 'configs/constants/sales-package';

const statusToShow = ['CREATED', 'PAID', 'FULLFILLED', 'CANCELED'];
const statusSelect = Object.keys(orderStatus)
  .filter((key) => statusToShow.includes(key))
  .map((key) => ({
    value: key,
    primaryText: t1(orderStatusLabel(key)),
  }));

export const order_status = (opts = {}) => ({
  type: 'select',
  hintText: t1('order_status'),
  floatingLabelText: t1('order_status'),
  validate: [required(t1('order_status_cannot_be_empty'))],
  fullWidth: true,
  options: statusSelect,
  ...opts,
});

const schema = (formid, values) => {
  return {
    order_status: order_status(),
    note: {
      type: 'text',
      hintText: t1('order_note'),
      floatingLabelText: t1('order_note'),
      defaultValue: '',
      errorText: '',
      multiLine: true,
    },
  };
};

const ui = (step, values) => {
  return [{ id: 'default', fields: ['order_status', 'note'] }];
};

export default { schema, ui };
