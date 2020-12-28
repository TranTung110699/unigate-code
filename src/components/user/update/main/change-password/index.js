import React from 'react';
import PropTypes from 'prop-types';

import NodeNew from 'components/admin/node/new';
import schema from 'components/admin/user/schema/form';

class UpdateUserChangePassword extends React.Component {
  cssClass = 'front-end-update-user-change-password';

  render() {
    const { user, actionsToDoOnSuccess } = this.props;
    if (!user) return null;

    return (
      <div className={this.cssClass}>
        <NodeNew
          formid="edit_user_change_pass"
          ntype="user"
          schema={schema}
          mode="edit"
          node={user}
          step="change_pass"
          actionsToDoOnSuccess={actionsToDoOnSuccess}
        />
      </div>
    );
  }
}

UpdateUserChangePassword.propTypes = {
  user: PropTypes.shape().isRequired,
};

UpdateUserChangePassword.defaultProps = {};

export default UpdateUserChangePassword;
