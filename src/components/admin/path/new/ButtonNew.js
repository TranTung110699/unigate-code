import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewButton from 'components/common/primary-button';

import NewForm from './Form';
import { t1 } from 'translate';

const dialogKey = 'new_program';

class ButtonNew extends Component {
  handleOnClick = (type) => {
    const { dispatch } = this.props;

    const contentDialog = (
      <NewForm mode="new" type={type} step={type} dialogKey={dialogKey} />
    );
    const optionsProperties = {
      handleClose: true,

      modal: true,
      title: t1('new_program'),
    };
    dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }, dialogKey),
    );
  };

  render() {
    return (
      <NewButton
        name="submit"
        type="submit"
        icon={<Icon icon="plus" />}
        label={this.props.label}
        onClick={() => this.handleOnClick(this.props.type)}
      />
    );
  }
}

export default connect()(ButtonNew);
