import React from 'react';
import { t1 } from 'translate';
import RubricOverview from 'components/admin/rubric/overview/Overview';

/**
 *
 * @param rootRubricType : ['course' | 'enrolment_plan' | 'training_plan']
 * @return SchemaElement
 */
export const rootRubricElement = (rootRubricType) => ({
  type: 'select',
  floatingLabelText: t1('passing_rubric'),
  options: 'async',
  paramsasync: {
    __url__: '/rubrik/api/get-rubrics',
    params: {
      type: rootRubricType,
    },
  },
});

export const searchByRubricElement = (rubricIid, classWrapper) => ({
  type: 'select',
  options: 'async',
  paramsasync: {
    __url__: '/rubrik/schema-form/get-rubric-tree',
    value: {
      iid: rubricIid,
    },
  },
  floatingLabelText: t1('choose_a_rubric'),
  classWrapper,

  guide: {
    click: true,
    title: t1('click_to_see_passing_rubric_details'),
    content: <RubricOverview iid={rubricIid} />,
  },
});

export const passFailedRubric = (classWrapper = 'col-md-2') => {
  return {
    type: 'multiCheckbox',
    // floatingLabelText: t1('passed'),
    // floatingLabelFixed: false,
    fullWidth: true,
    classWrapper,
    options: [
      {
        value: 'passed',
        label: t1('passed'),
      },
      {
        value: 'failed',
        label: t1('not_yet_passed'),
      },
    ],
    // inline: true,
  };
};
