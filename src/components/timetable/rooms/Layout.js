import React, { Component } from 'react';

import { constants } from 'configs/constants';
import apiEndpoints from 'api-endpoints';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import topMenuSchema from 'components/admin/venue/menu/MainstageTopMenu';

import VenueResults from './Results';
import FormFilters from './FormFilters';

class VenueLayout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items) {
    return <VenueResults items={items} clazz={this.props.clazz} />;
  }

  getRoomIidsInClass = () => {
    const { clazz } = this.props;
    if (!clazz) {
      return [];
    }
    return clazz.room_iids || [];
  };

  render() {
    const { iid, clazz } = this.props;
    const hiddenFields = {
      ntype: 'venue',
      type: constants.VenueTypeValue.ROOM,
      room_iids_rejected: this.getRoomIidsInClass(),
    };

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          formid="room_search_for_timetable"
          alternativeApi={apiEndpoints.get_venue_by_parent}
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
        >
          <FormFilters clazz={clazz} venues={this.props.venues} />
        </SearchWrapper>
      </div>
    );
  }
}

export default VenueLayout;
