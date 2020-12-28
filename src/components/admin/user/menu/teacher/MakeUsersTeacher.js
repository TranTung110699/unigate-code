import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import Form from '../../new/Form';

class MakeUsersTeacher extends Component {
  constructor(props) {
    super(props);
    this.handleAddTeacherByMailOnClick = this.handleAddTeacherByMailOnClick.bind(
      this,
    );
  }

  // Todo: Chua them moi teacher by mail duoc
  handleAddTeacherByMailOnClick = () => {
    const { dispatch } = this.props;

    const contentDialog = (
      <Form
        mode="new"
        step="teacher"
        alternativeApi="/school/add-staff"
        formid="new_teacher"
        searchFormId="staff_search"
        title={t1('add_new_teacher_by_email')}
      />
    );
    const optionsProperties = {
      handleClose: true,

      modal: true,
      title: t1('add_teacher_by_mail'),
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
          label={t1('make_users_teacher')}
          onClick={() => this.handleAddTeacherByMailOnClick()}
        />
      </span>
    );
  }
}

export default connect()(MakeUsersTeacher);
