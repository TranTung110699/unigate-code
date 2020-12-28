import React from 'react';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new';
import schema from 'components/admin/user/schema/form';

class UpdateUserTeacherInfo extends React.Component {
  cssClass = 'front-end-update-user-teacher-info';

  formatUserForForm = (user) => {
    if (!user) return user;

    return Object.assign({}, user, {
      counter__mark_fee:
        user.counter &&
        typeof user.counter.mark_fee !== 'undefined' &&
        user.counter.mark_fee,
      settings__home:
        user.settings &&
        typeof user.settings.home !== 'undefined' &&
        user.settings.home,
    });
  };

  render() {
    const { user, actionsToDoOnSuccess } = this.props;
    if (!user) return null;

    return (
      <div className={this.cssClass}>
        <NodeNew
          formid="edit_teacher_info"
          ntype="user"
          schema={schema}
          mode="edit"
          node={this.formatUserForForm(user)}
          step="teacher_info"
          actionsToDoOnSuccess={actionsToDoOnSuccess}
        />
      </div>
    );
  }
}

UpdateUserTeacherInfo.propTypes = {
  user: PropTypes.shape().isRequired,
};

UpdateUserTeacherInfo.defaultProps = {};

export default UpdateUserTeacherInfo;
