import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ScrollableAnchor from 'react-scrollable-anchor';
import nodeActions from 'actions/node/creators';
import Select from 'schema-form/elements/redux-form-fields/SelectDefault';
import Input from 'schema-form/elements/redux-form-fields/InputDefault';
import Perm from 'common/utils/Perm';
import { openLoginDialog } from 'actions/auth/auth-dialog';
import './stylesheet.scss';
import classBackground from './images/class_background.png';
import { t1 } from 'translate';

class Class extends React.Component {
  handleJoinVirtualClass = () => {
    const { joinClassForm, dispatch, isGuest } = this.props;
    if (isGuest) {
      dispatch(openLoginDialog());
      return;
    }

    if (
      joinClassForm.values &&
      joinClassForm.values.meetingID &&
      joinClassForm.values.username &&
      joinClassForm.values.password
    ) {
      let url = window.APP_LIVE_URL;
      url = `${url}?username=${joinClassForm.values.username}&meetingID=${
        joinClassForm.values.meetingID
      }&password=${joinClassForm.values.password}&action=create`;
      window.open(url, '_blank');
    } else {
      dispatch(
        nodeActions.snackbar(true, t1('you_need_to_enter_enough_information')),
      );
    }
  };
  getOptions = (isGuest) => {
    const classList = [
      {
        value: '',
        label: 'Chọn khóa học',
      },
      {
        value: 'Xpeak - Hoc thu truc tiep voi giao vien',
        label: 'Xpeak - Học thử trực tiếp với giáo viên',
      },
      {
        value: 'Vietinbank Virtual Class',
        label: 'Vietinbank Virtual Class',
      },
    ];

    const roleList = [
      {
        value: '',
        label: 'Choose a role',
      },
      {
        value: 'student123',
        label: 'Student',
      },
    ];

    if (Perm.hasPerm('teacher')) {
      roleList.push({
        value: 'prof123',
        label: 'Teacher',
      });
    }

    return { classList, roleList };
  };

  render() {
    const { classList, roleList } = this.getOptions(this.props.isGuest);

    return (
      <ScrollableAnchor id="xpeak-class">
        <div className="xpeak-class">
          <div className="class-background">
            <img src={classBackground} className="fullscreen" alt="" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h3 className="uppercase text-center">Lớp học của bạn</h3>
                <div className="join-class-form">
                  <div className="row">
                    <div className="col-md-4">
                      <span>Khóa học:</span>
                      <Select
                        name="meetingID"
                        className="input-default"
                        options={classList}
                      />
                    </div>
                    <div className="col-md-4">
                      <span>Nhập tên của bạn:</span>
                      <Input
                        type="text"
                        id="username"
                        required=""
                        name="username"
                        placeholder="Tên của bạn"
                        size="29"
                        className="field input-default"
                      />
                    </div>
                    <div className="col-md-2">
                      <span>Vai trò:</span>
                      <div className="clearfix" />
                      <Select
                        name="password"
                        className="input-default"
                        options={roleList}
                      />
                    </div>
                    <div className="col-md-2 join-class-btn">
                      <button
                        className="uppercase"
                        onClick={this.handleJoinVirtualClass}
                      >
                        Join class
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollableAnchor>
    );
  }
}

const populateStateToProps = (state) => ({
  joinClassForm: state.form.joinClassForm,
  isGuest: Perm.isGuest(),
});

export default connect(populateStateToProps)(
  reduxForm({
    form: 'joinClassForm',
  })(Class),
);
