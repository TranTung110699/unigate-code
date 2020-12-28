import React from 'react';
import PropTypes from 'prop-types';

import NodeNew from 'components/admin/node/new';
import userSchema from 'components/admin/user/schema/form';
import './stylesheet.scss';

class UpdateUserChangePassword extends React.Component {
  cssClass = 'front-end-update-user-set-password';

  render() {
    const { user, actionsToDoOnSuccess } = this.props;
    if (!user) return null;

    return (
      <div className={this.cssClass}>
        <NodeNew
          formid="edit_user_set_pass"
          ntype="user"
          schema={userSchema}
          mode="edit"
          node={user}
          step="set_pass"
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
