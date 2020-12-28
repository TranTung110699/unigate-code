import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import Results from './Results';
import FormFilter from './FormFilter';
import topMenuSchema from '../menu/MainstageTopMenu';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          ntype="degree"
          formid="degree_search"
          renderResultsComponent={this.renderResultComponent}
        >
          <FormFilter />
        </SearchWrapper>
      </div>
    );
  }
}

export default Layout;
