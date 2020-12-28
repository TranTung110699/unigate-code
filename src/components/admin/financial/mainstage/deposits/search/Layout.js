import React, { Component } from 'react';

import { invoiceTypes } from 'configs/constants';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import Results from './../../invoices/search/Results';
import topMenuSchema from '../menu/MainstageTopMenu';
import schema from 'components/admin/financial/mainstage/invoices/schema/search-form';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} type={invoiceTypes.DEPOSIT} />;
  }

  render() {
    const hiddenFields = {
      ntype: 'invoice',
      type: invoiceTypes.DEPOSIT,
      status: null,
    };

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          formid="deposit_search"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          schema={schema}
        />
      </div>
    );
  }
}

export default Layout;
