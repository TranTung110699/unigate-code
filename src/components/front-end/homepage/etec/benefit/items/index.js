/**
 * Created by DVN on 9/19/2017.
 */
/**
 * Created by DVN on 9/18/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './stylesheet.scss';

class Benefit extends Component {
  render() {
    const { className, icon, name } = this.props;
    return (
      <div className={`etec-benefit ${className}`}>
        <img src={icon} alt={name} />
        <p>{name}</p>
      </div>
    );
  }
}

Benefit.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
};
Benefit.defaultProps = {
  className: '',
  icon: '',
  name: '',
};
export default Benefit;
