import React, { Component } from 'react';

import CheckPermission from 'components/common/CheckPermission';
import Results from './Results';
import schema from './schema/schema-form';
import lodashGet from 'lodash.get';
import { connect } from 'react-redux';
import hrmsEvnApiUrls from 'components/admin/hrms-data/evn/endpoints';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    const renderResults = (showEditAccountButton) => (
      <Results
        items={items}
        {...props}
        searchFormId="get_result_from_sql_command"
        form="get_result_from_sql_command_result"
        showEditAccountButton={showEditAccountButton}
      />
    );

    return (
      <CheckPermission
        renderOnFailure={() => renderResults(false)}
        renderOnSuccess={() => renderResults(true)}
        actions={['root']}
      />
    );
  }

  render() {
    return (
      <div>
        <SearchWrapper
          formid={'get_result_from_sql_command'}
          schema={schema()}
          renderResultsComponent={this.renderResultComponent}
          showSearchButton
          alternativeApi={hrmsEvnApiUrls.hrms_get_result_from_sql_command}
          searchResultKey={`get_result_from_sql_command`}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conf: lodashGet(state, 'domainInfo.conf'),
  };
};

export default connect(mapStateToProps)(Layout);
