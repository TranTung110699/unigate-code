/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { t1 } from 'translate';

const schema = (
  formid,
  values,
  step,
  xpath,
  { importFields, uniqueFields },
) => {
  let defaultValue = [];
  const options = [];

  importFields.forEach((field) => {
    const tmp = field.replace('_name', '');
    defaultValue.push(tmp);
    options.push({
      value: tmp,
      label: t1(tmp),
      name: t1(tmp),
    });
  });

  defaultValue = Array.isArray(uniqueFields)
    ? uniqueFields
        .filter((field) => importFields.includes(field))
        .map((field) => field.replace('_name', ''))
    : defaultValue;
  return {
    unique_fields: {
      type: 'multiCheckbox',
      fullWidth: true,
      inline: true,
      options,
      defaultValue: defaultValue,
    },
  };
};

const ui = () => [
  {
    id: 'id',
    title: t1('choose_user_unique_keys'),
    subTitle: t1('these_fields_will_determine_how_to_find_the_current_users'),
    fields: ['unique_fields'],
  },
];

export default {
  schema,
  ui,
};
