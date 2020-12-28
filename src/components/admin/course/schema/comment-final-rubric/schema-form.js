import { t1 } from 'translate';
import RTE from 'schema-form/elements/richtext';

const schema = {
  progress: {
    type: 'array',
    hiddenAddButton: true,
    hiddenRemoveButton: true,
    schema: {
      schema: () => ({
        sc: {
          type: RTE,
          hintText: t1('enter_comment'),
          multiLine: true,
          fullWidth: true,
        },
        tco_iid: {
          type: 'text',
          classWrapper: 'display-none',
        },
      }),
      ui: () => [{ id: 'default', fields: ['sc', 'tco_iid'] }],
    },
    fullWidth: true,
  },
};

const ui = () => [
  {
    id: 'id', // you still have to have this id even for freestyle
    fields: ['progress'],
  },
];

export default {
  schema,
  ui,
};
