import { t1 } from 'translate/index';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import { convertListOfValuesIntoOptionsForFormElement } from 'common/utils/form';

const filterTypes = {
  ALL: 'all',
  URGENT: 'urgent',
};

const filterTypeToText = (type) => {
  const map = {
    [filterTypes.ALL]: t1('all'),
    [filterTypes.URGENT]: t1('deadline_soon'),
  };
  return map[type];
};

const filterTypeOptions = convertListOfValuesIntoOptionsForFormElement(
  Object.values(filterTypes),
  filterTypeToText,
);

const schema = (formid, values) => ({
  filter_type: {
    type: 'radio',
    options: filterTypeOptions,
    defaultValue: filterTypes.ALL,
    inline: true,
    // classWrapper: 'display-none',
  },
});

const ui = (step, values) => {
  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields: ['filter_type'],
    },
  ];
};

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1, isSIS: true },
};
