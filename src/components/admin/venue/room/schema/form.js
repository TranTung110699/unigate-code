import { required } from 'common/validators';
import { t1 } from 'translate';
import { constants } from 'configs/constants';
import { slugifier, convertBooleanValueToInt } from 'common/normalizers';
import apiUrls from 'api-endpoints';
import assetApiUrls from 'components/admin/asset-manager/endpoints';
import AssetEditor from './asset-editor';
import { commonFormLayouts } from 'schema-form/constants';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import ServerConfigurations from './virtual-server-configurations';

const schema = (formid, values) => ({
  is_virtual: {
    type: 'checkbox',
    label: t1('is_virtual_room'),
    normalize: convertBooleanValueToInt,
  },
  name: {
    type: 'text',
    hintText: t1('typing_room_name'),
    floatingLabelText: t1('room_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  code: {
    type: 'text',
    hintText: t1('code_name'),
    floatingLabelText: t1('code_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    normalize: slugifier,
    // validate: [required(t1('value_is_required_and_can\'t_be_empty'))],
  },
  content: {
    type: 'text',
    hintText: t1('notes'),
    floatingLabelText: t1('notes'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    // validate: [required(t1('value_is_required_and_can\'t_be_empty'))],
  },
  floor_number: {
    type: 'text',
    hintText: t1('typing_floor_number'),
    floatingLabelText: t1('floor_number'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  room_size: {
    type: 'number',
    hintText: t1('room_size'),
    floatingLabelText: t1('room_size_(m2)'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  room_seat: {
    type: 'number',
    hintText: t1('typing_number_of_seat'),
    floatingLabelText: t1('number_of_seat'),
    floatingLabelFixed: true,
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  room_type: {
    type: 'select',
    floatingLabelText: t1('venue_type'),
    floatingLabelFixed: true,
    options: constants.RoomTypeOptions(),
    fullWidth: true,
    validate: [required(t1("value_is_required_and_can't_be_empty"))],
  },
  asset: {
    type: InputAutoComplete,
    nameElement: 'asset',
    componentElementEditor: AssetEditor,
    baseUrl: assetApiUrls.asset_search,
    params: {
      _sand_step: 'asset',
      category_status: ['approved'],
    },
    dataSourceConfig: {
      text: 'dropdown_text',
      value: 'data',
      valueKeys: [
        'detailed_asset_category',
        'code',
        'description',
        'status',
        'iid',
      ],
      transformData: (res) =>
        res.map((data) => ({
          data: data,
          dropdown_text: `${data.detailed_asset_category.name} - (#${
            data.code
          })`,
        })),
    },
    floatingLabelText: t1('asset_available'),
    fullWidth: true,
  },
  server_configs: {
    type: 'section',
    schema: ServerConfigurations,
    title: t1('server_configurations'),
  },
});

const ui = (step, values) => {
  let leftFields = ['is_virtual', 'name', 'code', 'room_seat'];

  let rightFields = [
    'room_type',
    'room_size',
    'floor_number',
    'content',
    'asset',
  ];

  if (values.is_virtual) {
    return [
      {
        id: 'default',
        fields: leftFields,
        title: t1('room_basic_info'),
      },
      {
        id: 'virtual',
        title: t1('virtual_class_server_configurations'),
        fields: ['server_configs'],
      },
    ];
  }

  return [
    {
      id: 'left',
      fields: leftFields, //['is_virtual', 'name', 'room_size', 'code', 'room_type'],
    },
    {
      id: 'right',
      fields: rightFields, // ['floor_number', 'room_seat', 'content', 'asset'],
    },
  ];
};

const layout = (step, values) => {
  if (values.is_virtual) {
    return '';
  }
  return commonFormLayouts.TWO_COLS;
};

export default { schema, ui, layout };
