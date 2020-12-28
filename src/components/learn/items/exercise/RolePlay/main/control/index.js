import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import './stylesheet.scss';

class RolePlayMainControl extends React.Component {
  cssClass = 'role-play-main-control';

  button = (props) => {
    const style = {
      borderRadius: '50%',
      width: '5em',
      height: '100%',
      minWidth: 0,
    };
    return (
      <RaisedButton
        className={`${this.cssClass}__button`}
        buttonStyle={style}
        labelStyle={style}
        style={style}
        labelColor="#FFFFFF"
        {...props}
      />
    );
  };

  render() {
    const { onSpeakingButtonClick, onListeningButtonClick } = this.props;
    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__buttons`}>
          {this.button({
            icon: <Icon icon="play_arrow" />,
            onClick: onListeningButtonClick,
          })}
          <div className="mic">
            {this.button({
              icon: <Icon icon="mic" />,
              onClick: onSpeakingButtonClick,
            })}
          </div>
        </div>
      </div>
    );
  }
}

RolePlayMainControl.propTypes = {
  onListeningButtonClick: PropTypes.func,
  onSpeakingButtonClick: PropTypes.func,
};

RolePlayMainControl.defaultProps = {
  onListeningButtonClick: () => {},
  onSpeakingButtonClick: () => {},
};

export default RolePlayMainControl;
