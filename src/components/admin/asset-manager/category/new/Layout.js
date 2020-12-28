import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from 'store';

import { t1 } from 'translate';
import { constants } from 'configs/constants';
import { getUrl } from 'routes/links/common';

import Form from './Form';

class AssetNew extends Component {
  onCreateSuccess = (data) => {
    if (!data || !data.success) {
      return;
    }
    const assetCategory = data.result;
    history.push(getUrl(`asset/category/${assetCategory.iid}`));
  };

  render() {
    return (
      <Form
        mode="new"
        title={t1('edit_asset_category')}
        step="asset"
        ntype="asset_category"
        requestSuccessful={this.onCreateSuccess}
        params={{ type: constants.AssetTypeValue.CERTIFICATE }}
        formid="new_asset_category"
      />
    );
  }
}

export default connect()(AssetNew);
