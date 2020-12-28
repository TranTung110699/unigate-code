import React from 'react';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import { t1 } from 'translate';

const schema = (formid) => {
  return {
    main: academicCategories(formid, {
      multiple: false,
      label: t1('academic_category'),
    }),
    go_with: academicCategories(formid, {
      label: t1('go_with'),
    }),
  };
};

const ui = (step, values, themeConfig, xpath) => {
  return [
    {
      id: 'default',
      fields: ['main', 'go_with'],
    },
  ];
};

export default {
  schema,
  ui,
};
