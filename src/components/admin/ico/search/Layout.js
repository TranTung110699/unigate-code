import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import FormFilters from 'components/admin/node/search/FormFilters';
import Results from './Results';
import topMenuSchema from '../menu/MainstageTopMenu';
import { t1 } from 'translate';

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
      ntype: 'ico',
    };
    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('incoming_classes')}
          description={t1('incoming_classes_description')}
        />
        <SearchWrapper
          formid="ico_search"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showSearchButton
        >
          <FormFilters />
        </SearchWrapper>
      </div>
    );
  }
}

export default Layout;
