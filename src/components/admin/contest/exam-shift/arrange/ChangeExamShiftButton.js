import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import ChangeExamShiftForm from './ChangeExamShiftForm';

class ChangeExamShiftButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const {
      contestCode,
      contestIid,
      selectedUsers,
      forAllMatchingUsers,
      dialogTitle,
      searchValues,
      searchFormId,
      requestSuccessful,
    } = this.props;
    const contentDialog = (
      <ChangeExamShiftForm
        forAllMatchingUsers={forAllMatchingUsers}
        contestCode={contestCode}
        contestIid={contestIid}
        selectedUsers={selectedUsers}
        searchValues={searchValues}
        searchFormId={searchFormId}
        requestSuccessful={requestSuccessful}
      />
    );

    const optionsProperties = {
      handleClose: true,
      modal: true,

      title: dialogTitle || t1('arrange_exam_shift_for_users'),
    };

    this.props.dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }),
    );
  };

  render() {
    const { selectedUsers, forAllMatchingUsers, label } = this.props;

    return (
      <RaisedButton
        onClick={this.handleClick}
        name="change_exam_shift"
        id="change_exam_shift"
        className="m-b-10"
        disabled={
          !forAllMatchingUsers && (!selectedUsers || selectedUsers.length === 0)
        }
        label={label || t1('arrange_exam_shift')}
        primary
      />
    );
  }
}

export default connect()(ChangeExamShiftButton);
