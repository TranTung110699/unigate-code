import React, { Component } from 'react';
import schema from './search-schema';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';

class Index extends Component {
  renderResultComponent = (items, props) => {
    const { slug } = this.props;
    return <Results items={items} {...props} slug={slug} />;
  };

  render() {
    const { slug } = this.props;

    return (
      <div>
        <h1>Add admin for: {slug}</h1>
        <SearchWrapper
          formid="system_search_staff"
          renderResultsComponent={this.renderResultComponent}
          showSearchButton
          schema={schema}
          alternativeApi={'/system/api/search-users'}
        />
      </div>
    );
  }
}

export default Index;
