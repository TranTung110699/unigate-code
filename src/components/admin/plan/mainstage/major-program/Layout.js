/**
 * Created by quandv on 12/12/17.
 */
import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import { getSchemaApplyMajorProgram } from '../../schema/form';
import Results from './Results';

class MajorProgram extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchFormValues: {},
    };
  }
  renderResultComponent = (items, props) => {
    const hiddenFieldResults = Object.keys(this.props.paramsSearch || {});

    return (
      <Results
        formid={props.formid}
        majorPrograms={items}
        hiddenFieldResults={hiddenFieldResults}
        paramsSearch={this.props.paramsSearch}
        searchFormValues={this.state.searchFormValues}
      />
    );
  };

  render() {
    const paramsSearch = this.props.paramsSearch || {};

    return (
      <SearchWrapper
        showResult
        showSearchButton
        autoSearchWhenStart
        formid={`major_program_search-${Object.keys(paramsSearch).join('-')}`}
        schema={getSchemaApplyMajorProgram({
          ...paramsSearch,
          searchForm: 1,
        })}
        onChange={(searchFormValues) => {
          return this.setState({ searchFormValues });
        }}
        hiddenFields={paramsSearch}
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={apiUrls.major_program_search}
      />
    );
  }
}

export default MajorProgram;
