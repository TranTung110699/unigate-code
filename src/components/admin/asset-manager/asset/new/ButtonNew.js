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

  params = { type: 'asset' };

  requestSuccessful = (data) => {
    if (!data || !data.success) {
      return;
    }
    this.props.history.push(getUrl('asset/items'));
  };

  handleOnClick = () => {
    const { dispatch } = this.props;

    const contentDialog = (
      <NewForm
        mode="new"
        params={this.params}
        // alternativeApi="/asset/index/new"
        requestSuccessful={this.requestSuccessful}
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('new_asset'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <FlatButton
        name="submit"
        icon={<Icon icon="plus" />}
        label={t1('new_asset')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default withRouter(connect()(ButtonNew));
