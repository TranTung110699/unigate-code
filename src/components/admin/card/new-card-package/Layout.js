/**
 * Created by DVN on 8/23/2017.
 */
import React, { Component } from 'react';
import { t1 } from 'translate';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import NewForm from './Form';
import topMenuSchema from '../menu/MainstageTopMenu';

class Layout extends Component {
  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <NewForm
          title={t1('new_package')}
          ntype="new_package"
          mode="new"
          formid="new_package"
        />
      </div>
    );
  }
}

export default Layout;
