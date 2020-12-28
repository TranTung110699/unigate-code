import React from 'react';
import Select from 'schema-form/elements/select/AntdSelectField';
import { frequencyOptions } from 'common/recurring-rule/freq';

export const Freq = ({ value, onChange, readOnly }) => (
  <Select
    value={value}
    onChange={onChange}
    options={frequencyOptions()}
    readOnly={readOnly}
  />
);
