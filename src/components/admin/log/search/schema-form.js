import { t1 } from 'translate';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = () => ({
  searchInfo: {
    nameElement: 'searchInfo',
    optionsProperties: {
      classNameWrapper: 'targets-wrapper',
      classNameEditorWrapper: 'targets-wrapper-editor',
      style: {
        'overflow-y': 'scroll',
        'overflow-x': 'hidden',
        maxHeight: 300,
        paddingRight: 10,
      },
    },
    type: InputAutoComplete,
    baseUrl: '/site/api/get-user-or-group',
    dataSourceConfig: {
      text: 'key',
      value: 'data',
      transformData: 'name_display',
    },
    floatingLabelText: t1('find_group_or_specific_user'),
    fullWidth: true,
  },
});

const ui = (step, values) => [
  {
    id: 'id', // you still have to have this id even for freestyle
    fields: ['searchInfo'],
  },
];

export default { schema, ui };
