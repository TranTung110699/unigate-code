import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import FormFilters from './FormFilters';
import Results from './Results';

class Layout extends Component {
  divStyle = { paddingBottom: 10 };

  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const { node } = this.props;

    const hiddenFields = {
      item_iid: node.iid,
      exam_type: node.exam_type,
    };

    let id = `users-in-courses-${node.iid}`;
    return (
      <div>
        <SearchWrapper
          formid={id}
          showResult
          {...this.props}
          hiddenFields={{ ...hiddenFields }}
          renderResultsComponent={this.renderResultComponent}
          showQueryField={false}
          destroyOnUnmount
          alternativeApi="/course/api/get-users"
        >
          <FormFilters node={node} id={id} />
        </SearchWrapper>
      </div>
    );
  }
}

export default Layout;
