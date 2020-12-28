import React from 'react';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new';
import userSchema from 'components/admin/user/schema/form';

class UpdateUserBasicInfo extends React.Component {
  cssClass = 'front-end-update-user-basic-info';

  render() {
    const { user, actionsToDoOnSuccess } = this.props;
    if (!user) return null;

    return (
      <div className={this.cssClass}>
        <NodeNew
          formid="edit_user"
          ntype="user"
          schema={userSchema}
          mode="edit"
          node={user}
          actionsToDoOnSuccess={actionsToDoOnSuccess}
        />
      </div>
    );
  }
}

UpdateUserBasicInfo.propTypes = {
  user: PropTypes.shape().isRequired,
};

UpdateUserBasicInfo.defaultProps = {};

export default UpdateUserBasicInfo;
