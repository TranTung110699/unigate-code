/**
 * Created by hungvo on 18/04/2017.
 */
import { t1 } from 'translate';

const schema = (formid, values, step) => {
  return {
    name: {
      type: 'text',
      floatingLabelText: t1('name'),
      floatingLabelFixed: false,
      fullWidth: true,
    },
  };
};

const ui = (step, values) => {
  switch (step) {
    case 'new_dir':
      return [
        {
          id: 'info',
          fields: ['name'],
        },
      ];
    default:
      return [];
  }
};

const layout = {};

export default { schema, ui, layout };
