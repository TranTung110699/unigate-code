import React, { Component } from 'react';
import { t1 } from 'translate';
import { history } from 'store';
import { getUrl } from 'routes/links/common';
import { connect } from 'react-redux';
import Form from './Form';

class AssetNew extends Component {
  onCreateSuccess = (data) => {
    if (!data || !data.success) {
      return;
    }
    const asset = data.result;
    history.push(getUrl(`asset/${asset.iid}`));
  };

  render() {
    return (
      <Form
        mode="new"
        title={t1('edit_asset')}
        step=""
        ntype="asset"
        requestSuccessful={this.onCreateSuccess}
        formid="new_asset"
      />
    );
  }
}

export default connect()(AssetNew);
