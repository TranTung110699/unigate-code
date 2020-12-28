import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 16/04/2017
 **/
class Popover extends Component {
  render() {
    const { children, show } = this.props;

    const style = {
      display: show ? '' : 'none',
    };
    const className = this.props.className
      ? `${this.props.className} ui-custom-popover`
      : 'ui-custom-popover';
    return (
      <ul className={className} style={style}>
        {children}
      </ul>
    );
  }
}

Popover.propTypes = {
  children: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
};
Popover.defaultProps = {
  children: [],
  show: false,
};
export default Popover;
