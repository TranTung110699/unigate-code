import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';
import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from 'components/admin/message-templates/new/Form';

class ButtonNew extends Component {
  handleOnClick = () => {
    const { dispatch } = this.props;

    const contentDialog = <NewForm mode="new" />;
    const optionsProperties = {
      handleClose: true,

      modal: true,
      title: t1('new_message_template'),
      width: '70%',
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <FlatButton
        name="submit"
        type="submit"
        icon={<Icon icon="plus" />}
        label={t1('new_message_template')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default connect()(ButtonNew);
