import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import Results from './Results';
import { t1 } from 'translate';

class Layout extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    return (
      <div>
        <h1>{t1('current_courses')}</h1>
        <SearchWrapper
          formid="get_current_courses"
          renderResultsComponent={this.renderResultComponent}
          renderNoResultComponent={() => (
            <h3>{t1('you_havent_registered_courses_yet')}</h3>
          )}
          autoSearchWhenStart
          hidePagination
        />
      </div>
    );
  }
}

export default Layout;
