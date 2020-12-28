import get from 'lodash.get';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import RTE from 'schema-form/elements/richtext';

import Store from 'store';
import { change } from 'redux-form';
import sagaActions from 'actions/node/saga-creators';
import { t1 } from 'translate';
import { dateGreaterThan, dateLessThan, required } from 'common/validators';
import { constants, UiLibs } from 'configs/constants';
import getFormSchemaConfigs from 'api-endpoints/form-schema-configs';
import apiUrls from 'api-endpoints';
import UserEditor from 'components/admin/relation/schema/user-editor';
import { assetCategories } from 'components/admin/asset-manager/category/schema/elements';
import DateTimePicker from 'schema-form/elements/date-time-picker';

const schema = (formid, values, step) => ({
  code: {
    type: 'text',
    hintText: t1('enter_code_of_asset'),
    floatingLabelText: t1('code_of_asset'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: required(t1('value_is_required')),
  },
  // "type" is reserved keyword
  asset_type: {
    type: 'select',
    floatingLabelText: t1('asset_type'),
    floatingLabelFixed: true,
    options: 'async',
    fullWidth: true,
    paramsasync: {
      __url__: getFormSchemaConfigs('asset_type'),
    },
    readOnly: true,
  },
  category_iid: {
    ...assetCategories(formid, {
      floatingLabelText: `${t1('choose_asset_category')}`,
      multiSelectable: false,
    }),
    normalize: (value) => get(value, 0),
    format: (value) => (value ? [value] : []),
    onChange: (prefix, value) => {
      Store.dispatch(
        sagaActions.getDataRequest(
          {
            url: apiUrls.get_category_info,
            keyState: `asset_category_${value}`,
            executeOnSuccess: (data) => {
              Store.dispatch(
                change(formid, 'asset_type', get(data, 'asset_type', '')),
              );
            },
          },
          {
            iid: value,
            type: 'asset',
          },
        ),
      );
    },
    validate: required(t1('value_is_required')),
  },
  status: {
    type: 'select',
    floatingLabelText: t1('status'),
    floatingLabelFixed: true,
    options: constants.AssetStatusOptions(),
    fullWidth: true,
    validate: required(t1('value_is_required')),
  },
  pic: {
    type: InputAutoComplete,
    nameElement: 'pic',
    componentElementEditor: UserEditor,
    baseUrl: apiUrls.user_search,
    params: {
      _sand_step: 'users',
      category_iid: values.sid,
    },
    dataSourceConfig: {
      text: 'name',
      value: 'data',
      valueKeys: ['name', 'iid', 'id', 'avatar', 'mail'],
      transformData: (res) =>
        res.map((data) => ({
          data,
          name: `${data.name} - (#${data.mail})`,
        })),
    },
    floatingLabelText: t1('assigned_user'),
    fullWidth: true,
  },
  description: {
    type: RTE,
    hintText: t1('enter_description'),
    floatingLabelText: t1('description_of_asset'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  start_date: {
    type: DateTimePicker,
    uiLib: UiLibs.ANT,
    getStartDate: true,
    validate: [
      dateLessThan(values.end_date, t1('start_date_must_be_before_end_date')),
    ],
    floatingLabelText: t1('start_date_requested'),
    fullWidth: true,
    maxDate: values.end_date,
  },
  end_date: {
    type: DateTimePicker,
    uiLib: UiLibs.ANT,
    getEndDate: true,
    floatingLabelText: t1('end_date_requested'),
    validate: [
      dateGreaterThan(
        values.start_date,
        t1('end_date_must_be_after_start_date'),
      ),
    ],
    fullWidth: true,
    minDate: values.start_date,
  },
  unit: {
    type: 'select',
    floatingLabelText: t1('asset_unit'),
    floatingLabelFixed: true,
    options: 'async',
    fullWidth: true,
    paramsasync: {
      __url__: getFormSchemaConfigs('asset_unit'),
    },
    validate: required(t1('value_is_required')),
  },
  usage_rate: {
    type: 'number',
    hintText: t1('enter_usage_rate'),
    floatingLabelText: t1('usage_rate/hour'),
    defaultValue: 1,
    errorText: '',
    fullWidth: true,
    validate: required(t1('value_is_required')),
  },
});

const isStationery = (step, values) => values.asset_type === 'stationery';

const ui = (step, values) => {
  const config = {
    new: [
      {
        id: 'default',
        fields: isStationery(step, values)
          ? [
              'category_iid',
              'code',
              'asset_type',
              'unit',
              'usage_rate',
              'description',
              'pic',
            ]
          : [
              'category_iid',
              'code',
              'asset_type',
              'status',
              'start_date',
              'end_date',
              'description',
              'pic',
            ],
      },
    ],
    edit: [
      {
        id: 'default',
        fields: isStationery(step, values)
          ? [
              'category_iid',
              'code',
              'asset_type',
              'unit',
              'usage_rate',
              'description',
              'pic',
            ]
          : [
              'category_iid',
              'code',
              'asset_type',
              'status',
              'start_date',
              'end_date',
              'description',
              'pic',
            ],
      },
    ],
  };

  return config[step];
};

const layout = {
  new: '',
  edit: '',
};

export default { schema, ui, layout };
