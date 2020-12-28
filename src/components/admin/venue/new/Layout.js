import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from 'store';

import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import { constants } from 'configs/constants';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import topMenuSchema from 'components/admin/venue/menu/MainstageTopMenu';

import Form from './Form';

class VenueNew extends Component {
  constructor(props) {
    super(props);
    this.state = { fetched: false };
  }

  onCreateSuccess = (data) => {
    if (!data || !data.success) {
      return;
    }
    const venue = data.result;
    history.push(getUrl(`venue/${venue.iid}`));
  };

  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <Form
          mode="new"
          title={t1('edit_venue')}
          step=""
          ntype="venue"
          requestSuccessful={this.onCreateSuccess}
          params={{ type: constants.VenueTypeValue.REVENUE }}
          formid="new_venue"
        />
      </div>
    );
  }
}

export default connect()(VenueNew);
