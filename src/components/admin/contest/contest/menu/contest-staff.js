/* eslint-disable arrow-body-style,jsx-a11y/anchor-is-valid */
import React from 'react';
import { createSelector } from 'reselect';
import ButtonNew from 'components/admin/user-abac-role/staff/new-staff/ButtonNew';
import { getSearchFormId } from 'components/admin/user-abac-role/staff/common/utils';

const contestStaff = createSelector(
  (state, props) => props && props.node,
  (node) => {
    return [
      {
        button: (
          <ButtonNew
            searchFormId={getSearchFormId(node)}
            node={node}
            ntype={'contest'}
          />
        ),
        id: 'contest_staff',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      },
    ];
  },
);

export default contestStaff;
