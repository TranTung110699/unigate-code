import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from '../new/Form';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, requestSuccessful, searchFormId } = this.props;

    const contentDialog = (
      <NewForm
        mode="new"
        searchFormId={searchFormId}
        title={t1('new_exam_round')}
        requestSuccessful={requestSuccessful}
      />
    );
    const optionsProperties = {
      width: '60%',
      handleClose: true,
      modal: true,

      title: t1('new_exam_round'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <FlatButton
        name="submit"
        type="submit"
        icon={<Icon icon="plus" />}
        label={t1('new_exam_round')}
        onClick={() => this.handleOnClick()}
        buttonProps={this.props.buttonProps || {}}
      />
    );
  }
}

export default connect()(ButtonNew);
