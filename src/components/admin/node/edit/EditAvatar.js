/**
 * Created by vohung on 27/05/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AvatarEditor from 'components/common/utils/AvatarEditor';
import sagaActions from 'actions/node/saga-creators';

// import apiUrls from 'api-endpoints';

class EditAvatar extends Component {
  updateAvatar = (attachment) => {
    const { node, dispatch } = this.props;
    if (!node) return;
    dispatch(
      sagaActions.updateNodeRequest({
        step: 'avatar',
        iid: node.iid,
        data: {
          id: node.id,
          ntype: node.ntype,
          iid: node.iid,
          oavatar: node.avatar,
          avatar: attachment.link,
          avatar_file_id: attachment.id,
        },
      }),
    );
  };

  render() {
    const { node, readOnly } = this.props;
    if (!node) return '';
    return (
      <AvatarEditor
        image={node && node.avatar}
        options={{
          fileName: node.id,
        }}
        readOnly={readOnly}
        params={{
          access: 'public',
          type: 'attachment',
          folder: node.ntype,
        }}
        editorSuccess={this.updateAvatar}
      />
    );
  }
}

EditAvatar.propTypes = {
  dispatch: PropTypes.func,
};

EditAvatar.defaultProps = {
  dispatch: () => {},
};

export default connect()(EditAvatar);
