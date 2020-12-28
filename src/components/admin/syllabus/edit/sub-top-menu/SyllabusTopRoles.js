import React from 'react';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';
import FlatButton from 'components/common/mui/FlatButton';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';

const SyllabusTopRoles = createSelector(
  (state, props) => props && props.node,
  (node) => {
    return [
      {
        button: (
          <Link to={getUrl(`syllabus/${node && node.iid}/roles/new`)}>
            <FlatButton
              name="submit"
              type="submit"
              icon={<Icon icon="plus" />}
              label={t1('new_role')}
            />
          </Link>
        ),
        id: 'syllabus_new_role',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      },
    ];
  },
);

export default SyllabusTopRoles;
