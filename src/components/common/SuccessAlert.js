import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';

const style = {
  color: 'green',
};

class SuccessAlert extends Component {
  render() {
    if (this.props.inline) {
      return (
        <span
          className="warning-item"
          style={Object.assign({}, style, this.props.style)}
        >
          {this.props.withIcon ? <Icon icon="ok" /> : ''} {this.props.children}
        </span>
      );
    } else
      return (
        <div
          className="warning-item"
          style={Object.assign({}, style, this.props.style)}
        >
          {this.props.withIcon ? <Icon icon="ok" /> : ''} {this.props.children}
        </div>
      );
  }
}

// // withIcon =
SuccessAlert.propTypes = {
  withIcon: PropTypes.bool,
};

export default SuccessAlert;
