import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Avatar from 'material-ui/Avatar';
import defaultAvatar from 'components/common/defaultAvatar.gif';
import { Link } from 'react-router-dom';
import stepOptions from '../configs/stepOptions';
import './stylesheet.scss';

class UserUpdateNav extends React.Component {
  cssClass = 'front-end-user-update-nav';

  render() {
    const { user, optionId } = this.props;
    const options = stepOptions(user);
    if (!user) return null;
    const avatar = user.avatar
      ? `${user.avatar}?_random=${new Date().getTime()}`
      : defaultAvatar;

    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__user-info`}>
          <Avatar
            size={49}
            className={`${this.cssClass}__user-avatar`}
            src={avatar}
          />
          <div className={`${this.cssClass}__user-name`}>{user.name}</div>
        </div>
        <hr />
        <div className={`${this.cssClass}__buttons`}>
          {options.map(
            (option) =>
              option.available && (
                <Link
                  key={option.id}
                  className={`${this.cssClass}__button\
                    ${
                      option.id === optionId
                        ? `${this.cssClass}__button--active`
                        : ''
                    }\
                    ${this.cssClass}__button--${option.icon}${
                    option.id === optionId ? '-active' : ''
                  }\
                    `}
                  to={option.url}
                >
                  <p>{t1(option.label)}</p>
                </Link>
              ),
          )}
        </div>
      </div>
    );
  }
}

UserUpdateNav.propTypes = {
  optionId: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

UserUpdateNav.defaultProps = {
  optionId: '',
  user: {
    name: '',
    avatar: '',
  },
};

export default UserUpdateNav;
