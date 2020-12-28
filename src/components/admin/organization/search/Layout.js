import React, { Component } from 'react';
import Search from './grid/Layout';

class Layout extends Component {
  render() {
    return (
      <div>
        <Search {...this.props} />
      </div>
    );
  }
}

export default Layout;
