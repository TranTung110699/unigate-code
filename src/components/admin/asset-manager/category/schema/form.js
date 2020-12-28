import { t1 } from 'translate';
import { constants } from 'configs/constants';
import getFormSchemaConfigs from 'api-endpoints/form-schema-configs';
import RTE from 'schema-form/elements/richtext';

const schema = (formid) => ({
  code: {
    type: 'text',
    hintText: t1('enter_code'),
    floatingLabelText: t1('asset_category_code'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  name: {
    type: 'text',
    hintText: t1('enter_asset_category_name'),
    floatingLabelText: t1('asset_category_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  // "type" is reserved keyword
  asset_type: {
    type: 'select',
    floatingLabelText: t1('asset_type'),
    floatingLabelFixed: true,
    // options: constants.AssetTypeOptions(),
    options: 'async',
    fullWidth: true,
    paramsasync: {
      __url__: getFormSchemaConfigs('asset_type'),
    },
  },
  status: {
    type: 'radio',
    floatingLabelText: t1('status'),
    floatingLabelFixed: true,
    fullWidth: true,
    inline: true,
    options: constants.AssetStatusOptions(),
  },
  pid: {
    type: 'select',
    floatingLabelText: t1('parent'),
    floatingLabelFixed: true,
    options: 'async',
    fullWidth: true,
    paramsasync: {
      __url__: getFormSchemaConfigs('asset_category'),
    },
  },
  description: {
    type: RTE,
    hintText: t1('enter_description'),
    floatingLabelText: t1('description_of_asset_category'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
});

const ui = {
  new_asset: [
    {
      id: 'default',
      fields: ['code', 'name', 'asset_type', 'pid', 'description'],
    },
  ],
  edit: [
    {
      id: 'default',
      fields: ['code', 'name', 'asset_type', 'pid', 'description'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
