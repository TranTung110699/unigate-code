import React from 'react';
import Select from 'schema-form/elements/select/AntdSelectField';
import { dayInMonthOptions } from 'common/recurring-rule/bymonthday';

export const ByMonthDay = ({ month, value, onChange, readOnly }) => (
  <Select
    value={value}
    onChange={onChange}
    options={dayInMonthOptions(month)}
    readOnly={readOnly}
  />
);
