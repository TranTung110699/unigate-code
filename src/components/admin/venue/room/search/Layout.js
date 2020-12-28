import React, { Component } from 'react';
import { constants } from 'configs/constants';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import VenueResults from 'components/admin/venue/room/search/Results';
import VirtualRoomResults from 'components/admin/venue/room/search/VirtualRoomResults';
import topMenuSchema from 'components/admin/venue/menu/MainstageTopMenu';

class VenueLayout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    const { node } = this.props; // venue
    if (node.is_virtual) return <VirtualRoomResults items={items} {...props} />;
    return <VenueResults items={items} {...props} />;
  }

  render() {
    const { iid } = this.props;
    const hiddenFields = {
      ntype: 'venue',
      parent_iid: iid,
      type: constants.VenueTypeValue.ROOM,
      get_server_configs: 1,
    };

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          formid="venue_room_search"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          hideSubmitButton
        />
      </div>
    );
  }
}

export default VenueLayout;
