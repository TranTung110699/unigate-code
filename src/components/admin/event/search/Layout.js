import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import Results from './Results';
import FormFilter from './FormFilter';
import topMenuSchema from '../menu/MainstageTopMenu';
import { t1 } from 'translate';

export const formid = 'event_search';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('event')}
          description={t1('event_description')}
        />
        <SearchWrapper
          ntype="event"
          formid={formid}
          renderResultsComponent={this.renderResultComponent}
        >
          <FormFilter />
        </SearchWrapper>
      </div>
    );
  }
}

export default Layout;
