/**
 * Created by DVN on 9/20/2017.
 */
/**
 * Created by DVN on 9/18/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonGreen extends Component {
  render() {
    const { label, style } = this.props;

    const finalStyle = Object.assign(
      {
        background: '#8fdd2d',
        margin: '0 auto',
        display: 'block',
        minWidth: '200px',
        height: '45px',
      },
      style,
    );
    return <button style={finalStyle}>{label}</button>;
  }
}

ButtonGreen.propTypes = {
  style: PropTypes.instanceOf(Object),
  label: PropTypes.string,
};
ButtonGreen.defaultProps = {
  style: {},
  label: '',
};
export default ButtonGreen;
