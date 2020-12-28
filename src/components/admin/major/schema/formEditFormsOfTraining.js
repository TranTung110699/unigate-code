import { t1 } from 'translate';
import { required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import apiUrls from 'api-endpoints';
import LayoutFreestyle from './layout-freestyle-edit-forms-of-training';

const schema = (formid, values, currentNode) => ({
  name: {
    type: 'text',
    floatingLabelText: t1('specialization_name'),
    validate: [required(t1('name_cannot_be_empty'))],
    defaultValue: '',
    errorText: '',
    fullWidth: true,
  },
  code: {
    type: 'text',
    floatingLabelText: t1('specialization_code'),
    validate: [required(t1('code_cannot_be_empty'))],
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    normalize: slugifier,
  },
  training_mode: {
    type: 'select',
    classWrapper: 'col-md-6',
    fullWidth: true,
    floatingLabelText: t1('training_mode'),
    validate: [required(t1('training_mode_cannot_be_empty'))],
    options: 'async',
    paramsasync: {
      __url__: apiUrls.get_training_modes,
    },
  },
  training_level: {
    type: 'select',
    classWrapper: 'col-md-6',
    fullWidth: true,
    floatingLabelText: t1('training_level'),
    validate: [required(t1('training_level_cannot_be_empty'))],
    options: 'async',
    paramsasync: {
      __url__: apiUrls.get_training_levels,
      key: `training_level-by-${values && values.training_mode}`,
      transformData: (result) => {
        const trainingMode = values && values.training_mode;
        const traingLevelsFilter = Array.isArray(
          currentNode && currentNode.degrees,
        )
          ? currentNode.degrees
              .map((degree) =>
                degree.training_mode === trainingMode
                  ? degree.training_level
                  : false,
              )
              .filter(Boolean)
          : [];

        return Array.isArray(result) && Array.isArray(traingLevelsFilter)
          ? result.filter(
              (map) => !traingLevelsFilter.includes(map && map.value),
            )
          : result;
      },
    },
  },
  degree: {
    type: 'select',
    fullWidth: true,
    floatingLabelText: t1('degree'),
    validate: [required(t1('degree_cannot_be_empty'))],
    options: 'async',
    paramsasync: {
      __url__: apiUrls.get_degrees,
      transformData: (result) =>
        Array.isArray(result)
          ? result.map((map) => ({
              value: map.iid,
              primaryText: map.name,
            }))
          : result,
    },
  },
});

const getUi = (step, values, params) => {
  switch (params && params.update_type) {
    case 'add_form_of_training': {
      return [
        {
          id: 'default',
          fields: ['training_mode', 'training_level'],
        },
      ];
    }
    case 'edit_degree':
    case 'add_degree': {
      return [
        {
          id: 'default',
          fields: ['degree'],
        },
      ];
    }
    case 'remove': {
      return [
        {
          id: 'default',
          title: t1('are_you_sure_you_want_to_do_this'),
          fields: [],
        },
      ];
    }
    default: {
      return [
        {
          id: 'default',
          fields: ['name', 'code'],
        },
      ];
    }
  }
};

export default (params, currentNode) => ({
  schema: (formid, values) => schema(formid, values, currentNode),
  ui: (step, values) => getUi(step, values, params),
  layout: {
    component: LayoutFreestyle,
    freestyle: 1,
    optionsProperties: {
      params,
      currentNode,
    },
  },
});
