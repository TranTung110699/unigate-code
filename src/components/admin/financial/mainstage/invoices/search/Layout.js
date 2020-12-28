import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from '../schema/search-form';
import Results from './Results';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} typeRender={this.props.type} />;
  }

  render() {
    const hiddenFields = {
      ntype: 'invoice',
    };

    if (this.props.type === 'cancel-invoice') {
      hiddenFields.request_to_cancel__status = 'sent';
    }

    return (
      <SearchWrapper
        key={this.props.type || 'invoice_search'}
        resetForm
        autoSearchWhenStart
        formid="invoice_search"
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        schema={schema}
      />
    );
  }
}

export default Layout;
