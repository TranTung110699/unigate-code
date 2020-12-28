import React from 'react';
import { userGrades, userGradeToText } from 'configs/constants/user';
import { academicCategories } from 'components/admin/academic-category/schema/elements';

const schema = (formid) => {
  return Object.values(userGrades).reduce(
    (res, grade) => ({
      ...res,
      [grade]: academicCategories(formid, {
        label: userGradeToText(grade),
      }),
    }),
    {},
  );
};

const ui = (step, values, themeConfig, xpath) => {
  return [
    {
      id: 'default',
      fields: Object.values(userGrades),
    },
  ];
};

export default {
  schema,
  ui,
};
