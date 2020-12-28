import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import Results from './Results';
import schema from './search-schema';
import topMenuSchema from '../menu/MainstageTopMenu';
import { t1 } from 'translate';

class Layout extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('semesters_&_school_years')}
          description={t1('semesters_&_school_years_description')}
        />
        <SearchWrapper
          formid="semester_search"
          renderResultsComponent={this.renderResultComponent}
          showSearchButton
          ntype="semester"
          schema={schema}
        />
      </div>
    );
  }
}

export default Layout;
