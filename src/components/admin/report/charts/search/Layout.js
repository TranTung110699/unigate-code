import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import topMenuSchema from 'components/admin/report/menu/MainstageTopMenu';
import TopForm from './TopForm';
import BottomForm from './BottomForm';

class Layout extends Component {
  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <TopForm />
        <BottomForm />
      </div>
    );
  }
}

export default Layout;
