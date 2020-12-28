import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import Results from './Results';
import FormFilter from './FormFilter';
import topMenuSchema from '../menu/MainstageTopMenu';

class TranslateLayout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const hiddenFields = {
      ntype: 'translate',
    };

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} isSmallSize />
        <SearchWrapper
          formid="translate_search"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
        >
          <FormFilter />
        </SearchWrapper>
      </div>
    );
  }
}

export default TranslateLayout;
