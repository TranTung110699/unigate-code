import React from 'react';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';
import FlatButton from 'components/common/mui/FlatButton';
import { newContestRole } from '../../routes';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';

const academicCategory = createSelector(
  (state, props) => props && props.node,
  (node) => {
    return [
      {
        button: (
          <Link to={newContestRole(node)}>
            <FlatButton
              name="submit"
              type="submit"
              icon={<Icon icon="plus" />}
              label={t1('new_role')}
            />
          </Link>
        ),
        id: 'contest_new_role',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      },
    ];
  },
);

export default academicCategory;
