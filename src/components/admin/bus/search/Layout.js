import React, { Component } from 'react';

import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';

import Results from './Results';
import schema from './schema';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import topMenuSchema from '../menu/MainstageTopMenu';

class Layout extends Component {
  formid = 'bus_search';

  renderTreeResultComponent = (
    items,
    props,
    objects,
    searchValues,
    resultId,
  ) => (
    <Results
      formid={this.formid}
      resultId={resultId}
      items={items}
      searchValues={searchValues}
      dispatch={props.dispatch}
    />
  );

  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />

        <SearchWrapper
          schema={schema}
          formid={this.formid}
          alternativeApi="/bus/api/search"
          hiddenFields={{}}
          renderResultsComponent={this.renderTreeResultComponent}
        />
      </div>
    );
  }
}

export default Layout;
