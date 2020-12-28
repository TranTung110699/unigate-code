import { t1 } from 'translate';
import SearchFormLayout from './SearchFormLayout';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    q: {
      type: 'text',
      floatingLabelText: t1('name_or_iid_of_user'),
      floatingLabelFixed: false,
      fullWidth: true,
      label: t1('search_by_name_or_iid'),
      hintText: t1('please_type_search_text'),
    },
    score_scale: {
      type: 'select',
      floatingLabelText: t1('score_scale'),
      fullWidth: true,
      label: t1('score_scale'),
      hintText: t1('score_scale'),
      options: props.scaleOptions || [],
    },
  };
};

const ui = () => {
  const fields = ['q', 'score_scale'];

  return [
    {
      id: 'id',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  layout: {
    component: SearchFormLayout,
    freestyle: 1,
  },
};
