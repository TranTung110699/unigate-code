import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import './stylesheet.scss';

class RolePlayPopup extends React.Component {
  cssClass = 'role-play-pop-up';

  handleCloseAreaClick = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__close-area`} />
        <div className={`${this.cssClass}__visible`}>
          <div className={`${this.cssClass}__close`}>
            <Icon icon="close" onClick={this.handleCloseAreaClick} />
          </div>
          <div className={`${this.cssClass}__content`}>{children}</div>
        </div>
      </div>
    );
  }
}

RolePlayPopup.propTypes = {
  onClose: PropTypes.func,
};

RolePlayPopup.defaultProps = {
  onClose: () => {},
};

export default RolePlayPopup;
