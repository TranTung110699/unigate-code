import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from 'actions/auth';

class Layout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  render() {
    return '';
  }
}

export default connect()(Layout);
