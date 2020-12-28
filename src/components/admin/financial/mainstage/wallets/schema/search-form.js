/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import React from 'react';

const schema = () => ({
  form_of_training: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      floatingLabelText: t1('applicable_for_major'),
      displayFields: [
        'faculty',
        'major',
        'training_mode',
        'training_level',
        'ico',
      ],
      forSearch: true,
      notValidate: true,
    }),
  },
  search_data: {
    classWrapper: 'col-md-12',
    type: 'text',
    fullWidth: true,
    name: 'text',
    floatingLabelText: t1('student'),
    floatingLabelFixed: true,
    placeholder: t1('search_by_student_info'),
  },
});

const ui = () => {
  return [
    {
      id: 'id',
      fields: ['form_of_training', 'search_data'],
    },
  ];
};

export default {
  schema,
  ui,
};
