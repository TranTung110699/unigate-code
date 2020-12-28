import { change } from 'redux-form';
import { required } from 'common/validators';
import { t1 } from 'translate';
import Store from 'store';
import apiUrls from 'api-endpoints';
import { slugifierUppercase } from 'common/normalizers';
import CommonSelection from 'components/common/elements/common-selection';
import TreeSelect from 'schema-form/elements/tree-select';

const schema = (formid, values) => ({
  name: {
    type: 'text',
    hintText: t1('name'),
    floatingLabelText: t1('name'),
    defaultValue: '',
    errorText: '',
    multiLine: false,
    fullWidth: true,
    validate: required(),
  },

  code: {
    type: 'text',
    hintText: t1('code'),
    floatingLabelText: t1('code'),
    defaultValue: 0,
    normalize: slugifierUppercase,
    styleWrapper: { paddingLeft: 0, zIndex: 10000 },
    fullWidth: true,
    validate: required(),
  },

  use_for_all: {
    type: 'checkbox',
    label: t1('use_for_all_categories'),
    defaultValue: false,
    fullWidth: true,
  },

  categories: {
    type: TreeSelect,
    nameElement: 'categories',
    componentElementEditor: CommonSelection,
    optionsProperties: {
      style: {
        maxHeight: '135px',
        overflowY: 'auto',
      },
    },
    fullWidth: true,
    floatingLabelText:
      values && values.use_for_all === 0
        ? t1('categories')
        : t1('exclude_categories'),
    hintText: t1('category'),
    onChange: () => {
      Store.dispatch(change(formid, 'applicable_benefits', null));
    },
    treeProps: {
      multiSelectable: true,
      checkParentEqualCheckAllChildren: false,
    },
    params: {
      view: 'tree',
      depth: -1,
      sub_type: 0,
    },
    baseUrl: apiUrls.fee_category_search,
    noFetchDataResultText: t1(
      'you_cannot_assign_category_to_this_finance_template_because_there_are_no_category_to_select.',
    ),
    keyState: `${formid}_category_iids`,
    mapResultToTreeData: {
      key: 'iid',
      title: 'name',
      value: 'iid',
    },
    mapTreeDataToText: 'name',
  },
});

const ui = (step, values) => {
  // if(values.use_for_all) {
  //   return [{
  //     id: 'default',
  //     fields: ['name', 'code', 'use_for_all'],
  //   }];
  // }
  return [
    {
      id: 'default',
      fields: ['name', 'code', 'use_for_all', 'categories'],
    },
  ];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
