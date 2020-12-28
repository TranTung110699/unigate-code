import React, { Component } from 'react';
import { t1 } from 'translate';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import FormFilters from './FormFilters';
import Results from './Results';
import topMenuSchema from '../menu/MainstageTopMenu';

class Layout extends Component {
  formid = 'transaction_search';

  prepareDataBeforeSearch = (values) => {
    if (!values.ts_to) {
      return values;
    }
    const tmpTsTo = new Date(values.ts_to);
    return Object.assign({}, values, {
      ts_to: new Date(tmpTsTo.setDate(tmpTsTo.getDate() + 1)),
    });
  };

  validateFormData = (values) => {
    const error = {};
    if (!values.ts_from) {
      error.ts_from = t1('this_field_cannot_be_empty');
    }
    if (!values.ts_to) {
      error.ts_to = t1('this_field_cannot_be_empty');
    }
    if (values.ts_to < values.ts_from) {
      error.ts_from = t1('this_field_cannot_be_greater_than_"to"_field');
      error.ts_to = t1('this_field_cannot_be_smaller_than_"from"_field');
    }
    if (values.ts_to - values.ts_from > 119 * 24 * 60 * 60 * 1000) {
      const message = t1('time_range_cannot_be_greater_than_120_days');
      error.ts_from = message;
      error.ts_to = message;
    }
    return error;
  };

  renderResultComponent = (items, props, objects) => (
    <Results items={items} objects={objects} />
  );

  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          prepareDataBeforeSearch={this.prepareDataBeforeSearch}
          validate={this.validateFormData}
          formid={this.formid}
          renderResultsComponent={this.renderResultComponent}
          autoSearchWhenStart={false}
        >
          <FormFilters />
        </SearchWrapper>
      </div>
    );
  }
}

export default Layout;
