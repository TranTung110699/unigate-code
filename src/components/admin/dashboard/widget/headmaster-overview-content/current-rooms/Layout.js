import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { t1 } from 'translate';

import Results from './Results';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const { activeRooms } = this.props;

    const hiddenFields = {
      active_rooms: activeRooms,
    };

    const currentRoomsTitle = activeRooms
      ? t1('active_rooms')
      : t1('inactive_rooms');

    return (
      <div>
        <h1>{currentRoomsTitle}</h1>
        <SearchWrapper
          formid="get_current_rooms"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showQueryField={false}
          showSearchButton={false}
        />
      </div>
    );
  }
}

export default Layout;
