/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import FlatButton from 'components/common/mui/NewButton';
import Icon from 'components/common/Icon';
import NewForm from '../new/Form';
// import apiUrls from 'api-endpoints';
import budgetApiUrls from 'components/admin/budgetary-allocations/endpoints';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, step, searchFormId, formid } = this.props;
    const contentDialog = (
      <NewForm
        searchFormId={searchFormId}
        formid={formid}
        step={step}
        alternativeApi={
          step && step === 'get'
            ? budgetApiUrls.download_budget_template
            : budgetApiUrls.import_budgetary
        }
      />
    );
    const title = t1('get_import_template');
    const optionsProperties = {
      handleClose: true,

      title,
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { step } = this.props;
    const label =
      step && step == 'get' ? t1('get_import_template') : t1('import');
    return (
      <FlatButton
        name="submit"
        type="submit"
        icon={<Icon icon="plus" />}
        label={label}
        className="m-r-15"
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default connect()(ButtonNew);
