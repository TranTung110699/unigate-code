import React from 'react';
import Select from 'schema-form/elements/select/AntdSelectField';
import { monthOptions } from 'configs/constants';

export const ByMonth = ({ value, onChange, readOnly }) => (
  <Select
    value={value}
    onChange={onChange}
    options={monthOptions()}
    readOnly={readOnly}
  />
);
