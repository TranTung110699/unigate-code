import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'translate';
import FlatButton from 'components/common/mui/FlatButton';
import Avatar from 'components/common/avatar';
import Icon from 'components/common/Icon';
import './stylesheet.scss';

class UsersAvatarList extends React.Component {
  flatButtonStyle = {
    minWidth: 0,
  };

  cssClass = 'uses-avatar-list-preview';

  render() {
    const { className, previewNumber, onClick } = this.props;
    let users = this.props.users || [];
    users = users.filter((user) => !!(user.iid || user.id));
    let previewUsers = [];
    let remainUsers = [];
    users.forEach((user, index) => {
      if (index < previewNumber) {
        previewUsers = previewUsers.concat([user]);
      } else {
        remainUsers = remainUsers.concat([user]);
      }
    });

    if (users.length === 0) {
      return null;
    }

    const avatarSize = 32;
    return (
      <FlatButton
        className={className}
        style={this.flatButtonStyle}
        onClick={onClick}
      >
        {previewUsers.map((user) => (
          <span className={`${this.cssClass}__avatar`}>
            <Avatar user={user} size={avatarSize} title={user.name} />
          </span>
        ))}
        {remainUsers.length > 0 && (
          <span className={`${this.cssClass}__other-message`}>
            {t('+_%s', [remainUsers.length])} <Icon icon="user" />
          </span>
        )}
      </FlatButton>
    );
  }
}

UsersAvatarList.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  previewNumber: PropTypes.number,
  users: PropTypes.arrayOf(PropTypes.shape()),
};

UsersAvatarList.defaultProps = {
  className: '',
  onClick: PropTypes.func,
  previewNumber: 3,
  users: [],
};

export default UsersAvatarList;
