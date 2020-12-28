import React from 'react';
import Checkbox from 'antd/lib/checkbox';
import { weekdayOptions } from 'common/recurring-rule/byweekday';
import lodashGet from 'lodash.get';

const getOptionValue = (opt) => lodashGet(opt, 'value');

const getOptionLabel = (opt) => {
  let label = lodashGet(opt, 'label');
  label = typeof label !== 'undefined' ? label : lodashGet(opt, 'primaryText');
  label = typeof label !== 'undefined' ? label : '';

  return label;
};

const isOptionReadOnly = (opt) => lodashGet(opt, 'readOnly');

export const ByWeekday = ({ value, onChange, readOnlyWeekdays }) => (
  <Checkbox.Group value={value} onChange={onChange}>
    {weekdayOptions(readOnlyWeekdays).map((opt) => (
      <Checkbox
        {...opt || {}}
        value={getOptionValue(opt)}
        style={
          isOptionReadOnly(opt)
            ? {
                pointerEvents: 'none',
              }
            : undefined
        }
      >
        {getOptionLabel(opt)}
      </Checkbox>
    ))}
  </Checkbox.Group>
);
