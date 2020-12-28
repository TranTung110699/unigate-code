import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconClose from 'material-ui/svg-icons/navigation/close';
import RaisedButton from 'material-ui/RaisedButton';
import './stylesheet.scss';

class CloseButton extends Component {
  styles = {
    iconButtonStyle: { position: 'absolute', right: 0, top: 0 },
    iconButtonIconStyle: { width: 30, height: 30 },

    buttonStyle: {
      position: 'absolute',
      left: '-100px',
      top: '10px',
      background: 'white',
    },
  };

  render() {
    const { onClick, closeButtonType } = this.props;
    if (closeButtonType === 'button') {
      return (
        <RaisedButton
          onClick={onClick}
          style={this.styles.buttonStyle}
          icon={<IconClose />}
        />
      );
    }

    return (
      <IconButton
        onClick={onClick}
        style={this.styles.iconButtonStyle}
        iconStyle={this.styles.iconButtonIconStyle}
        className="close-modal"
      >
        <IconClose className="close-icon" />
      </IconButton>
    );
  }
}

export default CloseButton;
