import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import Form from '../../new/Form';

class AddOneTeacher extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch } = this.props;

    const contentDialog = (
      <Form
        mode="new"
        step="staff"
        alternativeApi="user/new"
        formid="new_staff"
        searchFormId="staff_search"
        title={t1('add_new_staff')}
      />
    );
    const optionsProperties = {
      handleClose: true,

      modal: true,
      title: t1('add_staff'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <span className="m-l-10">
        <FlatButton
          name="submit"
          type="submit"
          icon={<Icon icon="plus" />}
          label={t1('add_teacher')}
          onClick={() => this.handleOnClick()}
        />
      </span>
    );
  }
}

export default connect()(AddOneTeacher);
