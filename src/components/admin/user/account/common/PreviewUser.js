import React from 'react';
import { Link } from 'react-router-dom';
import { t1 } from 'translate/index';
import Icon from 'components/common/Icon';

import { getUrl } from 'routes/links/common';
import Button from 'components/common/primary-button';
import { formatUserData } from 'components/admin/node/schema/format';
import ViewUserDashboard from 'components/admin/user/user-in-school/view/BasicUserInfo';

const previewUser = ({
  user = {},
  closeDialog = null,
  actions = null,
  showFullDetailButton = true,
  hiddenItem = [],
}) => {
  return (
    <div>
      <ViewUserDashboard
        user={formatUserData(user)}
        roleUser={'user'}
        hiddenItem={hiddenItem}
      />
      {showFullDetailButton && (
        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          <Link
            to={getUrl('admin_view_student', user)}
            target={closeDialog ? '' : '_blank'}
          >
            <Button
              icon={<Icon icon="send" />}
              label={t1('view_detail')}
              onClick={closeDialog || null}
              className="NEW_UI_JULY_2019-primary-button"
            />
          </Link>
          {actions}
        </div>
      )}
    </div>
  );
};

export default previewUser;
