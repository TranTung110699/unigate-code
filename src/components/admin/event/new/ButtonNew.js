import React, { Component } from 'react';
import FlatButton from 'components/common/mui/NewButton';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewEventForm from './Form';

class ButtonNew extends Component {
  handleOnClick = () => {
    const { dispatch } = this.props;
    const contentDialog = (
      <NewEventForm
        mode="new"
        title={t1('new_event')}
        searchFormId="event_search"
      />
    );
    const optionsProperties = {
      handleClose: true,

      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <FlatButton
        name="submit"
        type="submit"
        icon={<Icon icon="plus" />}
        label={t1('new_event')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default connect()(ButtonNew);
