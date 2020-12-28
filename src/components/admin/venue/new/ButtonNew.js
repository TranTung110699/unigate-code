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
  params = { type: 'venue' };

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  requestSuccessful = (data) => {
    if (!data || !data.success) {
      return;
    }
    const venue = data.result;
    this.props.history.push(getUrl(`venue/${venue.iid}`));
  };

  handleOnClick = () => {
    const { dispatch } = this.props;

    const contentDialog = (
      <NewForm
        mode="new"
        params={this.params}
        requestSuccessful={this.requestSuccessful}
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('new_venue'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <FlatButton
        name="submit"
        icon={<Icon icon="plus" />}
        label={t1('new_venue')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default withRouter(connect()(ButtonNew));
