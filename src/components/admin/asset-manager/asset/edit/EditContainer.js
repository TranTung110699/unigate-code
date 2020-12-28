import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import { DefinedUrlParams } from 'routes/links/common';
import nodeSagaActions from 'actions/node/saga-creators';

import UpdateForm from './../new/Form';

class EditAsset extends Component {
  componentDidMount() {
    this.getAssetDetail();
  }

  getAssetDetail = () => {
    const { dispatch, assetIid } = this.props;

    const requestConfig = {
      url: apiUrls.get_detail(assetIid, 'asset'),
      keyState: assetIid,
    };

    const requestParams = {
      iid: assetIid,
    };

    dispatch(nodeSagaActions.getDataRequest(requestConfig, requestParams));
  };

  render() {
    const { asset = {}, assetIid } = this.props;

    return (
      <UpdateForm
        mode="edit"
        title={t1('edit_asset')}
        node={asset}
        step=""
        formid={`edit_asset_${assetIid}`}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props;
  const assetIid = match && match.params && match.params[DefinedUrlParams.IID];

  return {
    assetIid,
    asset: state.dataApiResults[assetIid],
  };
};

export default connect(mapStateToProps)(EditAsset);
