import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import { getUrl } from 'routes/links/common';
import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import { withRouter } from 'react-router';
import NewForm from '../new/Form';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  params = { type: 'asset_category' };

  requestSuccessful = (data) => {
    if (!data || !data.success) {
      return;
    }
    this.props.history.push(getUrl('asset/category'));
  };

  handleOnClick = () => {
    const { dispatch } = this.props;

    const contentDialog = (
      <NewForm
        step="asset"
        mode="new"
        params={this.params}
        alternativeApi="/category/index/new?type=asset"
        requestSuccessful={this.requestSuccessful}
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('new_asset_category'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <FlatButton
        name="submit"
        icon={<Icon icon="plus" />}
        label={t1('new_asset_category')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default withRouter(connect()(ButtonNew));
