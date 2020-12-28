import React, { Component } from 'react';
import { t1 } from 'translate';
import { gradeElement, trainingModeElement } from 'common/utils/form';
import SearchFormLayoutFreestyle from './SearchFormLayout';

const schema = (formid, values, localStep, xpath, props, domainInfo) => ({
  grade: gradeElement(domainInfo, true, t1('grade')),
  training_mode: trainingModeElement(true, true, true) /* multi checkbox*/,
});

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['grade', 'training_mode'],
    },
  ];
};

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
