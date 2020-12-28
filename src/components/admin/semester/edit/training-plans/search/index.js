import React, { Component } from 'react';

import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import Results from './Results';
import schema from './search-schema';
import topMenuSchema from '../menu/MainstageTopMenu';

class Layout extends Component {
  renderResultsComponent = (items, props, objects, searchValues) => (
    <Results items={items} {...props} searchValues={searchValues} />
  );

  render() {
    const { node } = this.props;

    const hiddenFields = node ? { semester: node.iid } : {};

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema(node)} />

        <SearchWrapper
          formid={`training-plan-for-semester-${node ? node.iid : ''}`}
          renderResultsComponent={this.renderResultsComponent}
          showSearchButton
          schema={schema}
          hiddenFields={hiddenFields}
          alternativeApi={'/k12/training-plan/search'}
        />
      </div>
    );
  }
}

export default Layout;
