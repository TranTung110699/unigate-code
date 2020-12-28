import React from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';

const schema = () => {
  return {
    comparative: {
      type: 'select',
      fullWidth: true,
      floatingLabelText: t1('comparative_type_of_period_of_tim'),
      floatingLabelFixed: true,
      options: [
        {
          label: t1('greater_than'),
          value: 'gte',
        },
        {
          label: t1('lest_than'),
          value: 'lt',
        },
      ],
      defaultValue: 'gte',
    },
    time: {
      type: 'number',
      floatingLabelText: t1('period_of_time(hour)'),
      min: 0,
      fullWidth: true,
    },
  };
};

const ui = () => [
  {
    id: 'id',
    fields: ['comparative', 'time'],
  },
];

const SearchFormLayoutFreestyle = ({ groups }) => (
  <div className="flex-container-wrap">
    <div className="flex-item">{get(groups, 'id.fieldNames.comparative')}</div>
    <div className="flex-item">{get(groups, 'id.fieldNames.time')}</div>
  </div>
);

export default {
  schema,
  ui,
  layout: {
    component: SearchFormLayoutFreestyle,
    freestyle: 1,
  },
};
