import React, { Component } from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import PreviewUser from './PreviewUser';
import lodashGet from 'lodash.get';
import Avatar from 'antd/lib/avatar';
import { initials } from 'common/utils/string';

class PreviewUserInDialog extends Component {
  divStyle = {
    marginTop: '20px',
    textAlign: 'center',
  };
  raisedButtonStyle = {
    color: '#ffffff',
  };

  renderFull = (closeDialog, user, showFullDetailButton, hiddenItem) => (
    <PreviewUser
      user={user}
      closeDialog={closeDialog}
      showFullDetailButton={showFullDetailButton}
      hiddenItem={hiddenItem}
    />
  );

  textPreview = () => {
    const { user, showAvatar, field } = this.props;

    const userAvatar = user.avatar ? { src: user.avatar } : {};

    let content =
      lodashGet(user, field) ||
      `${lodashGet(user, 'last_name', '')} ${lodashGet(
        user,
        'first_name',
        '',
      )}`.trim() ||
      lodashGet(user, 'lname');

    if (showAvatar) {
      content = (
        <>
          <Avatar {...userAvatar}>{initials(content)}</Avatar> {content}
        </>
      );
    }

    return content;
  };

  render() {
    const { user, showFullDetailButton, hiddenItem, field } = this.props;
    return (
      <DetailOnDialog
        textPreview={this.textPreview}
        renderFull={({ closeDialog }) =>
          this.renderFull(closeDialog, user, showFullDetailButton, hiddenItem)
        }
        dialogKey={`user-info-${user && user.id}`}
      />
    );
  }
}

export default PreviewUserInDialog;
