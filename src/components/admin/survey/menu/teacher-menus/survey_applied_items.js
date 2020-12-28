import React from 'react';
import { createSelector } from 'reselect';
import { getUrl } from 'routes/links/common';
import ButtonNew from '../../mainstage/applied-items/new/ButtonNew';
import { getSearchFormId } from '../../mainstage/applied-items/common';

const menu = createSelector(
  (state, props) => props && props.node,
  (node) => [
    {
      button: <ButtonNew survey={node} searchFormId={getSearchFormId(node)} />,
      href: getUrl('survey'),
      id: 'new_survey_applied_items',
      type: 'modal',
      floatRight: true,
      icon: 'plus',
    },
  ],
);

export default menu;
