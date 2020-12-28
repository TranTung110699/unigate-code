import React from 'react';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';
import PrimaryButton from 'components/common/primary-button';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';

const department = createSelector(
  (state, props) => props && props.node,
  (node) => {
    return [
      // {
      //   id: 'organization_name',
      //   href: getUrl(`organization/${node && node.iid}/roles`),
      //   label: node && node.name,
      // },
      {
        button: (
          <Link to={getUrl(`organization/${node && node.iid}/roles/new`)}>
            <PrimaryButton
              name="submit"
              type="submit"
              icon={<Icon icon="plus" />}
              label={t1('new_role')}
            />
          </Link>
        ),
        id: 'organization_new_role',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      },
    ];
  },
);

export default department;
