import { required } from 'common/validators';
import LayoutFreeStyle from './LayoutFreestyle';
import { organizations } from 'components/admin/organization/schema/elements';
import { t1 } from 'translate';
import get from 'lodash.get';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  organization_iid: organizations({
    formid,
    label: t1('organizations'),
    defaultValue: props.orgIids && props.orgIids[0],
    normalize: (v) => get(v, [0]),
    format: (v) => (v ? [v] : []),
    multiple: false,
    fullWidth: true,
    validate: [required()],
  }),
});

const ui = () => [
  {
    id: 'default',
    fields: ['organization_iid'],
  },
];

export default {
  schema,
  ui,
  layout: {
    component: LayoutFreeStyle,
    freestyle: 1,
  },
};
