/**
 * Created by quandv on 19/04/17.
 */
import React, { Component } from 'react';

import { pdsType } from 'configs/constants';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import topMenuSchema from 'components/admin/pds/menu/MainstageTopMenu';

import Results from './Results';
import FormFilters from './FormFilters';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render = () => {
    const hiddenFields = {
      ntype: 'category',
      type: pdsType,
      _sand_step: 'province',
      items_per_page: 10,
    };

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema(null, { step: 'province' })} />
        <SearchWrapper
          formid="province_district_search"
          renderResultsComponent={this.renderResultComponent}
          hiddenFields={hiddenFields}
          showSearchButton
        >
          <FormFilters formid="province_district_search" />
        </SearchWrapper>
      </div>
    );
  };
}

export default Layout;
