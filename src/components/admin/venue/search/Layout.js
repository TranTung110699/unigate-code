import React, { Component } from 'react';

import { constants } from 'configs/constants';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import VenueResults from 'components/admin/venue/search/Results';
import FormFilters from 'components/admin/venue/search/FormFilters';

import topMenuSchema from '../menu/MainstageTopMenu';

class VenueLayout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <VenueResults items={items} {...props} />;
  }

  render() {
    const hiddenFields = {
      ntype: 'venue',
      type: constants.VenueTypeValue.REVENUE,
    };

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          formid="venue_search"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
        >
          <FormFilters />
        </SearchWrapper>
      </div>
    );
  }
}

export default VenueLayout;
