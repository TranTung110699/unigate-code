import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import schema from './schema';
import Results from './Results';

class Search extends Component {
  getFormId = () => this.props.formid || 'survey_search';

  renderResultsComponent = (items) => {
    const { renderActionCell, isSIS } = this.props;
    return (
      <Results
        isSIS={isSIS}
        formid={this.getFormId()}
        items={items}
        renderActionCell={renderActionCell}
      />
    );
  };

  render() {
    const { hiddenFields, isSIS } = this.props;
    return (
      <SearchWrapper
        isSIS={isSIS}
        formid={this.getFormId()}
        schema={schema}
        defaultValues={{ status: ['queued', 'approved'] }}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultsComponent}
        alternativeApi={sApiUrls.survey_search}
        destroyOnUnmount
      />
    );
  }
}

export default withSchoolConfigs(Search);
