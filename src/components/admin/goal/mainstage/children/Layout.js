import React, { Component } from 'react';
import Metadata from 'components/admin/node/edit/metadata/MetadataContainer';

class Layout extends Component {
  render() {
    const { node } = this.props;
    return <Metadata node={node} />;
  }
}

export default Layout;
