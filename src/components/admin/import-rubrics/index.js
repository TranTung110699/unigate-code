import React from 'react';
import { getParams } from 'common';
import ImportForm from './ImportForm';

class Layout extends React.Component {
  render() {
    const params = getParams(this.props);

    return <ImportForm importId={params && params.importId} />;
  }
}

export default Layout;
