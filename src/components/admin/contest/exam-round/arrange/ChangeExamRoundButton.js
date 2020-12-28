import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import Form from './ChangeExamRoundForm';

class ChangeExamRoundButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const {
      contestIid,
      selectedUsers,
      forAllMatchingUsers,
      dialogTitle,
      searchValues,
      searchFormId,
      requestSuccessful,
    } = this.props;
    const contentDialog = (
      <Form
        forAllMatchingUsers={forAllMatchingUsers}
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

      title: dialogTitle || t1('arrange_exam_round_for_users'),
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
        name="change_exam_round"
        id="change_exam_round"
        className="m-b-10"
        disabled={
          !forAllMatchingUsers && (!selectedUsers || selectedUsers.length === 0)
        }
        label={label || t1('arrange_exam_round')}
        primary
      />
    );
  }
}

export default connect()(ChangeExamRoundButton);
