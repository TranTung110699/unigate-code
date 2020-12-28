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

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, step, searchFormId, formid } = this.props;
    const contentDialog = (
      <NewForm
        mode="new"
        ntype="ico"
        searchFormId={searchFormId}
        formid={formid}
        step={step}
      />
    );
    const title = t1('new_ico');
    const optionsProperties = {
      handleClose: true,

      modal: true,
      title,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const label = t1('new_ico');
    return (
      <FlatButton
        name="submit"
        icon={<Icon icon="plus" />}
        label={label}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default connect()(ButtonNew);
