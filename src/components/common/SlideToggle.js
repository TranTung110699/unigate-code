import React, { Component } from 'react';
// import Icon from './Icon';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';

// receives props: onLeft & onRight as 2 callbacks
class SlideToggle extends Component {
  render() {
    return <Toggle label={this.props.label} labelPosition="right" />;
  }
}

SlideToggle.propTypes = {
  label: PropTypes.string,
};

SlideToggle.defaultProps = {
  label: '',
};

export default SlideToggle;
