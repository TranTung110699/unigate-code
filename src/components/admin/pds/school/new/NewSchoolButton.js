import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/FlatButton';

import { pdsType } from 'configs/constants';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from './Form';

class NewSchoolButton extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch } = this.props;

    const contentDialog = (
      <NewForm
        hiddenFields={{
          sub_type: 2, // PDS_SCHOOL
          type: pdsType,
        }}
        mode="new"
        step="schoolviet"
        alternativeApi="/pds/api/new-school"
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('new_school'),
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
        label={t1('new_school')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default connect()(NewSchoolButton);
