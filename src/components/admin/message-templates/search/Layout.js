import React, { Component } from 'react';

import apiUrls from 'api-endpoints';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import Results from './Results';
import schema from './schema';
import topMenuSchema from '../menu/MainstageTopMenu';

class Layout extends Component {
  formid = 'message_template_search';

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
          alternativeApi={apiUrls[this.formid]}
          hiddenFields={{}}
          renderResultsComponent={this.renderTreeResultComponent}
        />
      </div>
    );
  }
}

export default Layout;
