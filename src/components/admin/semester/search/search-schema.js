import React from 'react';
import Elements from 'components/common/elements';
import { t1 } from 'translate';
import { semesterTypes } from 'configs/constants';

const { schoolYear } = Elements;

const schema = (formid, values) => {
  return {
    type: {
      type: 'radio',
      classWrapper: 'col-md-3',
      fullWidth: true,
      inline: true,
      floatingLabelText: t1('type'),
      options: semesterTypes(),
      defaultValue: 'semester',
    },
    school_year: schoolYear({
      multiple: false,
      forSearch: true,
      classWrapper: 'col-md-4',
    }),
    name: {
      type: 'text',
      fullWidth: true,
      classWrapper:
        values && values.type === 'semester' ? 'col-md-5' : 'col-md-9',
      floatingLabelText: t1('search_by_name_or_iid'),
      label: t1('search_by_name_or_iid'),
      hintText: t1('please_type_search_text'),
    },
  };
};

const ui = (step, values) => {
  const fields = ['type'];
  if (values && values.type === 'semester') {
    fields.push('school_year');
  }
  return [{ id: 'default', fields: fields.concat(['name']) }];
};

export default { schema, ui };
