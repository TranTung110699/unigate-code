import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import topMenuSchema from 'components/admin/financial/mainstage/wallets/menu/MainstageTopMenu';

import schema from '../schema/search-form';
import Results from './Results';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const hiddenFields = {
      ntype: 'wallet',
    };

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          formid="wallet_search"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          schema={schema}
        />
      </div>
    );
  }
}

export default Layout;
