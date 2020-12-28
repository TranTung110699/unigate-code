import React from 'react';
import { createSelector } from 'reselect';
import ButtonNew from 'components/admin/job-position/new/ButtonNew';
import { getSearchFormId } from '../../mainstage/job-positions/common/utils';

const department = createSelector(
  (state, props) => props && props.node,
  (node) => {
    return [
      // {
      //   id: 'organization_name',
      //   href: '#',
      //   label: node && node.name,
      // },
      {
        button: (
          <ButtonNew organization={node} searchFormId={getSearchFormId(node)} />
        ),
        id: 'organization_job_positions',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      },
    ];
  },
);

export default department;
