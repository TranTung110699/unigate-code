import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import { getSchemaMultiDegreeSearch } from '../../schema/form';
import Results from './Results';

class MultiDegree extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchFormValues: {},
    };
  }
  renderResultComponent = (items, props) => {
    this.setState({ items });
  };

  render() {
    const paramsSearch = this.props.paramsSearch || {};

    const formid = `multi_degree_search-${Object.keys(paramsSearch).join('-')}`;
    return [
      <SearchWrapper
        showResult
        showSearchButton
        autoSearchWhenStart
        formid={formid}
        schema={getSchemaMultiDegreeSearch({
          ...paramsSearch,
          searchForm: 1,
        })}
        onChange={(searchFormValues) => {
          return this.setState({ searchFormValues });
        }}
        hiddenFields={paramsSearch}
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={apiUrls.multi_degree_search}
      />,
      <Results
        formid={formid}
        items={this.state.items}
        hiddenFieldResults={paramsSearch}
        paramsSearch={paramsSearch}
        searchFormValues={this.state.searchFormValues}
      />,
    ];
  }
}

export default MultiDegree;
