/**
 * Created by DVN on 8/23/2017.
 */
import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';
import topMenuSchema from '../menu/MainstageTopMenu';
import apiUrls from '../endpoints';
import schema from './schema';

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
      ntype: 'card',
    };
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          formid="search_card"
          renderResultsComponent={this.renderResultComponent}
          hiddenFields={hiddenFields}
          alternativeApi={apiUrls.search_card}
          schema={schema}
          showResult
          autoSearchWhenStart
          autoSearchWhenValuesChange
        />
      </div>
    );
  }
}

export default Layout;
