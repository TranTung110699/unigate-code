import { t1 } from 'translate';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const schema = (formid) => ({
  actual_price: {
    type: 'text',
    floatingLabelText: t1('price'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  data: {
    type: 'select',
    floatingLabelText: t1('item'),
    options: 'async',
    fullWidth: true,
  },
  items: {
    nameElement: 'items',
    type: InputAutoComplete,
    baseUrl: '/site/api/get-course-or-path',
    floatingLabelText: t1('items_(course_or_path)'),
    fullWidth: true,
    dataSourceConfig: {
      text: 'key',
      value: 'data',
    },
  },
  new_items: {
    nameElement: 'new_items',
    type: InputAutoComplete,
    baseUrl: '/site/api/get-course-or-path',
    floatingLabelText: t1('new_(course_or_path)'),
    fullWidth: true,
    dataSourceConfig: {
      text: 'key',
      value: 'data',
    },
  },
  uiids: {
    nameElement: 'uiids',
    type: InputAutoComplete,
    baseUrl: '/site/api/get-user-or-group?data_result=simple',
    dataSourceConfig: {
      text: 'name',
      value: 'iid',
    },
    floatingLabelText: t1('find_group_or_organization_or_specific_user'),
    fullWidth: true,
  },
});

const ui = {
  new_try_to_learn: [
    {
      id: 'try_to_learn',
      fields: ['data', 'actual_price'],
    },
  ],
  new_unlock_path: [
    {
      id: 'unlock_path',
      fields: ['data', 'actual_price'],
    },
  ],
  new_unlock_by_uiids: [
    {
      id: 'unlock_by_uiids',
      fields: ['items', 'uiids'],
    },
  ],
  new_migrate_items_unlock: [
    {
      id: 'migrate_items_unlock',
      fields: ['items', 'new_items'],
    },
  ],
};

const layout = {
  new_try_to_learn: '',
};

export default { schema, ui, layout };
