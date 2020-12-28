import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchForm from './SearchForm';
import topMenuSchema from '../menu/MainstageTopMenu';
import { menuItems as leftMenuSchema } from '../../menu/sub-left-menu-configs';
import { t1 } from 'translate';

class AssetLayout extends Component {
  render() {
    const hiddenFields = {
      ntype: 'asset',
    };

    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('asset')}
          description={t1('asset_description')}
        />
        <SubLeftMenuContext schema={leftMenuSchema()} />
        <SearchForm hiddenFields={hiddenFields} {...this.props} />
      </div>
    );
  }
}

export default AssetLayout;
