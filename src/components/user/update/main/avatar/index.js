import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import AvatarEditor from 'components/common/utils/AvatarEditor';
import sagaActions from 'actions/node/saga-creators';
import './stylesheet.scss';

// import apiUrls from 'api-endpoints';

class UpdateUserAvatar extends React.Component {
  avatarEditorParams = {
    access: 'public',
    type: 'attachment',
    folder: 'user',
  };

  cssClass = 'front-end-update-user-avatar';

  updateAvatar = (attachment) => {
    const {
      dispatch,
      user,
      actionsToDoOnSuccess,
      requestSuccessful,
    } = this.props;
    dispatch(
      sagaActions.updateNodeRequest({
        step: 'avatar',
        iid: user.iid,
        data: {
          ntype: 'user',
          oavatar: attachment.link,
          avatar: attachment.link,
          avatar_file_id: attachment.id,
        },
        actionsToDoOnSuccess,
        requestSuccessful,
      }),
    );
  };

  render() {
    const { user } = this.props;
    const avatar =
      user.avatar && `${user.avatar}?_random=${new Date().getTime()}`;
    if (!user) return null;

    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__avatar`}>
          <AvatarEditor
            image={avatar}
            options={{
              fileName: user.iid,
            }}
            params={this.avatarEditorParams}
            editorSuccess={this.updateAvatar}
            userAvatar
          />
        </div>
      </div>
    );
  }
}

UpdateUserAvatar.propTypes = {
  user: PropTypes.shape().isRequired,
};

UpdateUserAvatar.defaultProps = {};

export default connect()(UpdateUserAvatar);
