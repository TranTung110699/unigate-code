import React from 'react';
import { createSelector } from 'reselect';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import FlatButton from 'components/common/mui/NewButton';
import Icon from 'components/common/Icon';

const inviteTeacherMenu = createSelector(
  (state, props) => props,
  (props) => {
    const { action } = props;

    return action === 'new'
      ? []
      : [
          {
            component: (
              <Link to={getUrl('invite/new')} className="button-link">
                <FlatButton
                  icon={<Icon icon="plus" />}
                  label={t1('add_new')}
                  type="submit"
                  primary
                />
              </Link>
            ),
            href: getUrl('invite/new'),
            id: 'new_enrolment_session',
            type: 'modal',
            floatRight: true,
          },
        ];
  },
);

export default inviteTeacherMenu;
