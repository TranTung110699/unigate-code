/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import {
  feeStatusFilterOptions,
  feeStatusFilters,
  schoolTypes,
} from 'configs/constants';
import { isClassGroup } from 'common/learn';
import get from 'lodash.get';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import SearchFormLayout from './SearchFormLayout';

const schema = (formid, values, localStep, xpath, props) => ({
  text: {
    type: 'text',
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    name: 'text',
    floatingLabelText: t1('mutiple_name_or_iid_or_email'),
    floatingLabelFixed: true,
    placeholder: t1('e.g:%s', ['iid, mail@domain.com']),
  },
  financial_status: {
    type: 'radio',
    inline: true,
    fullWidth: true,
    floatingLabelText: t1('financial_status'),
    hintText: t1('financial_status'),
    label: t1('financial_status'),
    options: feeStatusFilterOptions([feeStatusFilters.FEE_CANCELLATION]),
  },
  form_of_training: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      floatingLabelText: t1('applicable_for_major'),
      displayFields: ['major', 'training_mode', 'training_level', 'ico'],
      forSearch: true,
      notValidate: true,
    }),
  },
});

const ui = (step, values, themeConfig, xpath, formid, props) => {
  const fields =
    get(themeConfig, 'type') === schoolTypes.SIS && !isClassGroup(props.node)
      ? ['form_of_training', 'text']
      : ['text'];

  if (
    isClassGroup(props.node) ||
    get(themeConfig, 'type') === schoolTypes.SIS
  ) {
    fields.push('financial_status');
  }

  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields,
    },
  ];
};

const finalProcessBeforeSubmit = (fullData, node, schema, mode, step) => {
  fullData.major = get(fullData, 'form_of_training.major');
  fullData.ico = get(fullData, 'form_of_training.ico');
  fullData.training_mode = get(fullData, 'form_of_training.training_mode');
  fullData.training_level = get(fullData, 'form_of_training.training_level');
  return fullData;
};

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
  finalProcessBeforeSubmit,
};
