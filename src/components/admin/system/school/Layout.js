/**
 * Created by DVN on 8/23/2017.
 */
import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';
import schema from './search-schema-form';
import systemApiUrls from 'components/admin/system/endpoints';

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
      _sand_is_system: 1,
      ntype: 'school',
    };

    return (
      <SearchWrapper
        schema={schema}
        formid="system_school_search"
        renderResultsComponent={this.renderResultComponent}
        hiddenFields={hiddenFields}
        showSearchButton
        alternativeApi={systemApiUrls.system_school_search}
      />
    );
  }
}

export default Layout;
