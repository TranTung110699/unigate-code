import React, { Component } from 'react';
import TreeSearch from './tree/Layout';

class Layout extends Component {
  cssClass = 'admin-major-search-layout';

  render() {
    return (
      <div>
        <TreeSearch {...this.props} />
      </div>
    );
  }
}

export default Layout;
