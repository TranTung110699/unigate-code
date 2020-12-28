import React, { Component } from 'react';
import TopForm from './TopForm';
import BottomForm from './BottomForm';

class Layout extends Component {
  render() {
    return (
      <div>
        <TopForm />
        <BottomForm />
      </div>
    );
  }
}

export default Layout;
