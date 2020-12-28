import { t1 } from 'translate';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import { surveyStatuses, surveyStatusOptions } from 'configs/constants/survey';
import { remove } from 'common/utils/Array';

const schema = (formid, values) => ({
  survey__status: {
    fullWidth: true,
    type: 'multiCheckbox',
    floatingLabelText: t1('status'),
    hintText: t1('status'),
    options: surveyStatusOptions(),
    defaultValue: remove(Object.values(surveyStatuses), surveyStatuses.DELETED),
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['survey__status'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
