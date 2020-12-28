import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import Results from './Results';
import FormFilter from './FormFilter';
import topMenuSchema from '../menu/MainstageTopMenu';

class Layout extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    const hiddenFields = {
      ntype: 'faq',
    };

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          formid="faq_search"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
        >
          <FormFilter />
        </SearchWrapper>
      </div>
    );
  }
}

export default Layout;
