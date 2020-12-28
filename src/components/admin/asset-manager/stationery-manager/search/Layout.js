import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchForm from './SearchForm';
import topMenuSchema from '../menu/MainstageTopMenu';
import { menuItems as leftMenuSchema } from '../../menu/sub-left-menu-configs';

class ImportStationeryLayout extends Component {
  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SubLeftMenuContext schema={leftMenuSchema()} />
        <SearchForm {...this.props} step="import" />
      </div>
    );
  }
}

export default ImportStationeryLayout;
