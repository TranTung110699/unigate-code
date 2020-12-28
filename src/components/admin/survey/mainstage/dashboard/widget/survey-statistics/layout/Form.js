import React, { Component } from 'react';
import Results from './Results';
import schema from '../schema/index';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import lodashGet from 'lodash.get';
// import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const { questionIid, surveyIid, paramsToFilter = {} } = this.props;
    return (
      <SearchWrapper
        {...this.props}
        alternativeApi={sApiUrls.search_open_ended_answers}
        formid={`search_open_ended_answers-${questionIid}`}
        schema={schema}
        paginationProps={{
          onlyShowIfTotalBigEnough: false,
        }}
        hiddenFields={{
          ...paramsToFilter,
          survey_iid: surveyIid,
          question_iid: questionIid,
        }}
        renderResultsComponent={this.renderResultComponent}
      />
    );
  }
}

export default SearchForm;
