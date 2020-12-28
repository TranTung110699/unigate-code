import { t1 } from 'translate';
import get from 'lodash.get';

const schema = (formid, values, step, xpath, props) => {
  return {
    not_yet_marked: {
      type: 'checkbox',
      label: t1('filter_not_yet_marked_takes'),
    },
  };
};

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['not_yet_marked'],
    },
  ];
};

export default { schema, ui };
