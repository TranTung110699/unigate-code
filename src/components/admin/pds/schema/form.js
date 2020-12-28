import { t1 } from 'translate';
import { province } from './elements';
const schema = (formid, value) => ({
  province: province({ fullWidth: true }),
  zone: {
    type: 'select',
    floatingLabelText: t1('belongs_to_zone'),
    errorText: `${t1('loading')}....`,
    floatingLabelFixed: true,
    options: 'async',
    fullWidth: true,
  },
  sub_type: {
    type: 'radio',
    floatingLabelText: t1('sub_type'),
    errorText: `${t1('loading')}....`,
    floatingLabelFixed: true,
    options: 'async',
    fullWidth: true,
  },
  pid: {
    type: 'select',
    floatingLabelText: t1('district'),
    errorText: `${t1('loading')}....`,
    floatingLabelFixed: true,
    options: 'async',
    paramsasync: {
      __url__: '/pds/api/get-districts',
      key: `pid-${value && (value.zone || value.province || 'all')}`,
      value: {
        zone_code: value && value.zone,
        id: value && value.province,
        type: 'pid',
      },
    },
    defaultValue: '',
    fullWidth: true,
  },
  school_levels: {
    type: 'multiCheckbox',
    floatingLabelText: t1('school_levels'),
    floatingLabelFixed: true,
    errorText: `${t1('loading')}....`,
    options: 'async',
    paramsasync: {
      __url__: '/pds/api/get-all-school-levels',
      // key: `pid-${value && (value.zone || value.province || 'all')}`,
      // value: {
      //   zone_code: value && value.zone,
      //   id: value && value.province,
      //   type: 'pid',
      // },
    },
    vertical: true,
    fullWidth: true,
  },
  name: {
    type: 'text',
    hintText: t1('name_of_location'),
    floatingLabelText: t1('name_of_location'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
});

const ui = (step, values) => {
  let fields = [];
  switch (step) {
    case 'edit_province':
    case 'new_province': {
      fields = ['zone', 'sub_type', 'pid', 'name'];
      break;
    }
    case 'edit_district': {
      fields = ['zone', 'sub_type', 'pid', 'name'];
      break;
    }
    case 'new_schoolviet':
    case 'edit_schoolviet': {
      fields = ['province', 'pid', 'name', 'school_levels'];
      break;
    }
    default: {
      return [];
    }
  }
  const fieldsFilter = [];

  if (
    (fields.includes('province') && !(values && values.province)) ||
    (fields.includes('zone') && !(values && values.zone)) ||
    (fields.includes('sub_type') && !(values && values.sub_type !== 0))
  ) {
    fieldsFilter.push('pid');
  }

  return [
    {
      id: 'default',
      fields: fields.filter((field) => !fieldsFilter.includes(field)),
    },
  ];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
