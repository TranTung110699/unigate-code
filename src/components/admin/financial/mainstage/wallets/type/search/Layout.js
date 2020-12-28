import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import topMenuSchema from 'components/admin/financial/mainstage/wallets/menu/MainstageTopMenu';

import FormFilters from './FormFilters';
import Results from './Results';

class Layout extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    const hiddenFields = {
      ntype: 'wallet_type',
    };

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          formid="wallet_type_search"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showSearchButton={false}
          showResult
        >
          <FormFilters />
        </SearchWrapper>
      </div>
    );
  }
}

export default Layout;
