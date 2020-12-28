import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/common/avatar';
import './stylesheet.scss';

class RolePlayCharacter extends React.Component {
  cssClass = 'role-play-character';

  handleClick = () => {
    const { item, onClick } = this.props;
    onClick(item);
  };

  render() {
    const { item, active, avatarSize, onClick } = this.props;
    const { name, avatar } = item || {};

    return (
      <button
        disabled={!onClick}
        className={`
          ${this.cssClass} \
          ${active ? `${this.cssClass}--active` : ''}
        `}
        onClick={this.handleClick}
      >
        <div
          className={`${this.cssClass}__avatar \
            ${onClick ? `${this.cssClass}__avatar--clickable` : ''}`}
        >
          <Avatar user={item} size={avatarSize || 40} />
        </div>
      </button>
    );
  }
}

RolePlayCharacter.propTypes = {
  active: PropTypes.bool,
  avatarSize: PropTypes.number,
  item: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

RolePlayCharacter.defaultProps = {
  active: false,
  avatarSize: null,
  item: {
    avatar: '',
    name: '',
  },
  onClick: null,
};

export default RolePlayCharacter;
