import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { abacRoleTypes } from 'configs/constants';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import schema from './schema';
import Results from './Results';

class Layout extends Component {
  formid = 'abstract_abac_role_search';

  renderTreeResultComponent = (
    items,
    props,
    objects,
    searchValues,
    resultId,
  ) => <Results formid={this.formid} resultId={resultId} items={items} />;

  render() {
    return (
      <SearchWrapper
        schema={schema}
        formid={this.formid}
        alternativeApi={aApiUrls.abac_role_search}
        hiddenFields={{
          _sand_step: 'abstract',
          type: abacRoleTypes.ABSTRACT,
        }}
        renderResultsComponent={this.renderTreeResultComponent}
      />
    );
  }
}

export default Layout;
