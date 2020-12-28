import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { invoiceTypes } from 'configs/constants';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import FlatButton from 'components/common/mui/NewButton';
import Icon from 'components/common/Icon';
import NewForm from '../new/Form';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, type, searchFormId, formid } = this.props;
    const step = type === invoiceTypes.DEPOSIT ? type : '';

    const contentDialog = (
      <NewForm
        mode="new"
        searchFormId={searchFormId || 'invoice_search'}
        formid={formid}
        type={type}
        step={step}
        requestSuccessful={this.previewDeposit}
      />
    );

    const title =
      type === invoiceTypes.DEPOSIT ? t1('new_deposit') : t1('new_invoice');
    const optionsProperties = {
      handleClose: true,

      title,
      modal: true,
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { type } = this.props;
    const label =
      type === invoiceTypes.DEPOSIT ? t1('new_deposit') : t1('new_invoice');
    return (
      <FlatButton
        name="submit"
        type="submit"
        icon={<Icon icon="plus" />}
        label={label}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default withRouter(connect()(ButtonNew));
