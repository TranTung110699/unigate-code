import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1, t3 } from 'translate';

import './stylesheet.scss';

class RolePlayConfirm extends React.Component {
  cssClass = 'role-play-confirm';

  render() {
    const {
      message,
      onAcceptButtonClick,
      onCancelButtonClick,
      isOKButtonPrimary,
      isCancelButtonPrimary,
    } = this.props;
    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__message`}>{message}</div>
        <div className={`${this.cssClass}__buttons`}>
          <RaisedButton
            className={`${this.cssClass}__button ${
              isOKButtonPrimary ? `${this.cssClass}__button--primary` : ''
            }`}
            onClick={onAcceptButtonClick}
            style={isOKButtonPrimary ? { color: 'white' } : {}}
          >
            {t3('ok')}
          </RaisedButton>
          <RaisedButton
            className={`${this.cssClass}__button ${
              isCancelButtonPrimary ? `${this.cssClass}__button--primary` : ''
            }`}
            onClick={onCancelButtonClick}
            style={isCancelButtonPrimary ? { color: 'white' } : {}}
          >
            {t1('cancel')}
          </RaisedButton>
        </div>
      </div>
    );
  }
}

RolePlayConfirm.propTypes = {
  isCancelButtonPrimary: PropTypes.bool,
  isOKButtonPrimary: PropTypes.bool,
  message: PropTypes.string,
  onAcceptButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
};

RolePlayConfirm.defaultProps = {
  isCancelButtonPrimary: false,
  isOKButtonPrimary: true,
  message: '',
  onAcceptButtonClick: () => {},
  onCancelButtonClick: () => {},
};

export default RolePlayConfirm;
