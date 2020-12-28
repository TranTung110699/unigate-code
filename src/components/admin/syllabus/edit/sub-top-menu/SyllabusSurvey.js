/* eslint-disable arrow-body-style,jsx-a11y/anchor-is-valid */
import React from 'react';
import { createSelector } from 'reselect';
import { getSearchFormId as getSurveySearchFormId } from '../survey/common';
import ButtonNewSurvey from '../survey/new/ButtonNew';

const syllabusStaff = createSelector(
  (state, props) => props && props.node,
  (node) => {
    return [
      {
        button: (
          <ButtonNewSurvey
            node={node}
            searchFormId={getSurveySearchFormId(node)}
          />
        ),
        id: 'syllabus_survey',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      },
    ];
  },
);

export default syllabusStaff;
