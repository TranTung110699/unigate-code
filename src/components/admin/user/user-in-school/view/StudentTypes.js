import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'components/common/mui/FlatButton';
import NodeNew from 'components/admin/node/new';
import actions from 'actions/node/creators';
import sagaActions from 'actions/node/saga-creators';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import userSchema from 'components/admin/user/schema/form';

class StudentTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNew: false,
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    const { dispatch, keyState, user } = this.props;
    const url = '/user/api/get-student-types';
    dispatch(
      sagaActions.getDataRequest(
        {
          url,
          keyState,
        },
        {
          user_iid: user && user.iid,
        },
      ),
    );
  };

  handleOnClick = () => {
    const { dispatch, studentTypess, user } = this.props;
    const contentDialog = (
      <NodeNew
        ntype={'user'}
        schema={userSchema}
        requestSuccessful={() => this.getData()}
        mode="edit"
        step="student_types"
        formid="edit_student_types"
        node={{ ...user, student_types: studentTypess }}
        closeModal
      />
    );
    const optionsProperties = {
      handleClose: true,
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { studentTypess } = this.props;

    return (
      <div>
        <h3>{t1('student_types')}</h3>
        <ul>
          {studentTypess.map((row) => (
            <li key={row.id}>{row.name}</li>
          ))}
        </ul>
        <FlatButton
          label={t1('edit')}
          icon={<Icon icon="plus" />}
          onClick={() => this.handleOnClick()}
        />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const keyState = `student-types-${props.user && props.user.iid}`;
  const studentTypess = state.dataApiResults[keyState] || [];
  return {
    keyState,
    studentTypess,
  };
}

export default connect(mapStateToProps)(StudentTypes);
