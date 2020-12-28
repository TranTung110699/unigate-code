import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import PrimaryButton from 'components/common/primary-button';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import Form from './Form';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch } = this.props;

    const contentDialog = (
      <Form
        mode="new"
        step="parent"
        alternativeApi="user/new"
        formid="new_parent"
        searchFormId="parent_search"
        title={t1('add_new_parent')}
      />
    );
    const optionsProperties = {
      handleClose: true,

      modal: true,
      title: t1('add_parent'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <div>
        <PrimaryButton
          name="submit"
          type="submit"
          icon={<Icon icon="plus" />}
          label={t1('add_parent')}
          onClick={() => this.handleOnClick()}
        />
      </div>
    );
  }
}

export default connect()(ButtonNew);
