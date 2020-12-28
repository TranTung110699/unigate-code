import React from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import { subjectConditionOptions } from '../query/text';

const schema = (formid, values) => ({
  passed_all: {
    type: 'checkbox',
    classWrapper: 'col-md-6 m-t-15',
    label: t1('passed_all_subject'),
  },
  condition_subject: {
    type: 'select',
    classWrapper: 'col-md-6',
    floatingLabelText: t1('condition_subject'),
    defaultValue: 'all',
    options: subjectConditionOptions(),
  },
});

const ui = (step, values) => {
  return [
    {
      id: 'default',
      fields: get(values, 'subject.passed_all')
        ? ['passed_all']
        : ['passed_all', 'condition_subject'],
    },
  ];
};

const subjectSearchSchema = {
  schema,
  ui,
};

export default {
  type: 'section',
  schema: subjectSearchSchema,
};
