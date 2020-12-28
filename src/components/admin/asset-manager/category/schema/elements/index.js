import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import assetApiUrls from 'components/admin/asset-manager/endpoints';

import CommonSelection from 'components/common/elements/common-selection';
import TreeSelect from 'schema-form/elements/tree-select';

export const userAssetSchemaFormKeyState = (formid) =>
  `${formid}_user_asset_iids`;

export const assetCategories = (formid, configs) => {
  const defaultLabel = t1('asset_categories');
  const { multiSelectable = true } = configs;

  return {
    type: TreeSelect,
    nameElement: 'asset_categories',
    componentElementEditor: CommonSelection,
    elementEditorProps: {
      fromValueToText: (value) => `${value.code} - ${value.name}`,
    },
    optionsProperties: {
      style: {
        maxHeight: '128px',
        overflowY: 'auto',
      },
    },
    fullWidth: true,
    fullWidthInput: true,
    hintText: defaultLabel,
    params: {
      view: 'tree',
      depth: -1,
    },
    mapResultToTreeData: {
      key: 'iid',
      title: 'name',
      value: 'iid',
      selectable: 'match_where_to_form_boundary',
    },
    mapTreeDataToText: 'title',
    baseUrl: assetApiUrls.asset_category_search,
    keyState: userAssetSchemaFormKeyState(formid),
    treeProps: {
      multiSelectable,
      checkParentEqualCheckAllChildren: false,
    },
    floatingLabelText: `${defaultLabel} (*)`,
    noFetchDataResultText: t1(`could_not_find_any_${defaultLabel}`),
    ...(configs || {}),
  };
};
