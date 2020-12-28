import Store from 'store';
import { change } from 'redux-form';
import get from 'lodash.get';
import { t1 } from 'translate';
import { required } from 'common/validators';
import FeeLayoutFreestyle from './layout-learnes-freestyle';

// import ItemEditor from './../new/ItemEditor';
const changeForm = (formId, fieldName, values) => {
  Store.dispatch(change(formId, fieldName, values));
};
const schema = (formid, values, step, xpath) => ({
  name: {
    type: 'text',
  },
  id: {
    type: 'text',
  },
  iid: {
    type: 'number',
    validate: [required(t1('iid_cannot_be_empty'))],
  },
  type: {
    type: 'text',
    validate: [required(t1('ntype_cannot_be_empty'))],
  },
  code: {
    type: 'text',
  },
  reset_progress: {
    type: 'checkbox',
    label: t1('reset_all'),
    onChange: (event, toggled) => {
      if (toggled && !Array.isArray(values.learners)) {
        return;
      } else if (toggled) {
        const currentValue = get(values, xpath);
        const isNotSelectedAll =
          Array.isArray(values.learners) &&
          values.learners.find(
            (item) => currentValue.iid !== item.iid && !item.reset_progress,
          );
        if (isNotSelectedAll) {
          return;
        }
      }
      changeForm(formid, 'reset_progress', toggled ? 1 : 0);
    },
  },
  resolve_progress: {
    type: 'hidden',
  },
});

const ui = () => [
  {
    id: 'default',
    fields: [
      'id',
      'iid',
      'name',
      'type',
      'code',
      'reset_progress',
      'resolve_progress',
    ],
  },
];

const layout = { component: FeeLayoutFreestyle, freestyle: 1 };

export default { schema, ui, layout };
