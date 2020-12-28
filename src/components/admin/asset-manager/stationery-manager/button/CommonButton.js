import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import { withRouter } from 'react-router';
import ImportStationeryForm from '../search/change-stationery/ImportForm';
import apiUrls from 'api-endpoints';
import assetApiUrls from 'components/admin/asset-manager/endpoints';

class CommonButton extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, formid, step } = this.props;

    const contentDialog = (
      <ImportStationeryForm
        formid={formid}
        mode="new"
        step={step}
        alternativeApi={assetApiUrls.add_stationery_items}
        requestSuccessful={this.requestSuccessful}
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1(`${formid}`),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { formid } = this.props;
    return (
      <FlatButton
        name="submit"
        icon={<Icon icon="plus" />}
        label={t1(`${formid}`)}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default withRouter(connect()(CommonButton));
