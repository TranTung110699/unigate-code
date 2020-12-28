import { t1 } from 'translate';
import { surveyAppliedItemTypeOptions } from 'configs/constants/survey';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid) => ({
  text: {
    type: 'text',
    floatingLabelText: t1('name'),
    floatingLabelFixed: true,
    errorText: '',
    fullWidth: true,
  },
  type: {
    type: 'multiCheckbox',
    floatingLabelText: t1('type'),
    floatingLabelFixed: true,
    options: surveyAppliedItemTypeOptions(),
    fullWidth: true,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['text', 'type'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
