import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints/index';
import Result from './result';
import schema from './schema';

class Index extends React.Component {
  renderResultComponent = (numberOfLearners, props, objects, searchValues) => (
    <Result numberOfLearners={numberOfLearners} searchValues={searchValues} />
  );

  render() {
    const formid = this.props.formid || 'get_number_of_learners_by_time';

    return (
      <SearchWrapper
        autoSearchWhenStart={false}
        formid={formid}
        schema={schema}
        showResult
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={apiUrls.get_number_of_learners_by_time}
      />
    );
  }
}

export default Index;
