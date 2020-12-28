import React, { Component } from 'react';
import { connect } from 'react-redux';

class Layout extends Component {
  style = { padding: '0px' };

  render() {
    const { children } = this.props;
    return <div style={this.style}>{children}</div>;
  }
}

export default connect()(Layout);
