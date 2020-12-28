import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import Results from './Results';
import FormFilters from './FormFilters';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    const { node, formid } = props;
    return <Results items={items} node={node} formid={formid} />;
  }

  render() {
    const { node } = this.props;

    const hiddenFields = {
      course_iid: node.iid,
    };

    return (
      <SearchWrapper
        formid="certificate_users"
        showResult
        hiddenFields={{ ...hiddenFields }}
        {...this.props}
        renderResultsComponent={this.renderResultComponent}
        showQueryField={false}
      >
        <FormFilters {...this.props} />
      </SearchWrapper>
    );
  }
}

export default Layout;
